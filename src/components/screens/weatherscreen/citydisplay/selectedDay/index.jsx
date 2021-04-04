import React, { memo } from 'react';
import {SelectedDay} from './selectedday';
import {CityDisplay} from './citydisplay';

export const SelectedDayComponent = memo(({selectedDay,events})=>
    <>
            <CityDisplay {...selectedDay.citydisplay} />
            <SelectedDay {...{...selectedDay,events}}  />
    </>
)