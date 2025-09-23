import { useState, useEffect } from "react";
import { DoublyLinkedList } from "./songs";

const DoublyLinkedListPage = () => {
  const [list, setList] = useState(null);
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const dll = new DoublyLinkedList();
    ["Youtube", "Facebook", "twitter", "instagram"].forEach((p) => dll.append(p));
    setList(dll);
    setCurrentPage(dll.reset());
  }, []);

  const handleNext = () => {
    if (list) {
      setCurrentPage(list.next());
    }
  };

  const handlePrev = () => {
    if (list) {
      setCurrentPage(list.prev());
    }
  };

  return (
    <div>
      <h2>Doubly Linked List (Browser Nav)</h2>
      <p>Current Page: {currentPage}</p>
      <button onClick={handlePrev}>⬅ Back</button>
      <button onClick={handleNext}>➡ Forward</button>
    </div>
  );
};

export default DoublyLinkedListPage;
