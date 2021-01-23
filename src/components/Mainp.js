import React, { useState, useEffect } from "react";

import "./App.css";
import TextField from "@material-ui/core/TextField";
// import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import Spells from "./Spells";
import { db } from "../firebase";

import { Card } from "react-bootstrap";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

function Mainp() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [clearState, clearSetState] = useState("");

  useEffect(() => {
    getTodos();
  }, []);
  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  }

  function addTodo(e) {
    e.preventDefault();

    db.collection("todos").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    setTodoInput("");
  }
  // function handleReset(e) {
  //   e.preventDefault();
  //   e.target.reset();
  //   e.clearSetState({
  //     TextareaAutosize: [{}],
  //   });
  // }

  return (
    <Card>
      <Card.Body>
        <div className="App">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <form>
              <TextareaAutosize
                id="outlined-basic"
                variant="outlined"
                // id="standard-basic"
                label="Text"
                value={todoInput}
                style={{ width: "90vw", maxWidth: "500px" }}
                onChange={(e) => setTodoInput(e.target.value)}
                defaultValue="Rest"
              />
              <Button
                type="submit"
                variant="contained"
                onClick={addTodo}
                // style={{ display: "none" }}
              >
                ADD +
              </Button>

              <Button variant="contained" type="reset">
                Reset
              </Button>
            </form>

            <div
              style={{ width: "90vw", maxWidth: "500px", marginTop: "24px" }}
            >
              {todos.map((todo) => (
                <Spells
                  todo={todo.todo}
                  inprogress={todo.inprogress}
                  id={todo.id}
                />
              ))}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Mainp;
