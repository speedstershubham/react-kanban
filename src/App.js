import React, { useState } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
// Use your own styles to override the default styles
import "./styles.css";
import DataFetching from "./datafetch";

function ControlledBoard() {
  // You need to control the state yourself.
  const [controlledBoard, setBoard] = useState(DataFetching);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  return (
    <DataFetching onCardDragEnd={handleCardMove} disableColumnDrag>
      {controlledBoard}
    </DataFetching>
     
  ); 
}

function App() {
  return (
    <>
      
      <p>Just the card moving is implemented in this demo.</p>
      <p>
        In this kind of board, you can do whatever you want. We just mirror your
        board state.
      </p>
      <ControlledBoard />
      <DataFetching />
    </>
  );
}
export default App;