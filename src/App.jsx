import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LinkedListPage from "./linkedList";
import DoublyLinkedListPage from "./dobleLinkedlist";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/linked">Linked List</Link> |{" "}
        <Link to="/doubly">Doubly Linked List</Link>
      </nav>
      <Routes>
        <Route path="/linked" element={<LinkedListPage />} />
        <Route path="/doubly" element={<DoublyLinkedListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
