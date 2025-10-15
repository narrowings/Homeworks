import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../src/firebase/config";

// 🔥 ADD
export const addItem = createAsyncThunk("items/addItem", async ({ uid, data }) => {
  const docRef = await addDoc(collection(db, "items"), { ...data, uid });
  return { id: docRef.id, ...data, uid };
});

// 🔥 READ (EN TIEMPO REAL)
export const listenToItems = createAsyncThunk("items/listenToItems", async (uid, { dispatch }) => {
  const q = query(collection(db, "items"), where("uid", "==", uid));
  onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(setItems(items));
  });
});

// 🔥 UPDATE
export const updateItem = createAsyncThunk("items/updateItem", async ({ id, data }) => {
  const ref = doc(db, "items", id);
  await updateDoc(ref, data);
  return { id, data };
});

// 🔥 DELETE
export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
  await deleteDoc(doc(db, "items", id));
  return id;
});

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setItems: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;
