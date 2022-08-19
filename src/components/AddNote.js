import React,{useContext,useState} from 'react'
import noteContext from '../Context/notes/noteContext'
const AddNote = () => {
    const [note, setNote] = useState({title:"",desc:"",tag:""});
    const context = useContext(noteContext);
    const {addNote} = context ;
    const handleClick = (event) =>{
        event.preventDefault()
        addNote(note.title,note.desc,note.tag,note.id)
    }
    const onChange = (event) => {
        setNote({...note,[event.target.name]:event.target.value})
    }
  return (
    <div className='container my-3'>
      <form>
        <h1 className='my-3 m-3'>My Notes</h1>
        <div className="container my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input type="text" className="form-control" id="desc" name='desc' onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">tag</label>
            <input type="text" className="form-control" id="desc" name='tag' onChange={onChange} />
          </div>
          
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddNote
