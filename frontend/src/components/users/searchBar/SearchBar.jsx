import React from 'react'
import './searchBar.scss'
import SearchIcon from '@mui/icons-material/Search';


const SearchBar = ({value, changeInput}) => {
  return (
    <div className='searchBar-wrap'>
      <SearchIcon className='searchBar-icon'/>
      <input type="text"  placeholder='Photosearch' 
      value={value}
      onChange={changeInput}  
      />
    </div>
  )
}

export default SearchBar