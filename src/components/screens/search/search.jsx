import React, { memo } from 'react';
import styles from './style.module.scss';

export const Search =memo(({classNames})=>{
    return <div className={styles.searchContainer}>
        <div className={classNames}>
            <select className={styles.select}>
                <option>Search By</option>
                <option>Country</option>
                <option>City</option>
                <option>Zipcode</option>
            </select>
            <input type="text" placeholder="Search.." name="search" className={styles.searchInput}/>
            <button type="submit" className={styles.searchButton}><i class="fa fa-search"></i></button>
        </div>
    </div>
});