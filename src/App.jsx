import { useState } from "react";

const initialItems = [
  { id: 1, description: "Water Pot", quantity: 2, packed: false },
  { id: 2, description: "Charger", quantity: 1, packed: false },
  { id: 3, description: "Shoe", quantity: 3, packed: false },
];

const App = () => {
  const [items, setItems] = useState(initialItems);

  function itemHandeler(item) {
    setItems((items) => [...items, item]);
  }

  function ondeleteHandeler(id) {
    setItems((items) => items.filter((item) => id !== item.id));
  }

  function checkMarkItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <>
      <div className="app">
        <Header />
        <Form addItem={itemHandeler} />
        <PackList
          items={items}
          onDelete={ondeleteHandeler}
          onToggleItem={checkMarkItem}
        />
        <Footer />
      </div>
    </>
  );

  function Header() {
    return <h1>Far from away</h1>;
  }
  function Form({ addItem }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handler = (e) => {
      e.preventDefault();

      if (!description) return;

      const newItem = {
        description,
        quantity,
        packed: false,
        id: Date.now(),
      };

      addItem(newItem);

      setDescription("");
      setQuantity(1);
    };

    return (
      <form className="add-form" onSubmit={handler}>
        <h3>What do you need for your 😁 trip?</h3>

        <select
          name=""
          id=""
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
          }}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button>Add</button>
      </form>
    );
  }
  function PackList({ items, onDelete, onToggleItem }) {
    return (
      <div className="list">
        <ul>
          {items.map((item) => (
            <Item
              item={item}
              onToggleItem={onToggleItem}
              key={item.id}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>
    );
  }
  function Item({ item, onDelete, onToggleItem }) {
    return (
      <li>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => onToggleItem(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          ( {item.quantity} ) {item.description}
        </span>
        <button onClick={() => onDelete(item.id)}>❌</button>
      </li>
    );
  }
  function Footer() {
    return (
      <footer className="stats">
        <em>You have X item on your list, you already packed x (X%) </em>
      </footer>
    );
  }
};

export default App;
