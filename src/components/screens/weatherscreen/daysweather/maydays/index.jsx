import React, { memo } from 'react';
import styles from './style.module.scss';
import {SingleComponent} from './singlecomponent';

export const AllDays = memo(({allDaysWeather})=>{
    return allDaysWeather.length ? <div className={styles.AlldaysContainer}>
        {
            allDaysWeather.map(item=><SingleComponent {...item}/>)
        }
    </div> : null
})