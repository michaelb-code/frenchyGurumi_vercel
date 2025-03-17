import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './SearchBar.module.css';

function SearchBar() { 
  return (
    <div>
        <form className={style.barre}>
            <input className={style.search} type="search" placeholder="Recherche" aria-label="Search"/>
            <button className={style.button} type="submit"><i className="bi bi-search"></i></button>
        </form>
    </div>
  )
}

export default SearchBar