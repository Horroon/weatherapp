export const FetchWeatherByCityName = async({cityname,Key})=>{
    return await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&cnt=80&units=metric&appid=${Key}`).then(res=>res.json())
}
//http://api.openweathermap.org/data/2.5/forecast?q=rawalpindi&cnt=16&units=metric&appid=c73aa228bfba692462f96e89080aa39a
//http://api.openweathermap.org/data/2.5/forecast/daily?q=rawalpindi&cnt=16&appid=c9d49310f8023ee2617a7634de23c2aa