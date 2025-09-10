import React, { useState } from "react";
import "./pagina.css"

export default function Pagina() {
  const [images, setImages] = useState([]); 
  const [title, setTitle] = useState("");   
  const [id, setId] = useState("");         
  const [search, setSearch] = useState(""); 

  
  const handleAdd = (e) => {
    e.preventDefault();
    if (!id || !title) return;

    const newImage = {
      id: Number(id),
      title,
      url: `https://picsum.photos/id/${id}/200/300`
    };

    setImages([...images, newImage]); 
    setId(""); 
    setTitle("");
  };

  
  const filteredImages = images.filter((img) =>
    img.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>

      <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">Agregar Imagen</button>
        
      </form>


      <input
        type="text"
        placeholder="Buscar por titulo"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      <div className="gallery">
        {filteredImages.map((img) => (
            <div key={img.id} className="card">
            <h3>{img.title} || {img.id} </h3>
            <img src={img.url} alt={img.title} />
            </div>
        ))}
     </div>

    </div>
  );
}
