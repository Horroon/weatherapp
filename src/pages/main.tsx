import { useCallback, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Header} from '../components/header/header';
import {Search} from '../components/search/search';
import {WeatherScreen} from './weatherscreen/index';
import {
    CentiToFehrenheit,
    FehrenheitToCenti, 
    FilterWeatherList, 
    FetchWeatherByCityName, 
    FetchWeatherByZipCode, FormateDataToDisplayOnScreenInDays} from '../utilities/index';
import {Properties, WeekDays,Key} from '../constants/properties';
import {NotFoundImage} from './notfound/index';
import {
    changeScale as scaleAction,selectDay as dayAction,
    changeSearchInputValue, 
    changeSearchOption, 
    updateError, 
    updateAllDaysWeather, reset} from '../reducers/weatherForcast';
import {RootState} from '../store/store';
import styles from './style.module.scss';


export const MainScreen = ()=>{

    const State = useSelector((State:RootState)=>State.weatherForcast);
    const dispatch  = useDispatch();

    const changeScale =useCallback((id:any)=>{
        if(id===Properties.scales.C && State.selectedDay.selectedScale !== id){
            const prevFehrenheit = State.selectedDay.temp;
            const centigradeTemp = FehrenheitToCenti(prevFehrenheit);
            debugger
            dispatch(scaleAction({scale: id, temp: Math.trunc(centigradeTemp) }));
        }else if(id===Properties.scales.F && State.selectedDay.selectedScale !== id){
            const prevCentigrade = State.selectedDay.temp;
            const fehrenheitTemp = CentiToFehrenheit(prevCentigrade)
            debugger
            dispatch(scaleAction({scale: id, temp: Math.trunc(fehrenheitTemp)}));
        }
    },[State.selectedDay])

    const selectDay = useCallback((day:any)=>{
        if(day){
            const {selectedDay} = State;
            const newDay = {...selectedDay, citydisplay:{...selectedDay.citydisplay, day: day.day, weathercondition: day.weathercondition},  ...day};
            dispatch(dayAction(newDay));
        }
    },[State.selectedDay]);

    const selectSearchOption = useCallback((event:any)=>{
        event.preventDefault();
        const {target:{value}} = event;
        const payload = {
            placeholder:'Search by '+ value,
            selectedoption: value,
            uservalue:'',
        };
        dispatch(changeSearchOption(payload))
    },[]);

    const onSearchChange = useCallback((event:any)=>{
        event.preventDefault();
        const {target:{value}}=event;
        dispatch(changeSearchInputValue(value));
        State.error.isError && dispatch(updateError({isError: false, message:''}));
    },[])

    const fetchWeather = useCallback(async()=>{
        const {search:{selectedoption,uservalue}} = State;
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
                debugger
                const filteredArray = response.list //FilterWeatherList(response?.list || [])
                debugger
                const days = FormateDataToDisplayOnScreenInDays(filteredArray, response.city, Properties, WeekDays);
                dispatch(updateAllDaysWeather(days));
                State.error.isError && dispatch(updateError({isError: false, message:''}));
            }
        }
        catch(e){
           dispatch(reset())
           dispatch(updateError({message:"Not Found", isError: true}));
        }
    },[State.search]);
    // useEffect(()=>{
    //     fetch('https://api.tvmaze.com/search?q=osman',{mode:'cors'}).then(resp=>resp.json()).then(result=>{
    //         console.log('Result ', result);
    //     }).catch(e=>{
    //         console.log('Error ', e)
    //     })
    // },[])
    return <div className={styles.mainContainer}>
        <Header />
        <div className={styles.mainBody}>
            <div className={styles.mainsearch}>
                <Search 
                    classNames="mainsearch"
                    {...State.search}
                    events={{selectSearchOption,onSearchChange,fetchWeather}}
                />
            </div>
            <div className={styles.weatherscreen}>
                <WeatherScreen 
                    {...State}
                    events={{changeScale,selectDay} } 
                    />
                    
                <NotFoundImage {...State} />
            </div>
        </div>
    </div>
}