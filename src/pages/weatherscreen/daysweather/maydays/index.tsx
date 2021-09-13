import React, { memo } from 'react';
import styles from './style.module.scss';
import {Alldaytype} from './types';
import {SingleComponent} from './singlecomponent';

export const AllDays:React.FC<Alldaytype> = memo(({allDaysWeather,events})=>allDaysWeather.length ? <div className={styles.AlldaysContainer}>
        {
            allDaysWeather.map(date=><SingleComponent {...{date,events}}/>)
        }
    </div> : null)