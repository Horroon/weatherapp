import React, { memo } from 'react';
import styles from './style.module.scss';

export const SelectedDay = memo(({})=>{
    return <div className={styles.SelectedDayMainContainer}>
                <div className={styles.dayicontempContainer}>
                    <div className={styles.dayicon}>
                            dayicon
                    </div>
                    <div className={styles.temprature}>
                        <h3>23</h3>
                        <span>
                            C | F
                        </span>
                    </div>
                </div>
                <div className={styles.dayweatherDetail}>
                    <ul className={styles.daydetailul}>
                        <li>Pressure: 344 hpa</li>
                        <li>Humidity: 34%</li>
                        <li>Wind: 34 m/s</li>
                    </ul>
                </div>
            </div>
})