import React, { useState, useMemo } from "react";
import { Graph } from "react-d3-graph";
import "./pagina.css"


const uid = (prefix = "") => prefix + Math.random().toString(36).slice(2, 9);


function countZones(roots = []) {
  let total = 0;
  for (const r of roots) {
    total += 1;
    if (r.children && r.children.length) total += countZones(r.children);
  }
  return total;
}

function heightZones(roots = []) {
  if (!roots || roots.length === 0) return 0;

  let maxh = 0;
  for (const r of roots) {
    const h = 1 + heightZones(r.children || []);
    if (h > maxh) maxh = h;
  }
  return maxh;
}


function mapZonesReplace(zones, zoneId, cb) {
  return zones.map((z) => {
    if (z.id === zoneId) {
      return cb(z);
    } else if (z.children && z.children.length) {
      return { ...z, children: mapZonesReplace(z.children, zoneId, cb) };
    } else {
      return z;
    }
  });
}

function addChildRecursive(zones, parentId, newNode) {
  return zones.map((z) => {
    if (z.id === parentId) {
      const children = z.children ? [...z.children, newNode] : [newNode];
      return { ...z, children };
    } else if (z.children && z.children.length) {
      return { ...z, children: addChildRecursive(z.children, parentId, newNode) };
    } else {
      return z;
    }
  });
}


export default function Pagina() {
  
  const [cities, setCities] = useState([
    {
      id: "Bogota",
      greenZones: [
        {
          id: uid("z_"),
          name: "Parque central",
          children: [
            { id: uid("z_"), name: "Área de juegos", children: [] },
            {
              id: uid("z_"),
              name: "Bosquecillo",
              children: [{ id: uid("z_"), name: "Sendero", children: [] }],
            },
          ],
        },
        { id: uid("z_"), name: "Huerto comunitario", children: [] },
      ],
    },
    { id: "Cali", greenZones: [] },
    { id: "Medellin", greenZones: [] },
  ]);

  
  const [links, setLinks] = useState([
    { source: "Bogota", target: "Cali" },
    { source: "Cali", target: "Medellin" },
  ]);


  const [newCityName, setNewCityName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState(cities[0]?.id || "");
  const [newZoneName, setNewZoneName] = useState("");
  const [zoneParentId, setZoneParentId] = useState(""); 

  
  const graphData = useMemo(
    () => ({
      nodes: cities.map((c) => ({ id: c.id })),
      links: links.map((l) => ({ source: l.source, target: l.target })),
    }),
    [cities, links]
  );

  
  function addCity() {
    const name = newCityName?.trim();
    if (!name) return alert("Ingresa nombre de ciudad");
    if (cities.some((c) => c.id === name)) {
      return alert("Ya existe una ciudad con ese nombre");
    }
    setCities((s) => [...s, { id: name, greenZones: [] }]);
    setNewCityName("");
  }

  function deleteCity(id) {
    if (!confirm(`¿Eliminar ciudad ${id}? Esto eliminará sus conexiones.`)) return;
    setCities((s) => s.filter((c) => c.id !== id));
    setLinks((ls) => ls.filter((l) => l.source !== id && l.target !== id));
    if (selectedCityId === id) setSelectedCityId("");
  }

  function toggleLink(a, b) {
    if (!a || !b) return;
    if (a === b) return alert("No se permiten self-loops en este ejemplo");
    const exists = links.some(
      (l) =>
        (l.source === a && l.target === b) ||
        (l.source === b && l.target === a)
    );
    if (exists) {
      setLinks((ls) =>
        ls.filter(
          (l) =>
            !(
              (l.source === a && l.target === b) ||
              (l.source === b && l.target === a)
            )
        )
      );
    } else {
      setLinks((ls) => [...ls, { source: a, target: b }]);
    }
  }

  

  function addRootZoneToSelected() {
    if (!selectedCityId) return alert("Selecciona una ciudad primero");
    const name = newZoneName?.trim();
    if (!name) return alert("Nombre de zona vacío");
    const newNode = { id: uid("z_"), name, children: [] };
    setCities((cs) =>
      cs.map((c) => (c.id === selectedCityId ? { ...c, greenZones: [...c.greenZones, newNode] } : c))
    );
    setNewZoneName("");
    setZoneParentId("");
  }

  function addSubZoneToSelected(parentId) {
    if (!selectedCityId) return alert("Selecciona una ciudad primero");
    const name = newZoneName?.trim();
    if (!name) return alert("Nombre de subzona vacío");
    const newNode = { id: uid("z_"), name, children: [] };
    setCities((cs) =>
      cs.map((c) =>
        c.id === selectedCityId ? { ...c, greenZones: addChildRecursive(c.greenZones, parentId, newNode) } : c
      )
    );
    setNewZoneName("");
    setZoneParentId("");
  }

  function editZoneInSelected(zoneId) {
    if (!selectedCityId) return alert("Selecciona una ciudad primero");
    const newName = prompt("Nuevo nombre para la zona:");
    if (!newName) return;
    setCities((cs) =>
      cs.map((c) =>
        c.id === selectedCityId ? { ...c, greenZones: mapZonesReplace(c.greenZones, zoneId, (z) => ({ ...z, name: newName })) } : c
      )
    );
  }

  
  const selectedCity = cities.find((c) => c.id === selectedCityId) ?? null;
  const totalZones = selectedCity ? countZones(selectedCity.greenZones) : 0;
  const maxHeight = selectedCity ? heightZones(selectedCity.greenZones) : 0;

  
  function ZoneView({ zone }) {
    return (
      <div style={{ marginLeft: 12, borderLeft: "1px dashed #ddd", paddingLeft: 8, marginTop: 6 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <strong>{zone.name}</strong>
          <button onClick={() => {
            
            const name = prompt("Nombre nueva subzona:");
            if (!name) return;
            const newNode = { id: uid("z_"), name, children: [] };
            setCities((cs) =>
              cs.map((c) =>
                c.id === selectedCityId ? { ...c, greenZones: addChildRecursive(c.greenZones, zone.id, newNode) } : c
              )
            );
          }}>+sub</button>

          <button onClick={() => editZoneInSelected(zone.id)}>✎ Editar</button>
        </div>

    
        {zone.children && zone.children.length > 0 && (
          <div>
            {zone.children.map((ch) => (
              <ZoneView key={ch.id} zone={ch} />
            ))}
          </div>
        )}
      </div>
    );
  }

  
  const graphConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "#7BBF6A",
      size: 400,
      labelProperty: "id",
    },
    link: {
      highlightColor: "#07f",
    },
    height: 600,
    width: 600,
    panAndZoom: true,
    staticGraph: false,
  };

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1>Red de Ciudades + Green Zones</h1>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        
        <div style={{ flex: 1, minWidth: 320 }}>
          <section style={{ marginBottom: 12 }}>
            <h2>Ciudades</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                placeholder="Nombre nueva ciudad"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
              />
              <button onClick={addCity}>Agregar ciudad</button>
            </div>

            <ul style={{ paddingLeft: 0 }}>
              {cities.map((c) => (
                <li key={c.id} style={{ listStyle: "none", marginTop: 8 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="radio"
                      name="selectedCity"
                      checked={selectedCityId === c.id}
                      onChange={() => setSelectedCityId(c.id)}
                    />
                    <span style={{ minWidth: 120 }}>{c.id}</span>
                    <button onClick={() => deleteCity(c.id)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 8 }}>
              <h4>Conectar ciudades</h4>
              <ConnectForm cities={cities} onToggle={toggleLink} />
            </div>
          </section>

          <section style={{ marginBottom: 12 }}>
            <h2>Green zones (solo añadir / editar)</h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <select value={selectedCityId} onChange={(e) => setSelectedCityId(e.target.value)}>
                <option value="">Selecciona ciudad</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>{c.id}</option>
                ))}
              </select>

              <input
                placeholder="Nombre zona (o subzona)"
                value={newZoneName}
                onChange={(e) => setNewZoneName(e.target.value)}
              />

              <select value={zoneParentId} onChange={(e) => setZoneParentId(e.target.value)}>
                <option value="">(Agregar como raíz)</option>
                
                {selectedCity &&
                  flattenZones(selectedCity.greenZones).map((z) => (
                    <option key={z.id} value={z.id}>{z.name}</option>
                  ))}
              </select>

              <button onClick={() => {
                if (!zoneParentId) addRootZoneToSelected();
                else addSubZoneToSelected(zoneParentId);
              }}>Agregar</button>
            </div>

            <p style={{ color: "#444" }}>
              Para editar una zona: usa el botón ✎ al lado del nombre en el árbol.
            </p>

            <div style={{ border: "1px solid #eee", padding: 8, borderRadius: 6 }}>
              <h4>Árbol de zonas de la ciudad seleccionada</h4>
              {!selectedCity && <p>Selecciona una ciudad para ver sus zonas.</p>}
              {selectedCity && selectedCity.greenZones.length === 0 && <p>No hay zonas.</p>}
              {selectedCity && selectedCity.greenZones.map((z) => <ZoneView key={z.id} zone={z} />)}
            </div>
          </section>

          <section>
            <h3>Estadísticas (ciudad seleccionada)</h3>
            <p><strong>Total zonas:</strong> {totalZones}</p>
            <p><strong>Altura máxima:</strong> {maxHeight}</p>
          </section>
        </div>

        
        <div style={{ width: 620, flexShrink: 0 }}>
          <div style={{ border: "1px solid #ddd", padding: 8, borderRadius: 8 }}>
            <h3>Mapa de Ciudades</h3>
            <div style={{ display: "flex", gap: 8 }}>
              <Graph
                id="city-graph"
                data={graphData}
                config={graphConfig}
                onClickNode={(nodeId) => setSelectedCityId(nodeId)}
                onClickLink={(link) => {
                  
                  if (!confirm(`¿Eliminar la conexión ${link.source} ↔ ${link.target}?`)) return;
                  toggleLink(link.source, link.target);
                }}
        
              />
            </div>
            <p style={{ fontSize: 12, color: "#666" }}>
              Haz click en un nodo para seleccionarlo. Clic en arista para eliminarla.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


function ConnectForm({ cities, onToggle }) {
  const [a, setA] = useState(cities[0]?.id || "");
  const [b, setB] = useState(cities[1]?.id || "");

  
  React.useEffect(() => {
    if (!a && cities[0]) setA(cities[0].id);
    if (!b && cities[1]) setB(cities[1].id);
  }, [cities]);

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <select value={a} onChange={(e) => setA(e.target.value)}>
        {cities.map((c) => <option key={c.id} value={c.id}>{c.id}</option>)}
      </select>
      <span>↔</span>
      <select value={b} onChange={(e) => setB(e.target.value)}>
        {cities.map((c) => <option key={c.id} value={c.id}>{c.id}</option>)}
      </select>
      <button onClick={() => onToggle(a, b)}>Conectar/Desconectar</button>
    </div>
  );
}

function flattenZones(roots = []) {
  const out = [];
  (function rec(list) {
    for (const z of list) {
      out.push({ id: z.id, name: z.name });
      if (z.children && z.children.length) rec(z.children);
    }
  })(roots);
  return out;
}
