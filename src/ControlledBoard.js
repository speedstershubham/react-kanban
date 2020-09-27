import React,{useState,useEffect} from 'react'
import Board, { moveCard } from "@lourenci/react-kanban";
import axios from 'axios'


  const ControlledBoard = () => {
  
    const [controlledBoard, setBoard] = useState();
  


    const getData= async() =>{
try {
  const response = await axios.get("http://localhost:8080/")
//  console.log(response.data)

const {columns,cards} = ({...response.data})
console.log({columns})
console.log({cards})

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