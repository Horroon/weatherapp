import React, { memo } from 'react';
import {SelectedDayComponent} from './citydisplay/selectedDay/index'
import { AllDays } from './daysweather/maydays/index';

export const WeatherScreen = memo(({citydisplay, selectedDay, allDaysWeather,events})=>{
    return <div>
                <SelectedDayComponent {...{selectedDay, events}}  />
                <AllDays {...{allDaysWeather, events}}/>
            </div>
})