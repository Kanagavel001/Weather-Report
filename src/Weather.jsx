import React from 'react'
import humidityImg from './assets/humidity.png'
import windImg from './assets/wind.png'

const Weather = (props) => {
  return (
    <div className='weather-details m-2'>

        <div className="d-flex justify-content-center">
            <img className="image my-1" src={props.image} alt="image" />
        </div>

        <div className="temperature d-flex flex-column align-items-center m-2">
            <div className="temp ">{props.temp}°C</div>
            <div className="city my-1">{props.city}</div>
            <div className="country my-1">{props.country}</div>
        </div>

        <div className="location d-flex justify-content-center gap-5">
            <div className="lat d-flex flex-column align-items-center">
                <span>Latitude</span>
                <h5 className='my-1'>{props.lat}</h5>
            </div>

            <div className="log d-flex flex-column align-items-center">
                <span>Longitude</span>
                <h5 className='my-1'>{props.log}</h5>
            </div>
        </div>

        <div className="hum-wind d-flex justify-content-between mx-4 my-2">

            <div className="humidity d-flex flex-column  align-items-center">
                <img src={humidityImg} alt="" className="humimg my-2" />
                <span>{props.humidity}%</span>
                <h6>Humidity</h6>
            </div>

            <div className="humidity d-flex flex-column  align-items-center">
                <img src={windImg} alt="" className="windimg my-2" />
                <span>{props.wind}km/h</span>
                <h6>Wind Speed</h6>
            </div>
        </div>
        
    </div>
  )
}

export default Weather