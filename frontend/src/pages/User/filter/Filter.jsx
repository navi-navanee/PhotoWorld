import React, { useState } from 'react'
import FilterPanel from '../../../components/users/filterPanel/FilterPanel'
import List from '../../../components/users/list/List'
import SearchBar from '../../../components/users/searchBar/SearchBar'
import './filter.scss'


const Filter = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedRating, setSelectedRating] = useState(null)
  const [selectedPrice, setSelectedPrice] = useState([1000,100000])
  
  const [place, setPlace] = useState([
    { id: 1, checked: false, label: 'Kerala' },
    { id: 2, checked: false, label: 'chennai' },
    { id: 3, checked: false, label: 'banglure' },
  ]);


  const handleSelectCategory= (event,value) =>
  !value ? null : setSelectedCategory(value);

  
  const handleSelectRating= (event,value) =>
  !value ? null : setSelectedRating(value);

  const handleChangeChecked=(id) => {
    const placeStateList=place;
    const changeCheckedPlace = placeStateList.map((item) =>
    item.id === id ? { ...item, checked: !item.checked } : item
  );
  setPlace(changeCheckedPlace);
  }


  const handleSelectPrice=(event,value) => setSelectedPrice(value)


  return (
    <div className='home_panel'>
      {/* search bar */}
      <SearchBar /> 
      <div className="home_panelList-wrap">
        <div className="home_panel-wrap">
          {/* Side panel */}
          <FilterPanel
            selectToggle={handleSelectCategory}
            selectedCategory={selectedCategory}
            selectRating={handleSelectRating}
            selectedRating={selectedRating}
            place={place}
            changeChecked={handleChangeChecked}
            selectedPrice={selectedPrice}
            changedPrice={handleSelectPrice}
           
             />
        </div>
        <div className="home_list-wrap">
          {/* List & Empty */}
          <List />
        </div>
      </div>
    </div>
  )
}

export default Filter