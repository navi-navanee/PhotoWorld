import React from 'react'
import { categoryList, ratingList } from '../../../constants/index'
import CheckboxProton from '../common/checkbox/Checkbox'
import FilterListToggle from '../common/filterListToggle/FilterListToggle'
import SliderProton from '../common/slider/Slider'
import './FilterPanel.scss'

const FilterPanel = ({
    selectedCategory,
    selectToggle,
    selectedRating,
    selectRating,
    place,
    changeChecked,
    selectedPrice,
    changedPrice

}) => {
  return (
    <div>
        {/* category */}
        <div className="input-group">
            <p className="label">Category</p>
            <FilterListToggle 
            options={categoryList} 
            value={selectedCategory} 
            selectToggle={selectToggle} 
            />
        </div>
        {/* place */}
        <div className="input-group">
        <p className="label">Place</p>  
        {place.map((place)=>(
        <CheckboxProton 
        key={place.id} 
        place={place}
         changeChecked={changeChecked}
         />
        ))}
        </div>
        {/* price Range */}
        <div className="input-group">
        <p className="label-range">Price</p>  
         <SliderProton
         value={selectedPrice}
         changedPrice ={changedPrice}
         />
          </div>
        {/* star Rating */}
        <div className="input-group">
        <p className="label">Star rating</p>
        <FilterListToggle 
            options={ratingList} 
            value={selectedRating} 
            selectToggle={selectRating} 
            />
        </div>
        
    </div>
  )
}

export default FilterPanel