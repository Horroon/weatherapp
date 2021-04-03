import React, { memo } from 'react';
import { CityDisplay } from './citydisplay/citydisplay';
import { SelectedDay } from './daysweather/selectedDay/selectedday';
import { AllDays } from './daysweather/maydays/index';

export const WeatherScreen = memo(()=>{
    return <div>
                <CityDisplay />
                <SelectedDay />
                <AllDays />
            </div>
})