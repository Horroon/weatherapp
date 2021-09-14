export const FilterWeatherList = (list:any[])=>{
    debugger
    let uniqueDate = '';
    return list.filter((day:any)=>{
            const date = day.dt.split(' ')[0]
            if(uniqueDate !== date){
                uniqueDate = date;
                return true
            }else{
                return false
            }
        })
}