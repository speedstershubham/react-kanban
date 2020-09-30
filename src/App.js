import React, { useEffect, useState } from "react";
import axios from "axios";
import Column from "./column";
import Cards from "./cards"
import ManageBoard from "./ManageBoard";
import "./App.css";

import DragNDrop from "./components/DragNDrop";

function App() {
  const [controlledBoard, setBoard] = useState();
  const [list, setList] = useState();

  useEffect(() => {
    setList();
  }, []);


  const getData = async () => {
    try {
      const response = await axios.get(
        "https://react-kanban-server.herokuapp.com/"
      );
      //  console.log(response.data)

      const { columns, cards } = { ...response.data };

      const columnData = columns.map((column) => {
        return {
          ...column,
          cards: cards.filter((card) => card.columnid === column._id)
        };
      });
      setBoard(columnData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop data={controlledBoard} />
        <Column  data={controlledBoard}/>
        <Cards />
    
      </header>
      
    </div>
  );
}

export default App;
