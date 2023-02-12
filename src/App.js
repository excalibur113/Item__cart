import './App.css';
import React, { useState, useMemo } from 'react';


function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleItemIncrement = (itemIndex) => {
    setItems(
      items.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleItemDecrement = (itemIndex) => {
    setItems(
      items.map((item, index) =>
        index === itemIndex && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleItemDelete = (itemIndex) => {
    setItems(items.filter((item, index) => index !== itemIndex));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setItems([...items, { name: newItem, quantity: 0 }]);
    setNewItem('');
  };

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  return (
    <div className="shopping-list-container">
      <div className="shopping-list-card">
        <div className="shopping-list">
          <form onSubmit={handleSubmit}>
            <input type="text" value={newItem} onChange={handleInputChange} />
            <button type="submit">Add</button>
          </form>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.name}{' '}
                <button onClick={() => handleItemIncrement(index)}>+</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleItemDecrement(index)}>-</button>
                <button onClick={() => handleItemDelete(index)}>x</button>
              </li>
            ))}
          </ul>
          <div className="total">Total: {total}</div>
        </div>
      </div>
    </div>
  );
}
export default App;