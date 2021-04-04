import React, { memo } from 'react';
import styles from './style.module.scss';
import {SingleComponent} from './singlecomponent';

export const AllDays = memo(({allDaysWeather,events})=>{
    debugger
    return allDaysWeather.length ? <div className={styles.AlldaysContainer}>
        {
            allDaysWeather.map(date=><SingleComponent {...{date,events}}/>)
        }
    </div> : null
})