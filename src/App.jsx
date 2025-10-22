import React, { useState } from "react";

// Clase de nodo N-ario
class MenuNode {
  constructor(title, link, component) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

// Función recursiva para renderizar el menú
function RenderMenu({ node, onSelect, level = 0 }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginLeft: level * 10 }}>
      <div
        onClick={() => {
          if (node.children.length > 0) setOpen(!open);
          onSelect(node);
        }}
        style={{
          cursor: "pointer",
          padding: "6px 12px",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          borderBottom: "1px solid #333",
        }}
      >
        {node.title}
      </div>
      {open &&
        node.children.map((child, i) => (
          <RenderMenu
            key={i}
            node={child}
            level={level + 1}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
}

export default function App() {
  // Construcción del árbol N-ario
  const root = new MenuNode("Main Menu", "/", "Welcome to the app!");

  const messages = new MenuNode("Messages", "/messages", "📩 Messages section");
  const settings = new MenuNode("Settings", "/settings", "⚙️ Settings section");
  const help = new MenuNode("Help", "/help", "💡 Help and documentation");

  const account = new MenuNode("Account", "/settings/account", "👤 Account details");
  const privacy = new MenuNode("Security & Privacy", "/settings/privacy", "🔒 Privacy settings");
  const notification = new MenuNode("Notification", "/settings/notification", "🔔 Notification settings");

  settings.addChild(account);
  settings.addChild(privacy);
  settings.addChild(notification);

  const faq = new MenuNode("FAQ", "/help/faq", "❓ Frequently Asked Questions");
  const contact = new MenuNode("Contact Support", "/help/contact", "📞 Contact support");
  help.addChild(faq);
  help.addChild(contact);

  root.addChild(messages);
  root.addChild(settings);
  root.addChild(help);

  const [selectedNode, setSelectedNode] = useState(root);

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#121212" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#1e1e1e",
          color: "white",
          overflowY: "auto",
        }}
      >
        {root.children.map((child, i) => (
          <RenderMenu key={i} node={child} onSelect={setSelectedNode} />
        ))}
      </div>

      {/* Contenido */}
      <div
        style={{
          flex: 1,
          color: "white",
          padding: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
      >
        <div>
          <h2>{selectedNode.title}</h2>
          <p style={{ marginTop: "10px" }}>{selectedNode.component}</p>
          <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "#aaa" }}>
            Link: {selectedNode.link}
          </p>
        </div>
      </div>
    </div>
  );
}
