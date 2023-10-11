import { createContext, useState } from "react";

const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null);
  const getLists = () => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  };
  const context = {
    inputList,
    setInputList,
    items,
    setItems,
    edit,
    setEdit,
    getLists,
  };
  return (
    <ToDoContext.Provider value={context}>{children}</ToDoContext.Provider>
  );
};

export default ToDoContext;
