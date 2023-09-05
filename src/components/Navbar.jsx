import React, { useEffect, useState }from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'


function Navbar() {
    
    const [expandNavbar, setExpandNavbar] = useState(false)

    const location = useLocation()

    useEffect(() => {
        setExpandNavbar(false)
    }, [location])

  return (          
        <div className='navbar' id={expandNavbar ? 'open' : 'closed'}>            
            <Link to='/' target='_blank' className='title--navbar'>
                <h3 >Placentas by Idai</h3>                    
            </Link> 
            <div className='toggleButton'>                
                <button  onClick={() => {
                    setExpandNavbar(prevNavbar => !prevNavbar)
                }}>
                    {expandNavbar===true ? <FontAwesomeIcon icon={faX}></FontAwesomeIcon>:<FontAwesomeIcon icon={faBars}></FontAwesomeIcon>}
                    
                   
                </button>
            </div>           
            <div className='links'>                
                <Link to='/'>Home</Link>
                <Link to='/gallery'>Gallery</Link>
                <Link to='/contact'>Contact</Link>            
            </div>
        </div>           
  )
}

export default Navbar