import React from "react";
import "./Marker.css";

const Marker = (props) => {
  const {name, url} = props;
  return (
    <>
      <div style={{backgroundImage: `url("${url}")`}} class="pin"></div>
      <div class="pulse"></div>
      <h2 style={{padding: "12px 0px"}}>{name}</h2>
    </>
  );
};

export default Marker;
