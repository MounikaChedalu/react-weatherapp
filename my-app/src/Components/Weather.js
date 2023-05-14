import { useRef, useState} from 'react';
import axios from 'axios';
import './Weather.css';
import  sunny from '../asserts/sunnyimage.jpeg';
import  clouds from '../asserts/cloudy.jpeg';
import rain from '../asserts/rainyimage.jpeg';
import cold from '../asserts/coldimage.jpeg';

const Weather = () => {
    const [name, setName] = useState(" ");
     const [error, setError] = useState('');
     const inputRef = useRef();
    const [data,setData]=useState({
        celcius:30,
        name:'chennai',
        image:sunny
    });
    const handleClick = () =>{
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=cc9e4f95072d9afac4ce9a6a9426d5d8&units=metric`;
            axios.get(apiUrl)
            .then(res =>{
                let imagePath='data.image';
                if(res.data.weather[0].main === "clouds"){
                    imagePath=clouds;
                }
                else if(res.data.weather[0].main === "rain"){
                    imagePath=rain; 
                }
                else if(res.data.weather[0].main === "cold"){
                    imagePath=cold; 
                }
                else{ 
                    imagePath =sunny; 
                }
                let images = Math.round(res.data.main.temp);
                if(images>25){
                    imagePath=sunny;
                 }
                 else if(images>=20 && images<=25){
                    imagePath=clouds;
                 }
                 else if(images>=10 && images <=20){
                    imagePath = rain;
                 }
                 else{
                    imagePath= cold;
                 }
                
                console.log(res.data);
                setData({...data,celcius:res.data.main.temp,name:res.data.name,image:imagePath});
                inputRef.current.value = "";
            })

 .catch(err =>{
                if(err.response.status === 404) {
                setError(alert('enter location correctly'));
                } 
                console.log(err);
            })   
      
        }   
  };
   
  return (
    <div className = "total">
    <div className='container'>
        <h1 className='heading'>Weather App</h1>
        <div className='weather'>
            <div className='search'>
                <input type='text' className="textbox" placeholder='Enter City....' autoComplete="off" ref= {inputRef} onChange={(event) =>setName(event.target.value)} />
                <button className='button' onClick={handleClick}>Get</button>
            </div>
            <div className="error">
          <p>{error}</p>
        </div>

            <div className='winfo'>
                <img src = {data.image} alt ="sunnyimage" />
                <h2 className='value'>{Math.round(data.celcius)}&#176;C</h2>
                <h2 className='location'>{data.name}</h2>
                </div>

            </div>
        </div>
        </div>
  )
}

export default Weather;

