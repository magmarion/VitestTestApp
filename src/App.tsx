import CounterButton from "./components/CounterButton";
import DeleteButton from "./components/DeleteButton";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  const handleDelete = () => {
    setItems((prevItems) => prevItems.slice(0, -1));
  };

  return (
    <div>
      <h1>Vite + React</h1>
      <CounterButton />
      <DeleteButton onClick={handleDelete} />

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
