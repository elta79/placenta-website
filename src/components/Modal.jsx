import'../styles/modal.css'

function Modal({closeModal}){

    function handleClick(){
        //change state openModal to false
        closeModal(false)
    }

    return(
        <>
            <div className='modal-background'>
                <div className='modal-container'>
                    
                    <button className='close-modal' onClick={handleClick}> X </button>
                                       
                    <div className="content">
                        <p>Unfortunately, <br/>if you are GBS positive, the hospital will not release your placenta for processing.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal