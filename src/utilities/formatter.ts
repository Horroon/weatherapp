export const FormateDataToDisplayOnScreenInDays = (
  RawWeatberData:any[],
  cityInWeatherResponse:any,
  Properties:any,
  WeekDays:string[]
) => {
  const formattedData = RawWeatberData.map((day) => {
    const dayForAllWeather = {
      day:'',
      dayicon: '',
      weathercondition:'',
      temp:0,
      min_temp:0,
      max_temp:0,
      selectedScale:'',
      dayDetail: {
        humidity: 0,
        pressure: 0,
        wind: 0,
      },
      citydisplay:{
        city:'',
        day: '',
        weathercondition:''
      }
    };

    const dayNumber = new Date(day.dt * 1000).getDay();
    dayForAllWeather.day = WeekDays[dayNumber];
    dayForAllWeather.dayicon = day.weather[0].icon;
    dayForAllWeather.weathercondition = day.weather[0].description;
    dayForAllWeather.temp = day.temp.day;
    dayForAllWeather.min_temp = day.temp.min;
    dayForAllWeather.max_temp = day.temp.max;
    dayForAllWeather.selectedScale = Properties.scales.C;
    dayForAllWeather.dayDetail.humidity = day.humidity;
    dayForAllWeather.dayDetail.pressure = day.pressure;
    dayForAllWeather.dayDetail.wind = day.speed;
    return dayForAllWeather;
  });

  const selectedDay = { ...formattedData[0] };

  selectedDay.citydisplay = {
    city: cityInWeatherResponse.name + ", " + cityInWeatherResponse.country,
    day: formattedData[0].day,
    weathercondition: formattedData[0].weathercondition,
  };
  return {updatedweathers: formattedData, selectedDay}
};
