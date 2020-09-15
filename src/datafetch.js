import React , {useState,useEffect} from 'react'
import axios from 'axios';

const DataFetching = props => {
    console.log(props)
    const [loading,setloading] = useState(true)
    const [error,seterror] = useState('')
    const [columns,setcolumns] = useState([])

    useEffect(() =>{
axios.get("https://cors-anywhere.herokuapp.com/https://react-kanban-server.herokuapp.com/")
.then(res =>{
    console.log(res)
    setloading(false)
    setcolumns(res.data.columns)
    seterror('')
})
.catch( error =>{
    setloading(false)
    setcolumns([])
    seterror('')
})
    }, [])

    return(
        
        <div>
             {props.columns}
            <ul>
            {columns.map((post) =>(
            <li key={post.id}>{post.title} {post.cards}</li>
           
))}
            </ul>
        

        </div>
    )
}

export default DataFetching;