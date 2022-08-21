import React ,{useContext}from 'react'
import '../CSS/Set.css'
import noteContext from '../Context/notes/noteContext'
const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote ,updateMode, mode} = context
    const { note,updateNote } = props
    return (
        <div className='col-md-3 my-3'>            
            <div className="card" >
                <div className="card-body" style={{ backgroundColor: `${mode.backgroundColor}` }}>
                    <div className="d-flex align-items-center ">
                    <h5 className="card-title" style={{ color: `${mode.color}` }}> {note.title}</h5>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("danger","Delete Note Successfully") }}></i>
                    <i className="fa-solid fa-pen mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text" style={{ color: `${mode.color}` }}> {note.description}</p>
                    <p className="card-text" style={{ color: `${mode.color}` }}>Tag: {note.tag}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
