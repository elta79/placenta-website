import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/footer.css'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className='footer'>        
        <div className='footer--links'>                
            <Link to='/' className='footer--link'>Home</Link>
            <h4 id='footer--bar'>|</h4>
            <Link to='/contact' className='footer--link'>Contact</Link>            
        </div>    
        <p>Copyright © {year} Placentas By Idai</p>  
    </div>
  )
}

export default Footer