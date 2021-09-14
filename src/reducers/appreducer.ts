import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {InitialStatetype, selectedDay,error} from '../constants/types';
import {Properties} from '../constants/properties';

const initialState:InitialStatetype = {
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

export const appReducer = createSlice({
  name: 'appreducer',
  initialState,
  reducers: {
    changeScale: (state, action:PayloadAction<{scale:string,temp:number}>) => ({...state, selectedDay:{...state.selectedDay, selectedScale: action.payload.scale, temp: action.payload.temp}}),
    selectDay: (state, action: PayloadAction<{selectedDay:selectedDay}>) =>  ({...state, selectedDay: {...state.selectedDay, ...action.payload}}),
    changeSearchOption: (state, action: PayloadAction<any>) => ({...state, search:{...state.search, ...action.payload}}),
    changeSearchInputValue: (state, action: PayloadAction<string>) => ({...state, search:{...state.search, uservalue: action.payload}}),
    updateAllDaysWeather: (state, action: PayloadAction<{updatedweathers:any[], selectedDay: selectedDay}>) => ({...state, allDaysWeather: action.payload.updatedweathers, selectedDay: action.payload.selectedDay }), 
    updateError: (state, action: PayloadAction<error>) => ({...state, error:action.payload})
  },
})

// Action creators are generated for each case reducer function
export const { changeScale, selectDay, changeSearchInputValue, changeSearchOption, updateAllDaysWeather, updateError } = appReducer.actions

export default appReducer.reducer