export const FetchWeatherByCityName = async(cityname:string,Key:string):Promise<any>=>{
    return await fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${cityname}&cnt=7&units=metric&appid=${Key}`).then(res=>res.json())
}