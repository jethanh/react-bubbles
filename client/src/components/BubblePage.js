import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";


import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const fetchColor = () => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        setColorList(res.data)
        console.log(res, "A");
      })
      .catch(err => console.log(err))
};

  const deleteColors = deletedColor => {
    const newColorList = [...colorList];
    const deletedColors = newColorList.filter(item => item.id !== deletedColor)
    setColorList(deletedColors);
  }

useEffect(() => {
  fetchColor();
}, []);
  

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} fetchColor={fetchColor} deleteColors={deleteColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
