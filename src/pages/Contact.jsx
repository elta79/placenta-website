// HIDE KEY BEFORE GITHUB

import React, { useState, useRef } from 'react'
import '../styles/contact.css'
import Select from 'react-select';
import emailjs from '@emailjs/browser'


function Contact() {

    const form = useRef()

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
    const [service, setService] = useState([])

    const [condition, setCondition] = useState([])

    const [formData, setFormData] = useState(
        {
            firstName:'',
            lastName:'', 
            edd:'',
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
        
        console.log(formData)
        console.log(service)
        console.log(condition)

        emailjs.sendForm('contact_service', 'contact_form', form.current, 'Ksv0B-69iF1uQVgg1')
            .then((result) => {
                console.log(result.text)
            }, (error) => {
                console.log(error.text)
            })
        alert('Email sent')       
    }
    
  return (
    <>
        <div className='container--form'>
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
                <span>Estimated Due Date or Scheduled C-section</span>
                <input
                    type='date'
                    className='edd'
                    name='edd'
                    value={formData.edd}
                    onChange={handleChange}
                    required
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
                    <button>Submit</button>
                </div>
                
                
            </form>
            <div className='contactInfo'>
            <img src='../images/upclose-placenta.jpeg'alt='placenta and cord' className='contact--image'/>  
                <div className='contact--content' >          
                    <h4 id='questions'>Questions?</h4>
                    <p id='idai'>Idai Martinez</p>
                    <a href='tel:239-289-3414' className='contact--link'>786-365-3291</a>
                    <a href='mailto:arnoldfamilyendeavors@gmail.com' className='contact--link'>placentasbyidai@gmail.com</a>
                </div>
            </div>
        </div>
    </>
  )
}

export default Contact