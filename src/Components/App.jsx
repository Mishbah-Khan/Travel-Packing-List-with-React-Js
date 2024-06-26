import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import PackList from "./PackList";
import Footer from "./Footer";

// (initialItems) used just for demo.
const initialItems = [
  { id: 1, description: "Water Pot", quantity: 2, packed: false },
  { id: 2, description: "Charger", quantity: 1, packed: false },
  { id: 3, description: "Shoes", quantity: 3, packed: false },
];

const App = () => {
  //State should be blanked array like = useState([])
  const [items, setItems] = useState(initialItems);

  function itemHandler(item) {
    setItems((items) => [...items, item]);
  }

  function onDeleteHandler(id) {
    setItems((items) => items.filter((item) => id !== item.id));
  }

  function checkMarkItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function clearList() {
    const conformation = window.confirm("Are you sure about clear the list ?");
    if (conformation) setItems([]);
  }

  return (
    <>
      <div className="app">
        <Header />
        <Form addItem={itemHandler} />
        <PackList
          items={items}
          onDelete={onDeleteHandler}
          onToggleItem={checkMarkItem}
          clearList={clearList}
        />
        <Footer items={items} />
      </div>
    </>
  );
};

export default App;
