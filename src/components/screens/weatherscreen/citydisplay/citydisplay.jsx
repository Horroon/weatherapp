import React, { memo } from 'react';
import styles from './style.module.scss';

export const CityDisplay = memo(()=>{
    return <div className={styles.CityDisplayContainer}>
        <div className={styles.city}>
            <h3>Islamabad,PK</h3>
        </div>
        <div className={styles.day}>
            <h5>
                Saturday
            </h5>
        </div>
        <div className={styles.weathercondition}>
            <h6>Rain</h6>
        </div>
    </div>
})