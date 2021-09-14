
type events = {
  selectSearchOption:(arg:any)=>void,
  onSearchChange:(arg:any)=>void,
  fetchWeather: (arg:any)=>void
}
export type SearchTypes = {
  classNames:string, 
  options: {name:string, label: string}[], 
  uservalue:string,
  placeholder:string,
  events:events
}
