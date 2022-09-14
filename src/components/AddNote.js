import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../Context/notes/noteContext'
const AddNote = (props) => {
  const [note, setNote] = useState({ title: "", desc: "", tag: "" });
  const context = useContext(noteContext);
  const { addNote, mode, details, getData } = context;
  let navigate = useNavigate()
  const handleClick = (event) => {
    event.preventDefault()
    addNote(note.title, note.desc, note.tag, note.id)
    props.showAlert("success", "Add Note Successfully")
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getData();
    }
    else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value })
  }
  return (
    <div className='container my-3'>
      <div className='d-flex justify-content-center flex-row'>
        <div className="shadow p-3 mb-5 bg-body rounded w-50 mx-2"><h4 className='d-flex justify-content-center'>
          {details.name}
        </h4></div>
        <div className="shadow p-3 mb-5 bg-body rounded w-50 "><h4 className='d-flex justify-content-center '>{details.email}
        </h4></div>
      </div>

      <form>
        <h1 className='my-3 m-3' style={{ color: `${mode.color}` }}>{details.name} Notes</h1>
        <div className="container my-3" >
          <div className="mb-3">
            <label htmlFor="title" className="form-label" style={{ color: `${mode.color}` }} >Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} style={{ backgroundColor: `${mode.backgroundColor}`, color: `${mode.color}` }} />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label" style={{ color: `${mode.color}` }} >Description</label>
            <input type="text" className="form-control" id="desc" name='desc' onChange={onChange} style={{ backgroundColor: `${mode.backgroundColor}`, color: `${mode.color}` }} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" style={{ color: `${mode.color}` }} >Tag</label>
            <input type="text" className="form-control" id="desc" name='tag' onChange={onChange} style={{ backgroundColor: `${mode.backgroundColor}`, color: `${mode.color}` }} />
          </div>

          <button type="submit" disabled={note.title.length < 3 || note.desc.length < 5} className="btn btn-success" onClick={handleClick} >Add Note</button>
        </div>
      </form>
    </div>
  )
}

export default AddNote
