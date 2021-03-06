import React, { useState, useRef, useEffect } from "react";

function DragNDrop({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setList(data);
  }, [setList, data]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handletDragStart = (e, cards) => {
    console.log("Starting to drag", cards);

    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = cards;

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
        newList[targetItem.grpI].items.splice(
          targetItem.itemI,
          0,
          newList[dragItem.current.grpI].items.splice(
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
  const handleDragEnd = (e) => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };
  const getStyles = (cards) => {
    if (
      dragItem.current.grpI === cards.grpI &&
      dragItem.current.itemI === cards.itemI
    ) {
      return "dnd-item current";
    }
    return "dnd-item";
  };
  console.log(list);

  if (list) {
    return (
      <div className="drag-n-drop">
        {list.map((columns, grpI) => (
          <div
            key={grpI.id}
            onDragEnter={
              dragging && !columns.items.length
                ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                : null
            }
            className="dnd-group"
          >
            {columns.cards.map((cards, itemI) => (
              <div
                draggable
                key={itemI.id}
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
                {cards}
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
