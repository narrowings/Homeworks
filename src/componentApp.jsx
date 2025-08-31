import { useState } from "react";

function ComponentApp({ onAddCategory }) {
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    onAddCategory(category);
    setCategory(""); 
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Write a category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default ComponentApp;
