import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './SeachBar.css';

function SearchBar() { 
  return (
    <div>
        <form className="barre form-inline my-2 my-lg-0">
            <input className="search form-control mr-sm-2" type="search" placeholder="Recherche" aria-label="Search"/>
            <button className="button my-2 my-sm-0" type="submit"><i className="bi bi-search"></i></button>
        </form>
    </div>
  )
}

export default SearchBar