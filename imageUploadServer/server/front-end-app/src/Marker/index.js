import React from "react";
import "./Marker.css";

const Marker = (props) => {
  const {name, url} = props;
  return (
    <>
      <div style={{backgroundImage: `url("${url}")`}} class="pin"></div>
      <div class="pulse"></div>
      <h2 style={{padding: "43px 0px",color: 'rgb(255 255 255 / 85%)',
    }}>{name}</h2>
    </>
  );
};

export default Marker;
