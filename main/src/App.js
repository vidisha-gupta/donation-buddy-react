import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from './config.js';
import { Button, Checkbox, TextField } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiKey: config["API_KEY"],
      center: { lat: 47.606209, lng: -122.332069 },
      zipcode: 98105,
      zoom: 13,
      clothing: false,
      food: false,
      essential: false,
      blood: false
    };
  }

  sendRequest = async () => {
    if (isNaN(this.state.zipcode) || this.state.zipcode.toString().length !== 5) {
      alert("Please input a valid zipcode of 5 digits!");
      return;
    }
    const url = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + this.state.zipcode + "&key=" + this.state.apiKey;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        alert("The status is wrong! Expected: 200, Was: " + response.status);
        return; // Don't keep trying to execute if the response is bad.
      }
      const text = await response.json();
      this.setState({
        center: text.results[0].geometry.location,
        zoom: 13,
      });
    } catch (e) {
      alert("There was an error contacting the server. Your zip code may be invalid.");
      console.log(e);
    }
  }

  handleInputChange = (event) => {
    this.setState({
      zipcode: event.target.value,
    });
  }

  clothesCheck = (event) => {
    this.setState({
      clothes: event.target.checked
    });
  }

  foodCheck = (event) => {
    this.setState({
      food: event.target.checked
    });
  }

  essentialCheck = (event) => {
    this.setState({
      essential: event.target.checked
    });
  }

  bloodCheck = (event) => {
    this.setState({
      blood: event.target.checked
    });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Donation Buddy</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="index.js">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="services.js">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About Us </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-5  m-5 p-5">
            <TextField
              type="number"
              id="zipcode"
              label="Enter your zipcode"
              placeholder="98105"
              value={this.state.zip}
              onChange={this.handleInputChange}
            />
            <div id="features">
              <br></br>
              <h5>Features</h5>
              <Checkbox
                id="clothes"
                label="Clothes"
                onChange={this.clothesCheck}
              /> Clothing
              <br></br>
              <Checkbox
                id="foodBanks"
                label="Food Banks"
                onChange={this.bloodCheck}
              /> Food Banks
              <br></br>
              <Checkbox
                id="essentialProducts"
                label="Essential Products"
                onChange={this.essentialCheck}
              /> Essential Products
              <br></br>
              <Checkbox
                id="blood"
                label="Blood"
                onChange={this.bloodCheck}
              /> Blood
            </div>
            <Button onClick={this.sendRequest}>
              GO
            </Button>
          </div>
          <div className="col-md-5 m-3">
            <div style={{ height: '80vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: this.state.apiKey }}
                center={this.state.center}
                zoom={this.state.zoom}
              >
              </GoogleMapReact>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
export default App;