// /* global google */

import React, { Component } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import TopBar from "./TopBar";
import "./App.css";
import MapComponent from "./MapComponent";

function trial() {
  console.log("this is", navigator.geolocation);
}

class TaxiApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      bSearched: false,
      mapOptions: {
        center: { lat: 1.35, lng: 103.82 },
        zoom: 12
      },
      showOverlay: { traffic: false },
      overlays: ["TransitLayer"]
    };
  }

  // for Autocomplete search
  handleSearchChange = address => this.setState({ address });

  // for Autocomplete search
  handleSearchSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        // console.log("results", results[0]);
        return getLatLng(results[0]);
      })
      .then(latLng => {
        // console.log("latlng", latLng);
        this.setState({
          bSearched: true,
          mapOptions: {
            center: latLng,
            zoom: 17
          }
        });
      })
      .catch(error => console.error("Error in search", error));
  };

  handleTrafficCheckBoxChange = event => {
    const target = event.target;
    const { traffic } = this.state.showOverlay; // boolean for checkbox

    // if traffic check box is selected
    if (target.name === "cbTraffic") {
      this.setState({ showOverlay: { traffic: !traffic } });
      if (traffic) {
        this.setState({ overlays: ["TransitLayer"] });
      } else {
        this.setState({ overlays: ["TrafficLayer", "TransitLayer"] });
      }
    }
  };

  render() {
    trial();
    return (
      <div className="App">
        <TopBar
          address={this.state.address}
          bSearched={this.state.bSearched}
          mapOptions={this.state.mapOptions}
          handleSearchChange={this.handleSearchChange}
          handleSearchSelect={this.handleSearchSelect}
          handleTrafficCheckBoxChange={this.handleTrafficCheckBoxChange}
          showOverlay={this.state.showOverlay}
        />
        <MapComponent
          mapOptions={this.state.mapOptions}
          bSearched={this.state.bSearched}
          showOverlay={this.state.showOverlay}
          overlays={this.state.overlays}
        />
      </div>
    );
  }
}
export default TaxiApp;
