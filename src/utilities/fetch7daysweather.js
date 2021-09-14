export const Fetch7DaysWeather = async({lon, lat,key})=>{
  return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&&appid=${key}`).then(res=>res.json())
}