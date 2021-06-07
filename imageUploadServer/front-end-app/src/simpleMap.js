import React from 'react';
// import GoogleMapReact from 'google-map-react';
// import MarkerNew from './Marker';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"



const SimpleMap = (props) => {
    const {mapData}=props
    


    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={{lat: mapData?.lat|| 59.955413, lng: mapData?.lang||30.337844}}
    >
       <Marker position={{ lat: mapData?.lat||-34.397, lng: mapData?.lang||150.644 }} />
    </GoogleMap>
  ))

    return (
        <div style={{ height: '40vh', width: '100%' }}>
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAPFj9KcwpmM-g0XaMRZC_dXvixXJMzA4I' }}
          center={{lat: mapData?.lat|| 59.955413, lng: mapData?.lang||30.337844}}
          defaultZoom={12}
        //   ref={(ref) => {
        //     this.mapRef = ref;
        //   }}
        >
          <MarkerNew
            lat={mapData?.lat||59.955413}
            url={mapData?.url}
            lng={mapData?.lang||30.337844}
            name={mapData?.name}
            color="blue"
          />
        </GoogleMapReact> */}

<MyMapComponent
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
        {/* <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={{lat: mapData?.lat|| 59.955413, lng: mapData?.lang||30.337844}}
  >
    <Marker position={{ lat: mapData?.lat||-34.397, lng: mapData?.lang||150.644 }} />
  </GoogleMap> */}




      </div>
    );
}

export default SimpleMap;