import React,{useContext} from 'react'
import noteContext from '../Context/notes/noteContext'
import Noteitem from './Noteitem'
const Note = () => {
    const context = useContext(noteContext)
    const { notes} = context
  
  return (
    <div className='row my-3'>
        <h1>Your Notes</h1>
      {notes.map((notes)=>{
        return  <Noteitem notes={notes} key={notes._id}/>
      })}
    </div>
  )
}

export default Note
