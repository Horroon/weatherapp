export type citydisplay = {
  city:string, 
  day: string, 
  weathercondition:string
}

export type selectedDay = {
  dayicon:string,
  temp:number,
  selectedScale:string,
  dayDetail:{
      pressure: number, 
      humidity: number, 
      wind: number
  },
  citydisplay:citydisplay,
}

export type InitialStatetype = {
  error:{
      isError:boolean,
      message:string,
  },
  search:{
      options:[{name:string, label:string},{name: string, label:string},{name: string, label:string}],
      placeholder:string,
      selectedoption:string,
      uservalue:string,
  },
  selectedDay:selectedDay,
  
  allDaysWeather:any[]
}