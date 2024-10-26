import React, { useState, useRef } from 'react'
import ContactForm from '../components/ContactForm'

function Contact() {
  return (
    <>
        <div className='container--form'>
            <ContactForm />
            <div className='contactInfo'>
                <img src='../images/upclose-placenta.jpeg'alt='placenta and cord' className='contact--image'/>  
                <div className='contact--content' >          
                    <h4 id='questions'>Questions?</h4>
                    <p id='idai'>Idai Martinez</p>
                    <a href='tel:786-365-3291' className='contact--link'>786-365-3291</a>
                    <a href='mailto:placentasbyidai@gmail.com' className='contact--link'>placentasbyidai@gmail.com</a>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default Contact