import React, { useState , useEffect } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import axios from 'axios';
import "@lourenci/react-kanban/dist/styles.css";
// Use your own styles to override the default styles
import "./styles.css";
//import DataFetching from "./datafetch";


const DataFetching = () => {
 // const [loading,setloading] = useState(true)
 // const [error,seterror] = useState('')
  const [posts,setpost] = useState([])

  useEffect(() =>{
axios.get("https://cors-anywhere.herokuapp.com/https://react-kanban-server.herokuapp.com/")
.then(res =>{
  console.log(res)
//  setloading(false)
  setpost(res.data)
 // seterror('')
})
.catch( error =>{
 // setloading(false)
  setpost({})
 // seterror('')
})
  }, [])

  return(
      
      <div>
          <ul>
          {posts.map(post =>(
          <li key={post.id}>{post.Name}</li>
))}
          </ul>
      

      </div>
  )
}


function ControlledBoard() {
  // You need to control the state yourself.
  const [controlledBoard, setBoard] = useState(DataFetching);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  return (
    <Board onCardDragEnd={handleCardMove} disableColumnDrag>
      {controlledBoard}
    </Board>
     
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
  
    </>
  );
}
export default App;