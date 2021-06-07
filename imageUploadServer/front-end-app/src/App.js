import "./App.css";
import "antd/dist/antd.css";
import ImageGallary from "./ImagesGallary";
import ImageTableView from "./ImageTableView";
import {Button} from "antd";
import {useState} from "react";

function App() {
  const [mapView, setMapView] = useState(false);
  return (
    <div className="App">
      {mapView ? <ImageTableView /> : <ImageGallary />}
      <Button
        style={{margin: "20px 10px"}}
        size="large"
        type="primary"
        onClick={() => {
          setMapView(!mapView);
        }}
      >
        {mapView ? "Image Gallary" : "View Images"}
      </Button>
    </div>
  );
}

export default App;
