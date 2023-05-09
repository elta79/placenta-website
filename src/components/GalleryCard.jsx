import React from 'react'
import gallery from '../gallery.jsx'
import '../styles/gallery.css'

function GalleryCard(props) {
  return (
    <div className='gallery--card stacked'>
        <img src={`../images/${props.image}`} className='gallery--image'  />
        <h3 className='gallery--number'>{props.number} </h3>
        
    </div>
  )
}

export default GalleryCard