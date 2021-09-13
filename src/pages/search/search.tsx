import styles from './style.module.scss';
import {SearchTypes} from './types';

export const Search:React.FC<SearchTypes> =({classNames, options, uservalue,placeholder,events:{selectSearchOption,onSearchChange,fetchWeather}})=>
    <div className={styles.searchContainer}>
            <div className={classNames}>
                <select className={styles.select} onChange={(event)=>selectSearchOption(event)}>
                    {
                        options.map((option,i)=><option id={`search-option-${i}`} value={option.name}>{option.label}</option>)
                    }
                </select>
                <input type="text" placeholder={placeholder} name="search" className={styles.searchInput} value={uservalue} onChange={onSearchChange} />
                <button type="submit" className={styles.searchButton} onClick={fetchWeather}><i className="fa fa-search"></i></button>
            </div>
    </div>