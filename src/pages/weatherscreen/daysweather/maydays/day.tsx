import React,{memo} from 'react';
import {URLS} from '../../../../constants/properties';
import styles from './style.module.scss';
import {singledaycomponenttype} from './types';

export const SingleDay:React.FC<singledaycomponenttype> = memo(({date, events:{selectDay}})=>{
    const {day,dayicon,temp, min_temp,max_temp} = date
    return <div className={styles.singledaycomponent}>
                <button className={styles.singledaycomponentbutton} onClick={()=>selectDay(date)}>
                        <div className={styles.day}>
                            {day}
                        </div>
                        <div className={styles.dayicon}>
                            <img src={`${URLS.dayIconUrl}${dayicon}.png`} />
                        </div>
                        <div className={styles.tem}>
                            {max_temp}°, {min_temp}°
                        </div>
                </button>
             </div>
})