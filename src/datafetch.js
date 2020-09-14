import React , {useState,useEffect} from 'react'
import axios from 'axios';

const DataFetching = () => {
    const [loading,setloading] = useState(true)
    const [error,seterror] = useState('')
    const [posts,setpost] = useState([])

    useEffect(() =>{
axios.get("https://cors-anywhere.herokuapp.com/https://react-kanban-server.herokuapp.com/")
.then(res =>{
    console.log(res)
    setloading(false)
    setpost(res.data)
    seterror('')
})
.catch( error =>{
    setloading(false)
    setpost({})
    seterror('')
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

export default DataFetching;