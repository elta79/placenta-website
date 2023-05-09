import React from 'react'
import Card from '../components/Card'
import services from '../services.jsx'
import '../styles/home.css'
import { Link, useLocation } from 'react-router-dom'


function Home() {

  const card = services.map(element => {
    return (
      <Card
        key={element.title}
        title= {element.title}
        price= {element.price}
        description= {element.description}
        image= {element.image}
      />
    )
  })

  return (
    <div className='container'>
      <div className='hero'>
      <img src='../images/placenta-love-paint.png'alt='placenta and cord' className='image--hero'/>   
      <div className='contents--hero'>
          <div className='caption--hero'>
            <h1>Improve your postpartum experience</h1>
            <h1>with Naples best placenta services</h1>
          </div>
          
          <div className='buttons--hero'>
            <div className='buttons'>
              <a href='#four' className='button--home'id='services--button'>Services</a>
              <Link to='/gallery' className='button--home' id='gallery--button'>Gallery</Link>     
              <Link to='/contact' className='button--home'id='contact--button'>Contact</Link>  
            </div>
          </div>
        </div>
      </div>
      
        <section className='one'>        
          <div className='card--home' id='one'>            
            <h2 className='card--title'>What is a Placenta?</h2>
            <p className='def'>A placenta is a temporary organ that develops in the uterus during pregnancy, and it is expelled after the baby is born.  
              It serves as a connection between baby and mom, allowing the exchange of nutrients, oxygen, and waste products.  The placenta also plays a role in producing hormones that support 
              pregnancy, including human chorionic gonadotropin (hCG), estrogen, and progesterone.</p>
          </div>
        
          <div className='card--home' id='two'>
            <h2 className='card--title'>What is Placenta Encapsulation?</h2>
            <p className='def'>Placenta encapsulation is the process of drying and grinding the placenta into a 
              powder form, which is then encapsulated into capsules for consumption. </p>
          </div>
        
          <div className='card--home' id='three'>
            <h2 className='card--title'>Benefits of Placenta Encapsulation:</h2>
            <ul>
              <li><span className='bullet'>Hormonal balance:</span> The placenta contains hormones that can help balance the postpartum hormones in the body, potentially reducing symptoms of postpartum depression, anxiety, and mood swings.</li>
              <li><span className='bullet'>Increased milk production:</span> The hormones in the placenta may also help to increase milk production in nursing mothers.</li>
              <li><span className='bullet'>Increased energy:</span> The placenta contains iron, which can help combat postpartum fatigue and increase energy levels.</li>
              <li><span className='bullet'>Reduced postpartum bleeding:</span> The hormones and nutrients in the placenta may help to reduce postpartum bleeding and speed up the healing process.</li>
              <li><span className='bullet'>Improved immune function:</span> The placenta contains immune-boosting nutrients such as iron and zinc, which can help support the immune system during the postpartum period.</li>
              <li><span className='bullet'>Pain relief:</span> The hormones and nutrients in the placenta may help to reduce pain and inflammation after childbirth.</li>
              <li><span className='bullet'>Better sleep:</span> The placenta contains melatonin, which can help regulate sleep patterns and improve sleep quality.</li>
            </ul>
          </div>
        </section>
        <section className='four' id='four'>
          <div className='card--services'>           
              <h2 className='services--title' id='services'>Services Offered:</h2>
              <div className='services' >
                {card}
              </div>            
          </div>
        </section>
    </div>
  )
}

export default Home