import { createContext, useState } from "react";
import axios from "axios";

const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const getLists = async() => {
    await axios.get("http://localhost:3000/get").then((response) => {

       if (response.data) {
        const { data, page, dataPerPage, totalPage } = response.data;
        setItems(data);
      }
    })
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
