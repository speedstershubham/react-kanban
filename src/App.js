import React from "react";
import ControlledBoard from "./ControlledBoard";
import Card from "./cards";
import Column from "./column";
import "@lourenci/react-kanban/dist/styles.css";

 const App = () => { 
 
    return (
      <div>
        <ControlledBoard />
    <Card />
    <Column />
      </div>
         
    )
  }


export default App





