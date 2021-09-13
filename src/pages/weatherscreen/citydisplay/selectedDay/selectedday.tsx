import React, { memo } from 'react';
import {Properties,URLS} from '../../../../constants/properties';
import {selectedday} from './types';
import styles from './style.module.scss';

export const SelectedDay:React.FC<selectedday> = memo(({selectedDay:{dayicon,temp, selectedScale, dayDetail:{pressure,humidity,wind}}, events:{changeScale}})=>
        <div className={styles.SelectedDayMainContainer}>
                        <div className={styles.dayicontempContainer}>
                            <div className={styles.dayicon}>
                                    <img src={`${URLS.dayIconUrl}${dayicon}.png`} />
                            </div>
                            <div className={styles.temprature}>
                                <h3>{Math.trunc(temp)}°</h3>
                                <span>
                                    <button className={`${selectedScale ===Properties.scales.C && 'selectedbtn'}`} onClick={()=>changeScale(Properties.scales.C)}>C</button> | <button className={`${selectedScale===Properties.scales.F && 'selectedbtn'}`} onClick={()=>changeScale(Properties.scales.F)}>F</button>
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
)