import React, { useState, useEffect } from "react";
import Column from "./column";


const ManageBoard = () => {
  const [products, setProducts] = useState([]);

  const getColumns = () => {
    return fetch(`http://localhost:8080/getcolumns`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
console.log({products})


  const deleteCol = () => {
    return fetch(`http://localhost:8080/deletecol`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  const preload = () => {
    getColumns().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = products => {
    deleteCol(products.id).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
            
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  )
        }
export default ManageBoard;
