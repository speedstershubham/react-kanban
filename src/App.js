import React , {useState,useEffect} from 'react'
import axios from 'axios';
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import {board} from "./datafetch"

const datafetch = () =>{

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    board().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);
 

      return (
       
      )
}


const ControlledBoard =  () =>{
 
  const [controlledBoard, setBoard] = useState(board);

  const handleCardMove = (_card, source, destination) => {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  return (
    <Board onCardDragEnd={handleCardMove} disableColumnDrag>
      {controlledBoard}
    </Board>
  );
}



const App = () => {
 
  return (
    
    <>
      
      <ControlledBoard />

  
    </>
  );
}


export default App;
