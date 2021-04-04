import React, { memo } from 'react';
import {SelectedDay} from './selectedday';
import {CityDisplay} from './citydisplay';

export const SelectedDayComponent = memo(({citydisplay,selectedDay})=>{
    debugger
    return<>
            <CityDisplay {...citydisplay} />
            <SelectedDay {...selectedDay}  />
    </>
})