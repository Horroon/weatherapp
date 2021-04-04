export const FilterWeatherList = (list)=>{
    let uniqueDate = '';
    return list.filter(day=>{
            const date = day.dt_txt.split(' ')[0]
            if(uniqueDate !== date){
                uniqueDate = date;
                return true
            }else{
                return false
            }
        })
}