import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchItems, addNewItem, deleteItem, updateItemInFirestore } from "./crudThunks";
//import { logoutFirebase } from "../store/authThunks"; // Asegúrate de tener este thunk o te lo genero
//import { logout } from "../store/authSlice";
import { startLogout } from "./thunks";

const CrudPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.crud);

  const [formData, setFormData] = useState({ titulo: "", descripcion: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  // ✅ Crear o Actualizar
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateItemInFirestore(editingId, formData));
      setEditingId(null);
    } else {
      dispatch(addNewItem(formData));
    }
    setFormData({ titulo: "", descripcion: "" });
  };

  // ✅ Eliminar
  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  // ✅ Editar (carga datos al formulario)
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ titulo: item.titulo, descripcion: item.descripcion });
  };

  // ✅ Logout
    const handleLogout = () => {
    dispatch(startLogout());
  };


  return (
    <div>
      <h1>Panel CRUD (Firestore)</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={formData.titulo}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.titulo}</strong> - {item.descripcion}
            <button onClick={() => handleEdit(item)}>Editar</button>
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudPage;
