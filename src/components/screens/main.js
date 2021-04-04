import React, { useReducer } from 'react';
import {Header} from './header/header';
import {Search} from './search/search';
import {WeatherScreen} from './weatherscreen/index';
import styles from './style.module.scss';

const Properties = {
    changeScale:"CHANGE_SCALE"

}
const MainScreenReducer = (state,action)=>{
    switch(action.type){
        case Properties.changeScale:
            return {...state, selectedDay:{...state.selectedDay, selectedScale: action.payload.scale, temp: action.payload.temp}}
    }
}

const InitialState = {
    selectedDay:{
        dayicon:'dayicon',
        temp:'24',
        selectedScale:'C',
        dayDetail:{
            pressure: 20, 
            humidity: 10, 
            wind: 100
        }
    },
    citydisplay:{
        city:"Islamabd, PK", 
        day: "Sunday", 
        weathercondition:"Rain"
    },
    allDaysWeather:[
        {
            day:"Sunday",dayicon:"23423dd",temp:'20'
        },
        {
            day:"Monday",dayicon:"23423dd",temp:'20'
        },
        {
            day:"Tuesday",dayicon:"23423dd",temp:'20'
        },
        {
            day:"Wednessday",dayicon:"23423dd",temp:'20'
        },
        {
            day:"Thursday",dayicon:"23423dd",temp:'20'
        }
    ]
}

export const MainScreen = ()=>{
    const [state, setState] = useReducer(MainScreen, InitialState);

    const ChangeScale = ()=>{

    }

    return <div className={styles.mainContainer}>
        <Header />
        <div className={styles.mainBody}>
            <div className={styles.mainsearch}>
                <Search classNames="mainsearch" />
            </div>
            <div>
                <WeatherScreen 
                    {...state}
                />
            </div>
        </div>
    </div>
}