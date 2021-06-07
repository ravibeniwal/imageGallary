import React from "react";
import GoogleMapReact from "google-map-react";
import MarkerNew from "./Marker";

const SimpleMap = (props) => {
  const {mapData} = props;

  return (
    <div>
    <div style={{height: "40vh", width: "100%"}}>
      <GoogleMapReact
        bootstrapURLKeys={{key: "AIzaSyAX8EfoQNXvjcBsTuMw9uNEUd86sz7uD3c"}}
        
        center={{
          lat: mapData?.imageLocation?.lat || 59.955413,
          lng: mapData?.imageLocation?.lang || 30.337844,
        }}
        defaultZoom={6}
      >
        <MarkerNew
          lat={mapData?.imageLocation?.lat || 59.955413}
          url={mapData?.url}
          lng={mapData?.imageLocation?.lang || 30.337844}
          name={mapData?.name}
          color="blue"
        />
      </GoogleMapReact>
    </div>
 </div>
  );
};

export default SimpleMap;
