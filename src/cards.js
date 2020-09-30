import React, { useState ,useEffect} from "react";

const Cards = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    columns: [],
    columnid: "",
    error: "",
    success: false
  });

  
  const createcard = user =>{
    return fetch(`https://react-kanban-server.herokuapp.com/card/new/${columnid}`, {
        method:"POST",
        headers :{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

const preload = () => {
  getColumns().then(data => {
    console.log({data});
    if (data.error) {
      setValues({ ...values, error: data.error });
    } else {
      setValues({ ...values, columns: data});
    }
  });
};
useEffect(() => {
  preload();
}, [] );


const getColumns = () => {
  return fetch(`https://react-kanban-server.herokuapp.com/getcolumns`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

  const { title, description, error, success , columns, columnid} = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createcard({ title,description,columnid})
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            title:"",
            description:"",
            columnid:"",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in Cards"));
  };
console.log({columns})
  const CardForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
            <p>Create Card</p>
             
            <div className="form-group">
        <select
          onChange={handleChange("columnid")}
          className="form-control"
          placeholder="column"
        >
          <option>Select Column</option>
        
          {columns &&
            columns.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.title}
              </option>
            ))}
        </select>
      </div>

              <input
                className="form-control"
                onChange={handleChange("title")}
                type="text"
                placeholder="Enter Title"
                value={title}
              />
            </div>
           
            <div className="form-group">
           
              <input
                className="form-control"
                onChange={handleChange("description")}
                type="description"
                value={description}
                placeholder="Enter Description"
              />
            </div>
          

            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Card was created successfully. Please{" "}
           
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
   <div>
      {successMessage()}
      {errorMessage()}
      {CardForm()}
      </div>
  );
};

export default Cards;


