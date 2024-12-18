import { useNavigate } from 'react-router-dom'
import '../styles/contact.css'
import Select from 'react-select'
import emailjs from '@emailjs/browser'
import Modal from '../components/Modal'
import { useEffect, useRef, useState } from 'react'

const ContactForm =()=>{
  const form = useRef(null)
  const turnstileDivRef = useRef(null)
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
    { value: 'herpes' , label: 'herpes simplex virus (HSV)'},
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
  const [turnstileToken, setTurnstileToken] = useState("")
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
  const [errors, setErrors]= useState({})

  const updateErrorState = (fieldName, hasError, errorMessage="") =>{
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: hasError ? errorMessage : "",
    }))
  }

  const validateField = (name, value) =>{
    let error=''
    switch(name){
      case "firstName":
        if(!value.trim()) error ='First name is required.'
        break;
      case "lastName":
        if(!value.trim()) error ='Last name is required.'
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email address.";
        break;
        case "phone":
          if (!/^\d{3}-\d{3}-\d{4}$/.test(value))
            error = "Phone number must be in the format xxx-xxx-xxxx.";
          break;
        case "address":
          if (!value.trim()) error = "Address is required.";
          break;
        case "city":
          if (!value.trim()) error = "City is required.";
          break;
        case "state":
          if (!/^[A-Za-z]{2}$/.test(value)) error = "State must be 2 letters.";
          break;
        case "zip":
          if (!/^\d{5}$/.test(value)) error = "Zip code must be 5 digits.";
          break;
        case "edd":
          if(!value) error = "EDD is required."
          break;
        default:
          break;
    }
    setErrors(prevErrors =>({
      ...prevErrors,
      [name]: error,
    }))
  }

  useEffect(()=>{
    if(window.turnstile && !window.turnstile.hasRendered){
      window.turnstile.render(turnstileDivRef.current, {
        sitekey: import.meta.env.VITE_TURNSTILE_KEY,
        callback: (token)=>{
          //console.log("Token received", token)
          setTurnstileToken(token)
        }
      })
      window.turnstile.hasRendered= true //flag to indicate if already rendered
    }
  },[])

  const handleChangeService = (selectedOption) => {        
    setService(prev => {
      return{
        ...prev,
        selectedOption
      } 
    }) 
  }
  const handleChangeConditions=(selectedOption)=>{
    setCondition(prev => {
      //iterate array and if value = gbs open modal
      selectedOption.forEach(condition => {
        if (condition.value === 'gbs'){
            setOpenModal(true)                     
        }
      })
      return{
        ...prev,
        selectedOption                
      }
    })
  }
  const handleBlur = (e) =>{
    const {name, value} = e.target

    if (name === "condition"){
      updateErrorState("condition", condition.length === 0, "Value is required.")
    }else if (name === 'service'){
      updateErrorState("service", service.length === 0, "Value is required.")
    }else{
      validateField(name, value)
    }
  }

  const handleChange = (event) => {        
    const { name, value, type } = event.target;
    setFormData(prevFormData => {
      return{
        ...prevFormData,
        [name]: value
      }
    })
  }

  const handleSubmit = (event)=>{
    event.preventDefault()
    // console.log(formData)
    // console.log(service)
    // console.log(condition)

    //Get turnstile token from hidden input
    const tokenInput = form.current.querySelector('input[name="cf-turnstile-response"]').value
    if (!turnstileToken) {
      alert("Please complete Turnstile verification")
      return
    }
    //console.log("Turnstile token:",tokenInput.value)

    emailjs.sendForm('contact_service', 'contact_form', form.current, import.meta.env.VITE_EMAILJS_KEY)
      .then((result) => {
        console.log("EmailJS response:",result.text)
        navigate('/thankyou')
      }, (error) => {
        console.log("EmailJS error:", error.text)
      })     
  }
  
  return(
    <>
      <form ref={form} onSubmit={handleSubmit}>        
        <h2 className='title--contact'>Contact Form</h2>
        <div className="container--name">
          <label htmlFor='firstName'>
            First Name
            <input
              type='text'
              className='firstName'
              id='firstName'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required            
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </label>

          <label htmlFor='lastName'>
            Last Name
            <input
              type='text'
              className='lastName'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </label>
        </div>

        <label htmlFor='email'>
          Email
          <input
            type='email'
            className='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            autoComplete='email'
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>      

        <label htmlFor='phone'>
          Phone Number
          <input
            placeholder='xxx-xxx-xxxx'
            type='tel'
            className='phone'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            autoComplete='tel'
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </label>

        <label htmlFor='address'>
          Address
          <input
            type='text'
            className='address'
            id='address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            autoComplete='street-address'
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </label>
                 
        <div className='container--address'>
          <label htmlFor='city'>
            City
            <input
              type='text'
              className='city'
              id='city'
              name='city'
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              required                        
            />
            {errors.city && <span className="error">{errors.city}</span>}
          </label>

        <label htmlFor='state'>
          State
            <input
              type='text'
              className='state'
              id='state'
              name='state'
              minLength={2}
              maxLength={2}
              value={formData.state}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.state && <span className="error">{errors.state}</span>}
          </label>

          <label htmlFor='zip'>
            Zip Code
            <input
              type='text'
              className='zip'
              id='zip'
              name='zip'
              minLength={5}
              maxLength={5}
              value={formData.zip}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.zip && <span className="error">{errors.zip}</span>}
          </label>
        </div>

        <label htmlFor='edd'>
          Estimated Due Date
          <input
            type='date'
            id='edd'
            className='edd'
            name='edd'
            value={formData.edd}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.edd && <span className="error">{errors.edd}</span>}
        </label>
        <label htmlFor='csec'>
          Scheduled C-section Date
          <input
            type='date'
            id='csec'
            className='csec'
            name='csec'
            value={formData.csec}
            onChange={handleChange}                    
          />
        </label>            
        <hr />
        <br />
        <label htmlFor='service'>
          <span id="service-label">
            Please choose at least one service:
          </span>
          <Select
            options={options}
            onChange={handleChangeService}
            onBlur={()=> handleBlur({target:{name:'service'}})}
            id='service'
            name='service'
            required
            className='service'
            value={formData.service}
            isMulti
            styles={customStyles}
            aria-labelledby="service-label"
            aria-required="true"
          />
          {errors.service && <span className="error">{errors.service}</span>}  
        </label>
        <label htmlFor='condition'>
          <span id='condition-label'>
            Please select any of the conditions that you have been diagnosed with during this pregnancy:
          </span>
          <Select 
            options={conditions}
            onChange={handleChangeConditions}
            onBlur={()=> handleBlur({target:{name:'condition'}})}
            id='condition'
            name='condition'
            required
            className='condition'
            value={formData.condition}
            isMulti
            styles={customStyles}    
            aria-labelledby="condition-label"
            aria-required="true"
          />
          {errors.condition && <span className="error">{errors.condition}</span>}         
        </label>
        {/* pass prop setOpenModal as closeModal */}
        {openModal && <Modal closeModal={setOpenModal}/>}
        <label htmlFor='location'>
          Where do you plan to give birth?:
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
        </label>
        <label htmlFor='sex'>
          What is your Baby's sex?:
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
        </label>
        <label htmlFor='comments'>
          <textarea
            value={formData.comments}
            onChange={handleChange}
            id='comments'
            name='comments'
            className='comments'
            placeholder='Anything else you would like me to know?'
          />   
        </label>  
        <div ref={turnstileDivRef} className='cf-turnstile' ></div>           
        <div className='button'>
          <button id='button--submit' type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}
export default ContactForm
