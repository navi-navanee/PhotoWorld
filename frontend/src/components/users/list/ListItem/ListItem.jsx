import React from 'react'
import './listItem.scss'

const ListItem = ({item:{coverSrc,title,price,rating}}) => {
  return (
    <div className="listItem-wrap">
        <img src={coverSrc} alt="item" />
        <header>
            <h4>{title}</h4>
            <span>🌟{rating}</span>
        </header>
        <footer>
            <p><b>{price}</b></p>
        </footer>
    </div>
  )
}

export default ListItem