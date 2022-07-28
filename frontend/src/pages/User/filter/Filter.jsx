

import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EmptyView } from '../../../components/users/common/emptyView/EmptyView'
import FilterPanel from '../../../components/users/filterPanel/FilterPanel'
import List from '../../../components/users/list/List'
import SearchBar from '../../../components/users/searchBar/SearchBar'
import { dataList } from '../../../constants'
import './filter.scss'
import { filter, filterData } from '../../../features/user/details/userSlice'



const Filter = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedRating, setSelectedRating] = useState(null)
  const [selectedPrice, setSelectedPrice] = useState([1000,100000])
  const [inputSearch, setInputSearch] = useState('')
  const [resultFound, setResultFound] = useState(false)
  // const [list, setList] = useState(dataList)
  
  
  const [place, setPlace] = useState([
    { id: 1, checked: false, label: 'kerala' },
    { id: 2, checked: false, label: 'Tamilnadu' },
    { id: 3, checked: false, label: 'banglure' },
  ]);

  //.....................................
  const dispatch = useDispatch()

  const data= useSelector(filterData)

  console.log("myre...........",data);

    useEffect(() => {
      
    dispatch(filter())
    console.log("im calll");

}, [dispatch])
//......................................

const [list, setList] = useState( data ? data : [] )



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

  const applyFilter = () => {
    let updatedList =data ? data : [];


    //Rating filter
    if(selectedRating){
      updatedList=updatedList.filter(
        (item) => parseInt(item.rating)===parseInt(selectedRating)
        )
    }

    //categoryfilter

    if(selectedCategory){
      updatedList=updatedList.filter(
        item => item.category === selectedCategory
        )
    }

    //place filter
//[kerala,chennai]
    const plceChecked =place.filter(
      (item) => item.checked)
      .map((item) => item.label.toLowerCase())

      if(plceChecked.length){
        updatedList=updatedList.filter(
          item => plceChecked.includes(item.state)
          )
      }

      //pricefilter

      const minPrice=selectedPrice[0]
      const maxPrice=selectedPrice[1]

      updatedList = updatedList.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      )

      //search
      if(inputSearch){
        updatedList = updatedList.filter(
          (item) =>
    
           item.name.toLowerCase().search(inputSearch.toLowerCase().trim()) !== 
           -1
          )
        
      }

    setList(updatedList)


    !updatedList.length ? setResultFound(false) : setResultFound(true)
  }

  useEffect(()=> {
    applyFilter()
  },[place,selectedPrice,inputSearch])


  return (
    <div className='home_panel'>
      {/* search bar */}
      <SearchBar value={inputSearch} changeInput={e=>setInputSearch(e.target.value)} /> 
      <div className="home_panelList-wrap">
        <div className="home_panel-wrap">
          {/* Side panel */}
          <FilterPanel
            // selectToggle={handleSelectCategory}
            // selectedCategory={selectedCategory}
            // selectRating={handleSelectRating}
            // selectedRating={selectedRating}
            place={place}
            changeChecked={handleChangeChecked}
            selectedPrice={selectedPrice}
            changedPrice={handleSelectPrice}
           
             />
        </div>
        <div className="home_list-wrap">
          {/* List & Empty */}
         {setResultFound ?  <List list={list} /> : <EmptyView/> }
        </div>
      </div>
    </div>
  )
}

export default Filter