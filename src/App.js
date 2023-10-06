import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null);
  // Initialize state with data from local storage
  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);
  const handleInputList = (event) => {
    setInputList(event.target.value);
  };
  const handleSubmit = () => {
    if (edit !== null) {
      // Edit existing item
      const updatedItems = [...items];
      updatedItems[edit] = inputList;
      setItems(updatedItems);
      setEdit(null);
      setInputList("");
      localStorage.setItem("items", JSON.stringify(updatedItems));
    } else {
      // Add new item
      const updatedItems = [...items, inputList];
      setItems(updatedItems);
      setInputList("");
      localStorage.setItem("items", JSON.stringify(updatedItems));
    }
  };

  const handleDel = (index) => {
    const removedItem = items.splice(index, 1);
    // Remove deleted item from local storage
    const updatedItems = [...items];
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleEdit = (index) => {
    const data = items[index];
    setInputList(data);
    setEdit(index);
  };
  return (
    <div className="App">
      <div className="maindiv">
        <div className="centerdiv">
          <h1>Todo List App</h1>
          <div className="inputdiv">
            <div className="inputField">
              <input
                className="input"
                type="text"
                placeholder="add items"
                onChange={handleInputList}
                value={inputList}
              ></input>
              <button onClick={handleSubmit}>Add</button>
            </div>
            <div className="list">
              <ul>
                {items.map((item, index) => (
                  <li className="listItems" key={item}>
                    {item}
                    <div className="buttons">
                      <button
                        className="deleteButton"
                        onClick={() => handleDel(index)}
                      >
                        delete
                      </button>
                      <button
                        className="editButton"
                        onClick={() => handleEdit(index)}
                      >
                        edit
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
