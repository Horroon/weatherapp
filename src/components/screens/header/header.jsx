import React, { memo } from 'react';
import styles from './style.module.scss';

export const Header = memo(({})=>{
    return <nav className={styles.header}>
        <div  className={styles.titleparent}>
            <h5>Weather Forecast (5 Days)</h5>
        </div>
    </nav>
})