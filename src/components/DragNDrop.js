import React, { useState, useRef, useEffect } from "react";

function DragNDrop({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const [values, setValues] = useState({
    columns: [],
  });

  useEffect(() => {
    setList(data);
  }, [setList, data]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handletDragStart = (e, item) => {
    console.log("Starting to drag", item);

    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  const handleDragEnter = (e, targetItem) => {
    console.log("Entering a drag target", targetItem);
    if (dragItemNode.current !== e.target) {
      console.log("Target is NOT the same as dragged item");
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[targetItem.grpI].cards.splice(
          targetItem.itemI,
          0,
          newList[dragItem.current.grpI].cards.splice(
            dragItem.current.itemI,
            1
          )[0]
        );
        dragItem.current = targetItem;
        localStorage.setItem("List", JSON.stringify(newList));
        return newList;
      });
    }
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
  

  const deleteColumn = columnid => {
    deleteCol(columnid).then(data => {
      console.log({data})
      if (data.error) {
        console.log(data.error);
      } else {
        list();
      }
    });
  };


  const deleteCol = columnid => {
    return fetch(`https://react-kanban-server.herokuapp.com/deletecol/${columnid}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      }
    })
      .then(response => {
        return response.json(columnid);
      })
      .catch(err => console.log(err));
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };
  const getStyles = (item) => {
    if (
      dragItem.current.grpI === item.grpI &&
      dragItem.current.itemI === item.itemI
    ) {
      return "dnd-item current";
    }
    return "dnd-item";
  };
  console.log({ list });
  if (list) {
    return (
      <div className="drag-n-drop">
        {list.map((grp, grpI) => (
          <div
            key={grp.title}
            onDragEnter={
              dragging && !grp.length
                ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                : null
            }
            className="dnd-group"
          >
              <div className="col-4">
                  <button
                    onClick={() => {
                      deleteColumn(grp._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
            <div className="group-title">{grp.title} </div>
            {grp.cards.map((item, itemI) => (
              <div
                draggable
                key={item.title}
                onDragStart={(e) => handletDragStart(e, { grpI, itemI })}
                onDragEnter={
                  dragging
                    ? (e) => {
                        handleDragEnter(e, { grpI, itemI });
                      }
                    : null
                }
                className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
              >
                {item.title} <br /> {item.description}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

export default DragNDrop;
