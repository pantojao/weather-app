import React from 'react';
import CityInput from './cityInput.js'
import './App.css'

const fetch = require('node-fetch');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
      country: null,
      description:null,
      temperature:0,
      cityFromInput:null,
      error: null,
      icon: null, 
    };
  }
  
  callbackFunction = (childData) => {
    let city = childData.split(' ').join('+');
    this.setState({cityFromInput: city})
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=14be81d715612331f39ca17b922a70ef`)
      .then(response => response.json())
      .then(data => this.setState({ 
        city: data.name,
        country: data.sys.country,
        description:data.weather[0].description.split(" ").map(([firstChar,...rest])=>firstChar.toUpperCase()+rest.join("").toLowerCase()).join(" "),
        temperature:Math.round(data.main.temp),
        icon: data.weather[0].icon,
        error: null
        }))
      .catch(error => this.setState({ 
        error: "Please Enter Valid City"
        }));
  }

 render(){
   let errorOutput;
   if (this.state.error!==null){
     errorOutput= <p style= {{textAlign: "center" }}>Please Enter Valid City</p>;
   } else {
    errorOutput=null
   }

   let weatherOutput;
   if (this.state.city!==null){
    weatherOutput=(
      <div className="weather-output">
        <h2>{(this.state.city)}, {this.state.country} </h2> 
        <h2 className="description">{(this.state.description)} </h2>
        <img className="weather-icon" src={`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt=""/> 
        <h2>{(this.state.temperature)} <span >&#8457;</span></h2>
      </div>
    )
   } else {
     weatherOutput = null
   }

   return(
    <div className="weather-app">
      <h1 className="app-title">Weather App</h1>
      <div className="weather-box">
        <CityInput parentCallBack={this.callbackFunction} /> 
        {errorOutput}
        {weatherOutput}
      </div>
    </div>


   )
 }
}

export default App;
