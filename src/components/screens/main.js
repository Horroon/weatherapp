import React, { useReducer } from 'react';
import {Header} from './header/header';
import {Search} from './search/search';
import {WeatherScreen} from './weatherscreen/index';
import {ConvertCentiToFehrenheit, ConvertFehrenheitToCenti, FilterWeatherList} from '../utilities/index';
import {FormateDataToDisplayOnScreenInDays, FetchWeatherByCityName, FetchWeatherByZipCode} from '../logics/index';
import {Properties, WeekDays,Key} from '../constants/properties';
import {NotFoundImage} from './notfound/index';

import styles from './style.module.scss';

const MainScreenReducer = (state,action)=>{
    switch(action.type){
        case Properties.changeScale:
            return {...state, selectedDay:{...state.selectedDay, selectedScale: action.payload.scale, temp: action.payload.temp}};
        case Properties.selectDay:
            return {...state, selectedDay: {...state.selectedDay, ...action.payload}};
        case Properties.changeSearchOption:
            return {...state, search:{...state.search, ...action.payload}};
        case Properties.changeSearchInputValue:
            return {...state, search:{...state.search, uservalue: action.payload}};
        case Properties.updateAllDaysWeather:
            return {...state, allDaysWeather: action.payload.updatedweathers, selectedDay: action.payload.selectedDay };
        case Properties.updateError:
            return {...state, error:action.payload}
        default:
            return {...state};
    }
}

const InitialState = {
    error:{
        isError:false,
        message:'',
    },
    search:{
        options:[{name:Properties.searchOptions.bycity, label:"City Name"},{name: Properties.searchOptions.byzipcode, label:"Zip Code"},{name: Properties.searchOptions.bycityId, label:"City Id"}],
        placeholder:'Search by city name',
        selectedoption:Properties.searchOptions.bycity,
        uservalue:'',
    },
    selectedDay:{
        dayicon:'',
        temp:0,
        selectedScale:Properties.scales.C,
        dayDetail:{
            pressure: 0, 
            humidity: 0, 
            wind: 0
        },
        citydisplay:{
            city:"", 
            day: "", 
            weathercondition:""
        },
    },
    
    allDaysWeather:[]
}


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
            const {selectedDay} = state;
            selectedDay.citydisplay.day = day.day
            selectedDay.citydisplay.weathercondition = day.weathercondition
            selectedDay.dayDetail = day.dayDetail
            setState({type: Properties.selectDay, payload: {...selectedDay, ...day}});
        }
    }

    const SelectSearchOption = (event)=>{
        event.preventDefault();
        const {target:{value}} = event;
        setState({
            type: Properties.changeSearchOption,
            payload:{
                placeholder:'Search by '+ value,
                selectedoption: value,
                uservalue:'',
            }
        });
    };

    const OnSearchChange = event=>{
        event.preventDefault();
        const {target:{value}}=event;
        setState({type: Properties.changeSearchInputValue, payload: value});
        state.error.isError && setState({type: Properties.updateError, payload:{isError: false, message:''}})
    }

    const FetchWeather = async()=>{
        const {search:{selectedoption,uservalue}} = state;
        try{
            let response = ''
            if(selectedoption === Properties.searchOptions.bycity && uservalue){
                    response = await FetchWeatherByCityName({cityname:uservalue, Key})
            }
            else if(selectedoption === Properties.searchOptions.byzipcode && uservalue){
                    response = await FetchWeatherByZipCode({zipcode: uservalue, Key})
            }
            else if(selectedoption === Properties.searchOptions.bycityId && uservalue){
                alert('soon by cityid')
            }
            
            if(response){
                const filteredArray = FilterWeatherList(response.list)

                filteredArray.length > 5 && filteredArray.pop()
                
                setState({type: Properties.updateAllDaysWeather, payload: FormateDataToDisplayOnScreenInDays(filteredArray, response.city, Properties, WeekDays)})
            }
        }
        catch(e){
           setState({type: Properties.updateError, payload: {message:"Not Found", isError: true}})
        }
    };

    return <div className={styles.mainContainer}>
        <Header />
        <div className={styles.mainBody}>
            <div className={styles.mainsearch}>
                <Search 
                    classNames="mainsearch"
                    {...state.search}
                    events={{SelectSearchOption,OnSearchChange,FetchWeather}}
                />
            </div>
            <div className={styles.weatherscreen}>
                <WeatherScreen 
                    {...state}
                    events={{ChangeScale,SelectDay} } 
                    />
                    
                <NotFoundImage {...state} />
            </div>
        </div>
    </div>
}