import { memo } from 'react';
import {citydisplay} from '../../../../constants/types';
import styles from './style.module.scss';

export const CityDisplay:React.FC<citydisplay> = memo(({city,day,weathercondition})=>
    <div className={styles.CityDisplayContainer}>
            <div className={styles.city}>
                <h3>{city}</h3>
            </div>
            <div className={styles.day}>
                <h5>
                    {day}
                </h5>
            </div>
            <div className={styles.weathercondition}>
                <h6>{weathercondition}</h6>
            </div>
    </div>
)