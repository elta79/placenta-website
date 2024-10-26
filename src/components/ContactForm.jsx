import { useNavigate } from 'react-router-dom'
import '../styles/contact.css'
import Select from 'react-select'
import emailjs from '@emailjs/browser'
import Modal from '../components/Modal'
import { useRef, useState } from 'react'

const ContactForm =()=>{
  const form = useRef()
  const navigate = useNavigate()    
  const options = [
      { value: 'Encapsulation', label: 'Encapsulation  $250' },
      { value: 'Print_Blood', label: 'Blood Print  $15' },
      { value: 'Print_Color', label: 'Color Print  $20' },
      { value: 'Framed_Print', label: 'Framed Print  $50' },
      { value: 'Cord', label: 'Cord Keepsake  $50' }
  ]   
  const conditions = [
      { value: 'none', label: 'None.  Healthy pregnancy, no concerns.' },
      { value: 'gbs', label: 'Group B strep' },
      { value: 'diabetes', label: 'Diabetes' },
      { value: 'gest_Diabetes', label: 'Gestational diabetes' },
      { value: 'hepatitis', label: 'Hepatitis A, B, C' },
      { value: 'other', label: 'Other' },        
  ]

  const customStyles = {
      control: (base, state) => ({
          ...base,
          background: '#f4eee1',
          borderRadius: 10,
          padding: 5,
          border: 'none',
          boxShadow: 'none',
          '&:hover': {
              border: '1px dotted gray'
          }
      }),
      option: (base, state) => ({
          ...base,
          background:'#f4eee1',
          '&:hover': {
              background: '#c4bdac'
          }
      })
  }
  const [openModal, setOpenModal]= useState(false)
  const [service, setService] = useState([])
  const [condition, setCondition] = useState([])
  const [formData, setFormData] = useState(
    {
        firstName:'',
        lastName:'', 
        edd:'',
        csec:'',
        email:'',
        phone:'',
        address:'',
        city:'',
        state:'',
        zip:'',
        location:'',
        sex:'', 
        comments:''  
    }
  )

  function handleChangeService(selectedOption){        
      setService(prevService => {
          return{
              ...prevService,
              selectedOption
          } 
      })        
  }
  function handleChangeConditions(selectedOption){
      setCondition(prevCondition => {
              //iterate array and if value = gbs open modal
          selectedOption.forEach(condition => {
              if (condition.value === 'gbs'){
                  setOpenModal(true)                     
              }
          })
          return{
              ...prevCondition,
              selectedOption                
          }
      })
  }   
  function handleChange(event){        
      const { name, value, type } = event.target;
      setFormData(prevFormData => {
          return{
              ...prevFormData,
              [name]: value
          }
      })
  }

  function handleSubmit(event){
    event.preventDefault()                
    // console.log(formData)
    // console.log(service)
    // console.log(condition)        
    emailjs.sendForm('contact_service', 'contact_form', form.current, 'kr3xJ0AO9pjywN-mQ')
      .then((result) => {
          console.log(result.text)
          navigate('/thankyou')
      }, (error) => {
          console.log(error.text)
      })     
  }    
  return(
    <>
      <form ref={form} onSubmit={handleSubmit}>
        <h3 className='title--contact'>Contact Form</h3>
        <div className="grid-container-name">
            <span id='firstName'>First Name</span>
            <input
                type='text'
                className='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            <span id='lastName'>Last Name</span>
            <input
                type='text'
                className='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                required
            />                    
        </div>  
        <span>Email</span>
        <input
            type='email'
            className='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
        />
        <span>Phone Number</span>
        <input
            placeholder='xxx-xxx-xxxx'
            type='text'
            className='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
        />
        <span>Address</span>
        <input
            type='text'
            className='address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
        />                
        <div className='grid-container-address'>
            <span id='city'>City</span>
            <input
                type='text'
                className='city'
                name='city'
                value={formData.city}
                onChange={handleChange}
                required                        
            />
            <span id='state'>State</span>
            <input
                type='text'
                className='state'
                name='state'
                value={formData.state}
                onChange={handleChange}
                required
            />
            <span id='zip'>Zip Code</span>
            <input
                type='text'
                className='zip'
                name='zip'
                value={formData.zip}
                onChange={handleChange}
                required
            />                   
        </div>
        <span>Estimated Due Date</span>
        <input
            type='date'
            className='edd'
            name='edd'
            value={formData.edd}
            onChange={handleChange}
            required
        />
        <span>Scheduled C-section Date</span>
        <input
            type='date'
            className='csec'
            name='csec'
            value={formData.csec}
            onChange={handleChange}                    
        />               
        <hr />
        <br />
        <span>Please choose at least one service:</span>
        <Select
            options={options}
            onChange={handleChangeService}
            name='service'
            className='service'
            value={formData.service}
            isMulti
            styles={customStyles}
        />
        <span>Please select any of the conditions that you have been diagnosed with during this pregnancy:</span>
        <Select 
            options={conditions}
            onChange={handleChangeConditions}
            name='condition'
            className='condition'
            value={formData.condition}
            isMulti
            styles={customStyles}                    
        />    
        {/* pass prop setOpenModal as closeModal */}
        {openModal && <Modal closeModal={setOpenModal}/>}
        <span>Where do you plan to give birth?:</span>
        <select 
            id='location'
            name='location'
            value={formData.location}
            onChange={handleChange}
        >
            <option value='home'>Home</option>
            <option value='nch'>North Collier Hospital</option>
            <option value='healthPark'>Health Park</option>
            <option value='other'>Other</option>
        </select>
        <span>What is your Baby's sex?:</span>
        <select 
            id='sex'
            name='sex'
            value={formData.sex}
            onChange={handleChange}
        >
            <option value='surprise'>Surprise</option>
            <option value='girl'>Girl</option>
            <option value='boy'>Boy</option>
        </select>
        <textarea
            value={formData.comments}
            onChange={handleChange}
            name='comments'
            className='comments'
            placeholder='Anything else you would like me to know?'
        />                
        <div className='button'>
            <button id='button--submit'>Submit</button>
        </div>                
                          
      </form>
    </>
  )
}
export default ContactForm
