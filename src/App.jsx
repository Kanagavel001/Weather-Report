import './App.css'
import Weather from './Weather'
import { useEffect, useState } from 'react'

import sun from './assets/sun.png'
import moon from './assets/moon.png'
import day_cloud from './assets/suncloud.png'
import moon_cloud from './assets/mooncloud.png'
import cloud from './assets/cloud.png'
import day_rain from './assets/dayrain.png'
import day_heavy_rain from './assets/dayheavyrain.png'
import night_rain from './assets/nightrain.png'
import night_heavy_rain from './assets/nightheavyrain.png'
import day_snow from './assets/daysnow.png'
import night_snow from './assets/nightsnow.png'


function App() {

  let api_key="72a07c7854fe130c7e0e20dcae386255";

  const [text,setText]=useState("");
  const [image,setImage]=useState(sun);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("City");
  const [country,setCountry]=useState("country");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);

  const [cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,SetError]=useState(null);

  const weatherIconMap = {
    "01d":sun,
    "01n":moon,
    "02d":day_cloud,
    "02n":moon_cloud,
    "03d":cloud,
    "03n":moon_cloud,
    "04d":cloud,
    "04n":moon_cloud,
    "09d":day_rain,
    "09n":night_rain,
    "10d":day_rain,
    "10n":night_rain,
    "11d":day_heavy_rain,
    "11n":night_heavy_rain,
    "13d":day_snow,
    "13n":night_snow,
    "50d":day_snow,
    "50n":night_snow
  }

  const search = async () => {

    setLoading(true);

    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`
    
    try{
      let res = await fetch(url);
      let data = await res.json();
      if(data.cod==="404"){
        console.error("city not found")
        setCityNotFound(true);
        setLoading(true);
        return;
      }
      setLog(data.coord.lon)
      setLat(data.coord.lat)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setTemp(Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country)
      const weatherIcon = data.weather[0].icon;
      setImage(weatherIconMap[weatherIcon])
      setCityNotFound(false)

    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  }

  const handleCity =(e)=>{
    setText(e.target.value)
  }
  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      search();
    }
  }

  useEffect(function (){
    search();
  },[])

  return (
    <>
      <div className="container p-2 rounded-4" >

        <div className="header d-flex justify-content-center align-items-center p-1 m-1 ">
          <h1>Weather Report</h1>
        </div>
        <div className="input-container d-flex justify-content-center align-items-center p-1 my-3">
          <input 
            className='px-3 py-1'
            type="text"
            placeholder="Search City"
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <i className="bi bi-search px-2 py-1" onClick={()=>search()}></i>
        </div>

        {!loading && !cityNotFound && <Weather image={image} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />}

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}

      </div>
    </>
      
  )
}

export default App
