import React, { Component , useState , useEffect} from 'react'
import axios from 'axios'


class Datafetch extends Component {
 sendData = () => {
    this.props.parentCallback("");
}
  render() {
    function Data() {
      const[posts, setPost] = useState([])
    
      useEffect(() => {
        axios
     .get("https://react-kanban-server.herokuapp.com/")
      .then(response =>{
        console.log(response)
        setPost(response.data)
      })
      .catch(err => {
        console.log(err)
      })
      },[])
     
      return(
        <div>
          <ul>
            {posts.map(post =>(
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div>
        <Data  />
      </div>
    )
  }
}

export default Datafetch