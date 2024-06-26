function Footer({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <p>
          <em>Start adding items to your packing list🚀</em>
        </p>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You packed everything!👌 Ready to go🛩️"
          : `You have ${numItems} items on your list, you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

export default Footer;
