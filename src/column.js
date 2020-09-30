import React, { useState } from "react";



const Column = () => {

  const [values, setValues] = useState({
    title: "",
    error: "",
    success: false
  });
  

  const createcolumn = async col => {
    return await fetch(`https://react-kanban-server.herokuapp.com/new/`, {
        method:"POST",
        headers :{
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        body: JSON.stringify(col)

    })
    
    .then(response => {

        return response.json(col);
    })
    .catch(err => console.log(err));
};

  const { title, error, success } = values;

  const handleChange = title => event => {
    setValues({ ...values, error: false, [title]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createcolumn({ title})
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
             
              <input
                className="form-control"
                onChange={handleChange("title")}
                placeholder="Enter new Column"
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

