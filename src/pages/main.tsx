import React, { useReducer } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Header} from './header/header';
import {Search} from './search/search';
import {WeatherScreen} from './weatherscreen/index';
import {ConvertCentiToFehrenheit, ConvertFehrenheitToCenti, FilterWeatherList} from '../utilities/index';
import {FormateDataToDisplayOnScreenInDays, FetchWeatherByCityName, FetchWeatherByZipCode} from '../asyncs/index';
import {Properties, WeekDays,Key} from '../constants/properties';
import {NotFoundImage} from './notfound/index';
import {InitialStatetype} from '../constants/types';
import {changeScale as scaleAction,selectDay as dayAction,changeSearchInputValue, changeSearchOption, updateError, updateAllDaysWeather} from '../reducers/appreducer'
import {RootState} from '../store/store'
import styles from './style.module.scss';

const MainScreenReducer = (state:InitialStatetype,action:any)=>{
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

const InitialState:InitialStatetype = {
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
    const State = useSelector((state:RootState)=>state.appReducer);
    const dispatch  = useDispatch();

    const changeScale = (id:any)=>{
        if(id===Properties.scales.C && state.selectedDay.selectedScale !== id){
            const prevFehrenheit = parseInt(state.selectedDay.temp)
            const centigradeTemp = ConvertFehrenheitToCenti(prevFehrenheit);
            dispatch(scaleAction({scale: id, temp: Math.trunc(centigradeTemp) }));
            setState({type: Properties.changeScale, payload:{scale: id, temp: Math.trunc(centigradeTemp) } })
        }else if(id===Properties.scales.F && state.selectedDay.selectedScale !== id){
            const prevCentigrade = parseInt(state.selectedDay.temp)
            const fehrenheitTemp = ConvertCentiToFehrenheit(prevCentigrade)
            dispatch(scaleAction({scale: id, temp: Math.trunc(fehrenheitTemp)}));
            setState({type: Properties.changeScale, payload:{scale: id, temp: Math.trunc(fehrenheitTemp)} })
        }
    }

    const selectDay = (day:any)=>{
        if(day){
            const {selectedDay} = state;
            const newDay = {...selectedDay, ...day};
            // selectedDay.citydisplay.day = day.day
            // selectedDay.citydisplay.weathercondition = day.weathercondition
            // selectedDay.dayDetail = day.dayDetail
            dispatch(dayAction(newDay));
            setState({type: Properties.selectDay, payload: {...newDay}});
        }
    }

    const selectSearchOption = (event:any)=>{
        event.preventDefault();
        const {target:{value}} = event;
        const payload = {
            placeholder:'Search by '+ value,
            selectedoption: value,
            uservalue:'',
        };
        dispatch(changeSearchOption(payload))
        setState({
            type: Properties.changeSearchOption,
            payload
        });
    };

    const onSearchChange = (event:any)=>{
        event.preventDefault();
        const {target:{value}}=event;
        dispatch(changeSearchInputValue(value));
        setState({type: Properties.changeSearchInputValue, payload: value});
        state.error.isError && setState({type: Properties.updateError,payload:{isError: false, message:''}});
        state.error.isError && updateError({isError: false, message:''});
    }

    const fetchWeather = async()=>{
        const {search:{selectedoption,uservalue}} = state;
        try{
            let response = null;
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
                const filteredArray = FilterWeatherList(response?.list || [])

                filteredArray.length > 5 && filteredArray.pop()
                const days = FormateDataToDisplayOnScreenInDays(filteredArray, response.city, Properties, WeekDays);
                dispatch(updateAllDaysWeather(days));
                setState({type: Properties.updateAllDaysWeather, payload: days})
            }
        }
        catch(e){
           dispatch(updateError({message:"Not Found", isError: true}))
           setState({type: Properties.updateError, payload: {message:"Not Found", isError: true}})
        }
    };
    console.log('state ', state, 'redux State ', State)
    return <div className={styles.mainContainer}>
        <Header />
        <div className={styles.mainBody}>
            <div className={styles.mainsearch}>
                <Search 
                    classNames="mainsearch"
                    {...state.search}
                    events={{selectSearchOption,onSearchChange,fetchWeather}}
                />
            </div>
            <div className={styles.weatherscreen}>
                <WeatherScreen 
                    {...state}
                    events={{changeScale,selectDay} } 
                    />
                    
                <NotFoundImage {...state} />
            </div>
        </div>
    </div>
}