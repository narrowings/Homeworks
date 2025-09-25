import React, { useState } from "react";
import "./ATM.scss"; 

class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) {
    this.items.push(item);
  }
  dequeue() {
    return this.items.length > 0 ? this.items.shift() : null;
  }
  peek() {
    return this.items.length > 0 ? this.items[0] : null;
  }
  size() {
    return this.items.length;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  print() {
    return [...this.items];
  }
}

const queue = new Queue();
queue.enqueue({ name: "rafa", amount: 1000000, date: "2025-09-24" });

export default function QueueATM() {
  const [people, setPeople] = useState(queue.print());
  const [form, setForm] = useState({ name: "", amount: "", date: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = {
      name: form.name,
      amount: Number(form.amount),
      date: form.date,
    };

    queue.enqueue(newPerson);

    const sorted = queue.print().sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    setPeople(sorted);
    setForm({ name: "", amount: "", date: "" });
  };

  return (
    <div className="queue-container">
      <h2>💰 ATM Queue</h2>

      <form onSubmit={handleSubmit} className="queue-form">
        <input
          type="text"
          name="name"
          placeholder="Person's Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Withdrawal Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add to Queue</button>
      </form>

      <ul className="queue-list">
        {people.map((person, index) => (
          <li key={index} className="queue-item">
            <span className="queue-name">{person.name}</span>
            <span className="queue-amount">${person.amount}</span>
            <span className="queue-date">{person.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
