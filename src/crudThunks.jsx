import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { setItems, addItem, deleteItemLocal, updateItem } from "./crudSlice";

const COLLECTION_NAME = "posts"; // Puedes cambiar el nombre de la colección si quieres

// 📌 1. Leer documentos de Firestore
export const fetchItems = () => {
  return async (dispatch) => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const items = [];
    querySnapshot.forEach((docItem) => {
      items.push({ id: docItem.id, ...docItem.data() });
    });
    dispatch(setItems(items));
  };
};

// ➕ 2. Agregar un nuevo documento
export const addNewItem = (data) => {
  return async (dispatch) => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
    dispatch(addItem({ id: docRef.id, ...data }));
  };
};

// 🗑 3. Eliminar un documento
export const deleteItem = (id) => {
  return async (dispatch) => {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    dispatch(deleteItemLocal(id));
  };
};

// ✏ 4. Actualizar un documento
export const updateItemInFirestore = (id, newData) => {
  return async (dispatch) => {
    await updateDoc(doc(db, COLLECTION_NAME, id), newData);
    dispatch(updateItem({ id, ...newData }));
  };
};
