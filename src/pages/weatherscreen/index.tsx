import React, { memo } from 'react';
import {SelectedDayComponent} from './citydisplay/selectedDay/index'
import { AllDays } from './daysweather/maydays/index';
import {weatherscreentype} from './types';

export const WeatherScreen:React.FC<weatherscreentype> = memo(({ error:{isError}, selectedDay, allDaysWeather,events})=>{
    return !isError && selectedDay.citydisplay.city? <div>
                        <SelectedDayComponent {...{selectedDay, events}}  />
                        <AllDays {...{allDaysWeather, events}}/>
                    </div> : null
})