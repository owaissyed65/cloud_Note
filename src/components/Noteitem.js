import React from 'react'
import '../CSS/Set.css'
const Noteitem = (props) => {
    const { notes } = props
    return (
        <div className='col-md-3 my-3'>            
            <div className="card" >
                <div className="card-body">
                    <div className="d-flex align-items-center ">
                    <h5 className="card-title"> {notes.title}</h5>
                    <i className="fa-solid fa-pen mx-2"></i>
                    <i className="fa-solid fa-trash"></i>
                    </div>
                    <p className="card-text"> {notes.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
