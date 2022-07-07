import React from 'react'
import FilterPanel from '../../../components/users/filterPanel/FilterPanel'
import  List  from '../../../components/users/list/List'
import SearchBar from '../../../components/users/searchBar/SearchBar'
import './filter.scss'


const Filter = () => {
  return (
    <div className='home_panel'>
     {/* search bar */}
     <SearchBar/>
     <div className="home_panelList-wrap">
      <div className="home_panel-wrap">
     {/* Side panel */}
     <FilterPanel/>
      </div>
      <div className="home_list-wrap">
     {/* List & Empty */}
     <List/>
      </div>
     </div>
    </div>
  )
}

export default Filter