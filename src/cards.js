import React, { useState } from "react";
import { Link } from "react-router-dom";


const Cards = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    error: "",
    success: false
  });

  const createcard = user =>{
    return fetch(`http://localhost:8080/card/new`, {
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

  const { title, description, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createcard({ title,description})
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            title:"",
            description:"",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in Cards"));
  };

  const CardForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
            <p>Create Card</p>
              <label className="text-light">title</label>
              <input
                className="form-control"
                onChange={handleChange("title")}
                type="text"
                value={title}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Description</label>
              <input
                className="form-control"
                onChange={handleChange("description")}
                type="description"
                value={description}
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

 // <p className="text-white text-center">{JSON.stringify(values)}</p>import React, { useState } from "react";
