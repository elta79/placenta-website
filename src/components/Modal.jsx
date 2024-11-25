import'../styles/modal.css'

function Modal({closeModal}){

    function handleClick(){
        //change state openModal to false
        closeModal(false)
    }

    return(        
        <div className='modal-background'>
            <div className='modal-container'>      
                <div className="content">
                    <p><span className='bold'>NOTICE</span> - <br/>if you are GBS positive, the hospital will not release your placenta for processing.</p>
                </div>
                <button className='close-modal-button' onClick={handleClick}>Got it!</button>
            </div>
        </div>        
    )
}

export default Modal