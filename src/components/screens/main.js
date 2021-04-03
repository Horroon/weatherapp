import React from 'react';
import {Header} from './header/header';
import {Search} from './search/search';
import {WeatherScreen} from './weatherscreen/index';
import styles from './style.module.scss';

export const MainScreen = ()=>{
    return <div className={styles.mainContainer}>
        <Header />
        <div className={styles.mainBody}>
            <div className={styles.mainsearch}>
                <Search classNames="mainsearch" />
            </div>
            <div>
                <WeatherScreen />
            </div>
        </div>
    </div>
}