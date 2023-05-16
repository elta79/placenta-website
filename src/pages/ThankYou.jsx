import React from 'react'
import '../styles/thankyou.css'

function ThankYou() {
  return (
    <div className='container--thankyou'>
        <div className='border'>
            <div className='card--thankyou'>
                <h1>Your email has been received.</h1>
                <h2>If you do not hear from me within 24 hours, please call me at  
                    <a href='tel:239-289-3414' className='contact--link'>786-365-3291</a>
                </h2>        
                <h2>Thank you!</h2>
                <h2 className='signature'>-Idai Martinez</h2>
            </div>
        </div>
        
    </div>
  )
}

export default ThankYou