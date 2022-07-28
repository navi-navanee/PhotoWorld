
import React from 'react'
import ListItem from './ListItem/ListItem'
import './list.scss'

const List = ({list}) => {

  console.log("im total.......",list);

  return (
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2rem"}} className='list-wrapppp'>
      
      {list.map(item => <ListItem key={item._id} item={item} />)}
    
      </div>
  )
  }
export default List