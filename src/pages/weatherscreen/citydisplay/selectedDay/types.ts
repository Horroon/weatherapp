import {selectedDay} from '../../../../constants/types';
export type selectedday = {
  selectedDay: selectedDay
  events:{changeScale:(arg:any)=>void}
}

export type selecteddaycomponent = {
  selectedDay: selectedDay,
  events: any
}