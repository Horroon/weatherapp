import React,{memo} from 'react';
import styles from './style.module.scss';

export const SingleComponent = memo(({day,dayicon,temp})=>{
    return <div className={styles.singledaycomponent}>
                <button className={styles.singledaycomponentbutton}>
                        <div className={styles.day}>
                            Saturday
                        </div>
                        <div className={styles.dayicon}>
                            dayicon
                        </div>
                        <div className={styles.tem}>
                        23 56
                        </div>
                </button>
             </div>
})