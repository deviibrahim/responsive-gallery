import React, { useEffect, useState } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import { list } from "./Image";
import "../stylesheet/gallery.css";
import {  toast } from 'react-toastify';
const Gallery = () => {
  // states
  const [items, setItems] = useState([]); 
  const [selected, setSelected] = useState([]);
//swaping element
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  }
  //handling item select
  const handleSelect = (item) => {
    const isSelected = selected.some(
      (selectedItem) => selectedItem.id === item.id
    );

    if (isSelected) {
      const updatedSelected = selected.filter(
        (selectedItem) => selectedItem.id !== item.id
      );
      setSelected(updatedSelected);
    } else {
      setSelected([...selected, item]);
    }
  };
  //handle delete
  const handleDelete = () => {
    if (selected.length === 0) {
      return; 
    }
    const updatedItems = items.filter(
      (item) => !selected.some((selectedItem) => selectedItem.id === item.id)
    );
    setItems(updatedItems); 
    setSelected([]); 
    toast.success(`${selected?.length} item${selected?.length>1?"s":""} deleted successfully `)
  };
  //side effect
  useEffect(() => {
    setItems(list);
  }, [list]);
  return (
    < div className="">
      {/* header */}
    <div className="d-flex justify-content-between pt-4 mx-2">
      <div>
      {selected?.length > 0 ? (
        <>
          <h4 className="fw-bold">{selected?.length} Files Selected</h4>
        </>
      ) : (
        <>
          <h4 className="fw-bold">Image Gallery</h4>
        </>
      )}
      </div>
      <div>{selected?.length>0 && (<>
      <button className="btn "
      style={{backgroundColor:"black",color:"white"}}
      onClick={()=>handleDelete()}
      >Delete</button>
      </>)}</div>
    </div>
    <hr/>
    {/* grid items */}
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="items"
          boxesPerRow={window.innerWidth>768?5:2}
          rowHeight={200}
          
          style={{ height: 100 * Math.ceil(items.length / 2)+90,margin:"20px" 
        }}
        >
          {items.map((item, index) => (
            <GridItem key={item?.id}
            style={{
              top: window.innerWidth > 768 && index === 0 ? "40px" : (window.innerWidth > 768 && (index % 5) === 0 ? "90px" : "0px"),
            }}            
            
            >
              <div
                className="card wrap-me"
                style={{
                  cursor: "pointer",
                  height: "90%",
                  marginRight: window.innerWidth>768&& index == 0 ? "23%" : "20px",
                  marginBottom: "20px",
                  transform:  window.innerWidth>768 && index == 0 ? "scale(1.4)" : "none",
                }}
              >

                
                <input
                  onChange={() => handleSelect(item)}
                  style={{ zIndex: 999, borde:"2px solid #000", width: "20px", height: "20px",position:"absolute" }}
                  className="form-check-input m-1"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                ></input>
                <img
                  className="card-img-top "
                  src={item.src}
                  alt="Card image cap"
                  height={"100%"}
                />
                <div className="cover-me"></div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
    </div>
  );
};

export default Gallery;
