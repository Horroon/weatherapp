import React,{memo} from 'react';
import styles from './style.module.scss';

export const SingleComponent = memo(({date, events:{SelectDay}})=>{
    const {day,dayicon,temp} = date
    return <div className={styles.singledaycomponent}>
                <button className={styles.singledaycomponentbutton} onClick={()=>SelectDay(date)}>
                        <div className={styles.day}>
                            {day}
                        </div>
                        <div className={styles.dayicon}>
                            {dayicon}
                        </div>
                        <div className={styles.tem}>
                         {temp}
                        </div>
                </button>
             </div>
})