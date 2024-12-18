import React from 'react'
import services from '../services.jsx'
import '../styles/card.css'

function Card(props) {
  return (    
    <div className='card'>
      <img src={`../images/${props.image}`} className='card--image' alt={`placenta ${props.number}`}/>
      <div className='card--content'>                
        <h3 className='card--title'>{props.title}</h3>
        <p className='card--price'>{props.price}</p>
        <p>{props.description}</p>
      </div>
    </div>
    
  )
}

export default Card