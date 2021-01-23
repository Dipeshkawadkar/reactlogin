import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { Button } from "@material-ui/core";

import { Card } from "react-bootstrap";

import { db } from "../firebase";

export default function TodoListItem({ todo, inprogress, id }) {
  const [secondary, setSecondary] = React.useState(false);

  function toggleInProgress() {
    db.collection("todos").doc(id).update({
      inprogress: !inprogress,
    });
  }

  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }

  return (
    <>
      <Card>
        <div style={{ display: "flex" }}>
          <ListItem>
            <ListItemText
              primary={todo}
              secondary={secondary ? "Secondary text" : null}
            />
          </ListItem>
          <Button onClick={toggleInProgress}></Button>
          <IconButton onClick={deleteTodo} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      </Card>
      <br />
    </>
  );
}
