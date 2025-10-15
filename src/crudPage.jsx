import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 IMPORTANTE
import { fetchItems, addNewItem, deleteItem, updateItemInFirestore } from "./crudThunks";
import { startLogout } from "./thunks";

const CrudPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 👈 Para navegar a otra ruta
  const { items } = useSelector((state) => state.crud);

  const [formData, setFormData] = useState({ titulo: "", descripcion: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

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

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ titulo: item.titulo, descripcion: item.descripcion });
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  // 👇 Redirección al chat
  const goToChat = () => {
    navigate("/chat");
  };

  return (
    <div>
      <h1>Panel CRUD (Firestore)</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={goToChat} style={{ marginLeft: "10px" }}>💬 Ir al Chat</button> {/* 👈 Nuevo botón */}

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
