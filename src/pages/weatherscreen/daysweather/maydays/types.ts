type date = {
  day:string,
  dayicon:string,
  temp:number, 
  min_temp:number,
  max_temp:number
}

export type singledaycomponenttype = {
  date:date, events:{selectDay:(arg:any)=>void}
}

export type Alldaytype = {
  events:any,
  allDaysWeather:any[]
}