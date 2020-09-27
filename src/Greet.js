import React from 'react'

const Greet = (cards) =>{
    console.log(cards)
   //const  card =props.cards
   // const listitems = card.map((number) => <li key={number.columnid}>{number.title}</li>);
    return (
        <div>
         {cards}
        </div>
    )
    }


export default Greet;
