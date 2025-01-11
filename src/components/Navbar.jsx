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
        <header className='navbar' id={expandNavbar ? 'open' : 'closed'}>
        {expandNavbar && (
            <div
                id="overlay"
                onClick={() => setExpandNavbar(false)} /* Close menu on overlay click */
            ></div>
        )}
            <nav>
                <div className='title--container'>
                    <Link to='/' target='_blank' className='title--navbar'>
                        <img className='logo' src='../images/logo300.png'/>
                        <p className='title-nav'>Placentas by Idai</p>
                    </Link> 
                                    
                    <button 
                        className='toggleButton'
                        onClick={() => setExpandNavbar(prevNavbar => !prevNavbar)}
                        aria-expanded={expandNavbar}
                        aria-label={expandNavbar ? 'Close menu' : 'Open menu'}
                        >
                        {expandNavbar===true ? (
                            <FontAwesomeIcon icon={faX} />
                        ):(
                            <FontAwesomeIcon icon={faBars}/>
                        )}
                    </button>
                </div>
                <ul className='links' role='menu'>
                    <li role='menuitem'>
                        <Link to='/'>Home</Link>
                    </li> 
                    <li role='menuitem'>
                        <Link to='/gallery'>Gallery</Link>
                    </li> 
                    <li role='menuitem'>
                        <Link to='/contact'>Contact</Link>
                    </li> 
                </ul>
            </nav>
        </header>
    )
}

export default Navbar