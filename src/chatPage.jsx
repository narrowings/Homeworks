import { useEffect, useState } from "react";
import { database } from "../src/firebase/config";
import { ref, push, onValue } from "firebase/database";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    const messagesRef = ref(database, "messages");

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const formatted = Object.keys(data).map((key) => ({
        id: key,
        text: data[key].text,
        date: data[key].date
      }));
      setMessagesList(formatted);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    const messagesRef = ref(database, "messages");
    push(messagesRef, {
      text: message,
      date: new Date().toLocaleString()
    });

    setMessage("");
  };

  return (
    <div>
      <h1>Mini Chat (Solo tú)</h1>
      <ul>
        {messagesList.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.date}</strong> → {msg.text}
          </li>
        ))}
      </ul>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatPage;
