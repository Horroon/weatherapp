import React, { memo } from 'react';
import styles from './style.module.scss';
import {SingleComponent} from './singlecomponent';

export const AllDays = memo(({})=>{
    return <div className={styles.AlldaysContainer}>
        {
            [1,2,3,4,5].map(item=><SingleComponent />)
        }
    </div>
})