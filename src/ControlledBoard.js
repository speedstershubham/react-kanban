import React,{useState,useEffect} from 'react'
import Board, { moveCard } from "@lourenci/react-kanban";
import axios from 'axios'
import "@lourenci/react-kanban/dist/styles.css";



  const ControlledBoard = () => {
  
    const [controlledBoard, setBoard] = useState();

    const getData= async() =>{
try {
  const response = await axios.get("https://react-kanban-server.herokuapp.com/")
//  console.log(response.data)

const {columns,cards} = ({...response.data})

const columnData = columns.map(column => {
  return ({ ...column,cards:cards.filter(card => card.columnid === column._id)})
})
setBoard({columns:columnData})
} catch (error) {
  console.log(error)
}
    }

    useEffect(() => {
    getData()
    },[])
    
    const handleCardMove = (_card,source, destination ) => {
      console.log( "111111", {_card,source, destination })
      console.log({controlledBoard})
      const updatedBoard = moveCard(controlledBoard, source, destination);
      setBoard(updatedBoard);
    }
    

  console.log({controlledBoard})

  if(!controlledBoard){
    return (
      <div> 
         </div>
    )
  }
    return (
      <Board onCardDragEnd={handleCardMove} disableColumnDrag>
        {controlledBoard}
      </Board>
    );
  }

  export default ControlledBoard