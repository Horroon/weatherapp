import React, { memo } from 'react';
import styles from './style.module.scss';

export const SelectedDay = memo(({dayicon,temp, selectedScale, changeScale, dayDetail:{pressure,humidity,wind}})=>{
    return <div className={styles.SelectedDayMainContainer}>
                <div className={styles.dayicontempContainer}>
                    <div className={styles.dayicon}>
                            {dayicon}
                    </div>
                    <div className={styles.temprature}>
                        <h3>{temp}</h3>
                        <span>
                            <button className={`${selectedScale ==='C'&& 'selectedbtn'}`}>C</button> | <button className={`${selectedScale==='F' && 'selectedbtn'}`}>F</button>
                        </span>
                    </div>
                </div>
                <div className={styles.dayweatherDetail}>
                    <ul className={styles.daydetailul}>
                        <li>Pressure: {pressure} hpa</li>
                        <li>Humidity: {humidity}%</li>
                        <li>Wind: {wind} m/s</li>
                    </ul>
                </div>
            </div>
})