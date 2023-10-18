import { useEffect, useContext } from "react";
import "./List.css";
import ToDoContext from "../Context/main.context";
import axios from "axios";

const TodoList = () => {
  const {
    inputList,
    setInputList,
    items,
    setItems,
    edit,
    setEdit,
    getLists,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useContext(ToDoContext);
  // Initialize state with data from local storage
  useEffect(() => {
    getLists();
  }, [currentPage,items]);
  const handleInputList = (event) => {
    setInputList(event.target.value);
  };
  const handleSubmit = async () => {
    if (inputList.trim() !== "") {
      if (edit !== null) {
        // Edit existing item
        await axios
          .put(`http://localhost:3000/upd/${edit}`, { title: inputList })
          .then((response) => {
            if (response) {
              setItems([response.data]);
              console.log("data updated");
            }
          })
          .catch((err) => {
            console.log("error in update the data");
          });
        setEdit(null);
        setInputList("");
      } else {
        await axios
          .post("http://localhost:3000/create", { title: inputList })
          .then((response) => {
            if (response) {
              console.log("data saved");
            }
          })
          .catch((err) => {
            console.log("err in post data", err);
          });
        setInputList("");
      }
    }
  };

  const handleDel = async (id) => {
    await axios
      .delete(`http://localhost:3000/del/${id}`)
      .then((response) => {
        if (response) {
          console.log("data deleted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = ({ _id, title }) => {
    setInputList(title);
    setEdit(_id);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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
                {items.map((item) => (
                  <li className="listItems" key={item._id}>
                    {item.title}
                    <div className="buttons">
                      <button
                        className="deleteButton"
                        onClick={() => handleDel(item._id)}
                      >
                        delete
                      </button>
                      <button
                        className="editButton"
                        onClick={() => handleEdit(item)}
                      >
                        edit
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pagebutton">
            <button className="prvbttn" onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button
            className="nxtbttn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
            </div>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
