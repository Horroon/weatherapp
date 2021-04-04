export const FetchWeatherByCityName = async({cityname,Key})=>{
    return await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&units=metric&appid=${Key}`).then(res=>res.json())
}