import React, { useState, useEffect } from "react";
import { Graph } from "react-d3-graph";

export default function App() {
  const [data, setData] = useState({
    nodes: [
      { id: "Bogotá", type: "city", color: "#2196f3" },
      { id: "Medellín", type: "city", color: "#2196f3" },
      { id: "Cali", type: "city", color: "#2196f3" },
      { id: "Ana (25)", type: "person", city: "Bogotá", color: "#4caf50" },
      { id: "Luis (30)", type: "person", city: "Medellín", color: "#4caf50" },
      { id: "Carla (22)", type: "person", city: "Bogotá", color: "#4caf50" },
      { id: "Mateo (28)", type: "person", city: "Cali", color: "#4caf50" },
    ],
    links: [
      { source: "Ana (25)", target: "Bogotá" },
      { source: "Carla (22)", target: "Bogotá" },
      { source: "Luis (30)", target: "Medellín" },
      { source: "Mateo (28)", target: "Cali" },
      { source: "Ana (25)", target: "Luis (30)" },
      { source: "Carla (22)", target: "Mateo (28)" },
    ],
  });

  const [selectedCity, setSelectedCity] = useState("");
  const [peopleInCity, setPeopleInCity] = useState([]);

  const myConfig = {
    nodeHighlightBehavior: true,
    height: 600,
    width: 800,
    directed: false,
    node: {
      size: 500,
      highlightStrokeColor: "black",
      labelProperty: "id",
      fontSize: 12,
    },
    link: {
      highlightColor: "black",
    },
    d3: {
      gravity: -300,
      linkLength: 150,
      alphaTarget: 0.2,
      disableLinkForce: false,
    },
    panAndZoom: true,
    staticGraph: false, // mantiene movimiento inicial para que se disperse
  };

  // ✅ Este truco forza el re-render para que el grafo se estabilice siempre
  useEffect(() => {
    const timer = setTimeout(() => {
      setData((prev) => ({ ...prev }));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCityClick = (cityName) => {
    const people = data.nodes.filter(
      (node) => node.type === "person" && node.city === cityName
    );
    setSelectedCity(cityName);
    setPeopleInCity(people);
  };

  const onClickNode = (nodeId) => {
    const node = data.nodes.find((n) => n.id === nodeId);
    if (node && node.type === "city") {
      handleCityClick(node.id);
    }
  };

  return (
    <div style={{ textAlign: "center", background: "#ccc", color: "#000", height: "100vh", width: "100vw", paddingTop: "20px" }}>
      <h2>Challenge 16: Graph of Friends and Cities</h2>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Graph id="graph" data={data} config={myConfig} onClickNode={onClickNode} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>
          {selectedCity
            ? `People living in ${selectedCity}:`
            : "Click on a city node to see its residents"}
        </h3>
        {peopleInCity.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {peopleInCity.map((p) => (
              <li key={p.id}>{p.id}</li>
            ))}
          </ul>
        ) : (
          selectedCity && <p>No people found in this city.</p>
        )}
      </div>
    </div>
  );
}
