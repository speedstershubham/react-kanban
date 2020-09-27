import React, { useState } from "react";
import { Link } from "react-router-dom";


const Column = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    error: "",
    success: false
  });

  const createcolumn = user =>{
    return fetch(`http://localhost:8080/new/`, {
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
    createcolumn({ title,description})
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            title:"",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in Column"));
  };

  const ColumnForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
                <p>Create Column</p>
              <label className="text-light">title</label>
              <input
                className="form-control"
                onChange={handleChange("title")}
                type="text"
                value={title}
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
            New Column was created successfully. Please{" "}
           
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
      {ColumnForm()}
    
      </div>
  );
};

export default Column;

 // <p className="text-white text-center">{JSON.stringify(values)}</p>import React, { useState } from "react";
