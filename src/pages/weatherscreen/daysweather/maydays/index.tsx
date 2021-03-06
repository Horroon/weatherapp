import React, { memo } from 'react';
import styles from './style.module.scss';
import {Alldaytype} from './types';
import {SingleDay} from './day';

export const AllDays:React.FC<Alldaytype> = memo(({allDaysWeather,events})=>allDaysWeather.length ? <div className={styles.AlldaysContainer}>
        {
            allDaysWeather.map(date=><SingleDay {...{date,events}}/>)
        }
    </div> : null)