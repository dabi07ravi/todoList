import { useEffect, useContext } from "react";
import "./List.css";
import ToDoContext from "../Context/main.context";
import axios from "axios";

const TodoList = () => {
  const { inputList, setInputList, items, setItems, edit, setEdit, getLists } =
    useContext(ToDoContext);
  // Initialize state with data from local storage
  useEffect(() => {
    getLists();
  }, [items]);
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
            <div class="custom-pagination">
              <a href="#" class="page-link prev deleteButton">
                Previous
              </a>
              <a href="#" class="page-link">
                1
              </a>
              <a href="#" class="page-link">
                2
              </a>
              <a href="#" class="page-link">
                3
              </a>
              <a href="#" class="page-link next editButton ">
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
