export const FormateDataToDisplayOnScreenInDays = (
  RawWeatberData,
  cityInWeatherResponse,
  Properties,
  WeekDays
) => {
  const formattedData = RawWeatberData.map((day) => {
    const dayForAllWeather = {
      dayDetail: {
        humidity: "",
        pressure: "",
        wind: "",
      },
    };
    const dayNumber = new Date(day.dt_txt).getDay();
    dayForAllWeather.day = WeekDays[dayNumber];
    dayForAllWeather.dayicon = day.weather[0].icon;
    dayForAllWeather.weathercondition = day.weather[0].description;
    dayForAllWeather.temp = day.main.temp;
    dayForAllWeather.min_temp = day.main.temp_min;
    dayForAllWeather.max_temp = day.main.temp_max;
    dayForAllWeather.selectedScale = Properties.scales.C;
    dayForAllWeather.dayDetail.humidity = day.main.humidity;
    dayForAllWeather.dayDetail.pressure = day.main.pressure;
    dayForAllWeather.dayDetail.wind = day.wind.speed;
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
