export const FetchWeatherByZipCode = async({zipcode,Key})=>{
    return await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${zipcode}&units=metric&appid=${Key}`).then(res=>res.json())
}