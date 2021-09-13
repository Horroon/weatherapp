import React, { memo } from 'react';
import {SelectedDay} from './selectedday';
import {CityDisplay} from './citydisplay';
import {selecteddaycomponent} from './types';

export const SelectedDayComponent:React.FC<selecteddaycomponent> = memo(({selectedDay,events})=>
    <>
            <CityDisplay {...selectedDay.citydisplay} />
            <SelectedDay {...{selectedDay,events}}  />
    </>
)