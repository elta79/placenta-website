import React, { useState, useRef } from 'react'
import ContactForm from '../components/ContactForm'

function Contact() {
  return (
    <>
      <section className='container--form'>
        <aside className='contact--info'>
          <img 
              src='../images/upclose-placenta.jpeg' 
              alt='Close-up image of a placenta and cord' 
              className='contact--image' 
          />
          <div className='contact--content'>
              <h2 id='questions'>Questions?</h2>
              <p id='idai'>Idai Martinez</p>
              <a href='tel:786-365-3291' className='contact--link' aria-label='Call Idai Martinez at 786-365-3291'>786-365-3291</a>
              <a href='mailto:placentasbyidai@gmail.com' className='contact--link' aria-label='Email Idai Martinez at placentasbyidai@gmail.com'>placentasbyidai@gmail.com</a>
          </div>
        </aside>        
        <ContactForm />        
      </section>
        
    </>
  )
}

export default Contact