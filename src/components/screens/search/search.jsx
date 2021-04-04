import React, { memo } from 'react';
import styles from './style.module.scss';

export const Search =memo(({classNames, options, uservalue,placeholder,events:{SelectSearchOption,OnSearchChange,FetchWeather}})=>{
    debugger
    return <div className={styles.searchContainer}>
        <div className={classNames}>
            <select className={styles.select} onChange={(event)=>SelectSearchOption(event)}>
                {
                    options.map((option,i)=><option id={`search-option-${i}`} value={option.name}>{option.label}</option>)
                }
            </select>
            <input type="text" placeholder={placeholder} name="search" className={styles.searchInput} value={uservalue} onChange={OnSearchChange} />
            <button type="submit" className={styles.searchButton} onClick={FetchWeather}><i class="fa fa-search"></i></button>
        </div>
    </div>
});