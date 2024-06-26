import { useState } from "react";
import Item from "./Item";

function PackList({ items, onDelete, onToggleItem, clearList }) {
  const [sortBy, setSortBy] = useState("insert");

  let sortedItems;
  if (sortBy === "insert") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onToggleItem={onToggleItem}
            key={item.id}
            onDelete={onDelete}
          />
        ))}
      </ul>
      {items.length != 0 ? (
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="insert">Sort by insert order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed</option>
          </select>
          <button onClick={clearList}>Clear List</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default PackList;
