import React from 'react'
import GalleryCard from '../components/GalleryCard'
import gallery from '../gallery.jsx'
import '../styles/gallery.css'


function Gallery() {
  
  const galleryCard = gallery.map(element => {
    return (
      <GalleryCard
        key={element.id}
        image={element.image}
        number={element.number}
      />
    )
  })

  return (
    <div className='gallery--container'>
      {galleryCard}
    </div>
  )
  }

export default Gallery