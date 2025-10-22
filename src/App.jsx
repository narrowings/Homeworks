import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";

// Clase del nodo
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Clase del árbol binario
class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  inorder(node = this.root, result = []) {
    if (!node) return result;
    this.inorder(node.left, result);
    result.push(node.value);
    this.inorder(node.right, result);
    return result;
  }

  preorder(node = this.root, result = []) {
    if (!node) return result;
    result.push(node.value);
    this.preorder(node.left, result);
    this.preorder(node.right, result);
    return result;
  }

  postorder(node = this.root, result = []) {
    if (!node) return result;
    this.postorder(node.left, result);
    this.postorder(node.right, result);
    result.push(node.value);
    return result;
  }

  find(value, node = this.root) {
    if (!node) return false;
    if (node.value === value) return true;
    return value < node.value
      ? this.find(value, node.left)
      : this.find(value, node.right);
  }

  // Convertir a formato de react-d3-tree
  toD3Format(node = this.root) {
    if (!node) return null;
    return {
      name: String(node.value),
      children: [this.toD3Format(node.left), this.toD3Format(node.right)].filter(Boolean),
    };
  }
}

function App() {
  const [tree] = useState(new BinaryTree());
  const [treeData, setTreeData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [found, setFound] = useState(null);

  useEffect(() => {
    // Insertar algunos valores iniciales
    const numbers = [8, 3, 10, 1, 6, 14, 4, 7, 13];
    numbers.forEach((num) => tree.insert(num));
    setTreeData(tree.toD3Format());

    console.log("🔹 Inorder:", tree.inorder());
    console.log("🔹 Preorder:", tree.preorder());
    console.log("🔹 Postorder:", tree.postorder());
  }, [tree]);

  const handleSearch = () => {
    const exists = tree.find(parseInt(searchValue));
    setFound(exists);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", textAlign: "center" }}>
      <h1 style={{ marginTop: "10px" }}>🌳 Binary Tree Visualizer</h1>

      <div style={{ margin: "20px" }}>
        <input
          type="number"
          placeholder="Buscar valor..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button onClick={handleSearch}>Buscar</button>
        {found !== null && (
          <p style={{ marginTop: "10px" }}>
            {found ? "✅ Valor encontrado en el árbol" : "❌ Valor no está en el árbol"}
          </p>
        )}
      </div>

      {treeData && (
        <div style={{ width: "100%", height: "80vh" }}>
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: 400, y: 100 }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
