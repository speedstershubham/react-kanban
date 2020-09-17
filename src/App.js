import React, {Component, useState } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
 //import "./styles.css";
import Datafetch from "./Datafetch";

export class App extends Component {
  state ={message:""}

  callbackFunction = (childData) => {
    this.setState({message: childData})
}

  render() {
    
    return (
      <div>
         <ControlledBoard  board={this.state.message}/>
      <Datafetch Data = {this.callbackFunction}/>
      {console.log(this.state.message)}
      <p>  {this.state.message} </p>
      </div>
    )
  }
}

export default App


const board = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Card title 1",
          description: "Card content"
        },
        {
          id: 2,
          title: "Card title 2",
          description: "Card content"
        },
        {
          id: 3,
          title: "Card title 3",
          description: "Card content"
        }
      ]
    },
    {
      id: 2,
      title: "Doing",
      cards: [
        {
          id: 9,
          title: "Card title 9",
          description: "Card content"
        }
      ]
    },
    {
      id: 3,
      title: "Q&A",
      cards: [
        {
          id: 10,
          title: "Card title 10",
          description: "Card content"
        },
        {
          id: 11,
          title: "Card title 11",
          description: "Card content"
        }
      ]
    },
    {
      id: 4,
      title: "Production",
      cards: [
        {
          id: 12,
          title: "Card title 12",
          description: "Card content"
        },
        {
          id: 13,
          title: "Card title 13",
          description: "Card content"
        }
      ]
    }
  ]
};

const ControlledBoard = () => {

  const [controlledBoard, setBoard] = useState(board);

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


