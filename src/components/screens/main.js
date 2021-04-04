import React, { useReducer } from 'react';
import {Header} from './header/header';
import {Search} from './search/search';
import {WeatherScreen} from './weatherscreen/index';
import styles from './style.module.scss';

const Properties = {
    changeScale:"CHANGE_SCALE",
    scales:{
        C:"C",
        F:"F"
    },
    selectDay: "SELECT_DAY",

}
const MainScreenReducer = (state,action)=>{
    switch(action.type){
        case Properties.changeScale:
            return {...state, selectedDay:{...state.selectedDay, selectedScale: action.payload.scale, temp: action.payload.temp}};
        case Properties.selectDay:
            return {...state, selectedDay: {...state.selectedDay, ...action.payload}}
    }
}

const InitialState = {
    selectedDay:{
        dayicon:'dayicon',
        temp:24,
        selectedScale:Properties.scales.C,
        dayDetail:{
            pressure: 20, 
            humidity: 10, 
            wind: 100
        },
        citydisplay:{
            city:"Islamabd, PK", 
            day: "Sunday", 
            weathercondition:"Rain"
        },
    },
    
    allDaysWeather:[
        {   
            day:"Monday",
            dayicon:'monday_icon',
            weathercondition:'rain',
            temp:100,
            selectedScale:'C',
            dayDetail:{
                pressure: 10, 
                humidity: 10, 
                wind: 10
            },
        },
        {   
            day:"Tuesday",
            dayicon:'tuesday_icon',
            weathercondition: 'cloudy',
            temp:200,
            selectedScale:'C',
            dayDetail:{
                pressure: 11, 
                humidity: 11, 
                wind: 11
            },
        },
        {   
            day:"Wednessday",
            dayicon:'wedness_icon',
            weathercondition: 'sunny',
            temp:300,
            selectedScale:'C',
            dayDetail:{
                pressure: 12, 
                humidity: 12, 
                wind: 12
            },
        },
        {   
            day:"Thursday",
            dayicon:'thurday_icon',
            weathercondition: 'partial cloudy',
            temp:400,
            selectedScale:'C',
            dayDetail:{
                pressure: 13, 
                humidity: 13, 
                wind: 13
            },
        },
    ]
}

const ConvertFehrenheitToCenti = (fehrenheitTemp)=> ((fehrenheitTemp - 32)* 5/9);

const ConvertCentiToFehrenheit = (preCentigrade)=>((preCentigrade * 9/5) + 32);

export const MainScreen = ()=>{
    const [state, setState] = useReducer(MainScreenReducer, InitialState);

    const ChangeScale = (id)=>{
        if(id===Properties.scales.C && state.selectedDay.selectedScale !== id){
            const prevFehrenheit = parseInt(state.selectedDay.temp)
            const centigradeTemp = ConvertFehrenheitToCenti(prevFehrenheit);
            setState({type: Properties.changeScale, payload:{scale: id, temp: Math.trunc(centigradeTemp) } })
        }else if(id===Properties.scales.F && state.selectedDay.selectedScale !== id){
            const prevCentigrade = parseInt(state.selectedDay.temp)
            const fehrenheitTemp = ConvertCentiToFehrenheit(prevCentigrade)
            setState({type: Properties.changeScale, payload:{scale: id, temp: Math.trunc(fehrenheitTemp)} })
        }
    }
    const SelectDay = (day)=>{
        if(day){
            const {selectedDay,dayDetail} = state;
            selectedDay.citydisplay.day = day.day
            selectedDay.citydisplay.weathercondition = day.weathercondition
            selectedDay.dayDetail = day.dayDetail
            setState({type: Properties.selectDay, payload: {...selectedDay, ...day}});
        }
    }
console.log('state ', state)
    return <div className={styles.mainContainer}>
        <Header />
        <div className={styles.mainBody}>
            <div className={styles.mainsearch}>
                <Search classNames="mainsearch" />
            </div>
            <div>
                <WeatherScreen 
                    {...state}
                    events={{ChangeScale,SelectDay}}
                />
            </div>
        </div>
    </div>
}