import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../Context/notes/noteContext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'
const Note = () => {
  const context = useContext(noteContext)
  const { notes, getNotes,editNote } = context
   
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line 
  }, []);
  // useref use as element of location
  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({id:"",etitle:"",edesc:"",etag:""});
  const updateNote = (updateNote) => {
    ref.current.click()
    setNote({id:updateNote._id,etitle:updateNote.title,edesc:updateNote.description, etag:updateNote.tag})
  }
  
  const handleClick = (event) =>{
    editNote(note.id,note.etitle,note.edesc,note.etag)

    refClose.current.click()
    
}
const onChange = (event) => {
    setNote({...note,[event.target.name]:event.target.value})
}
  return (<>
    <AddNote />


    <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="exampleModalLabel">Update Notes</h3>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="container my-3">
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} value={note.etitle}/>
              </div>
              <div className="mb-3">
                <label htmlFor="edesc" className="form-label">Description</label>
                <input type="text" className="form-control" id="edesc" name='edesc' onChange={onChange} value={note.edesc}/>
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">tag</label>
                <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<3 || note.edesc.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div className='row my-3'>
      <h1>Your Notes</h1>
      <div className="container mx-2">{notes.length===0 && 'No notes to dispay'}</div>
      {notes.map((note) => {
        return <Noteitem note={note} key={note._id} updateNote={updateNote} />
      })}
    </div>
  </>
  )
}

export default Note
