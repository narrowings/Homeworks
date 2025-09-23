// Nodo de lista simple
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Lista simple
export class LinkedList {
  constructor() {
    this.head = null;
    this.current = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.current = this.head;
    } else {
      let temp = this.head;
      while (temp.next) temp = temp.next;
      temp.next = newNode;
    }
  }

  next() {
    if (this.current?.next) {
      this.current = this.current.next;
    }
    return this.current?.value || null;
  }

  reset() {
    this.current = this.head;
    return this.current?.value || null;
  }
}

// Nodo de lista doble
class DoubleNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

// Lista doblemente enlazada
export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
  }

  append(value) {
    const newNode = new DoubleNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  next() {
    if (this.current?.next) {
      this.current = this.current.next;
    }
    return this.current?.value || null;
  }

  prev() {
    if (this.current?.prev) {
      this.current = this.current.prev;
    }
    return this.current?.value || null;
  }

  reset() {
    this.current = this.head;
    return this.current?.value || null;
  }
}
