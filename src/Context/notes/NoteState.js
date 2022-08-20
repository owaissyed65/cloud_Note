import React, { useState } from "react";
import noteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  let initalNotes = []
  // all states
  const [notes, setNotes] = useState(initalNotes);
  const [mode, setMode] = useState({
    color: "black",
    backgroundColor: "#9dfdbd63",
    text: "Enable Dark mode",
  });
  // update a mode
  const updateMode = () => {
    if (mode.backgroundColor === '#9dfdbd63') {
      setMode({
        color: "white",
        backgroundColor: "#2e7546",
        text: "Disable Dark mode",
        back: document.body.style.backgroundColor = '#386146'
      })
    }
    else {
      setMode({
        color: "black",
        backgroundColor: "#9dfdbd63",
        text: "Enable Dark mode",
        back: document.body.style.backgroundColor = 'white'
      })
    }
  }
  // get notes
  const getNotes = async () => {
    // Api calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "authToken": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmN2I4ZjI1YmYyN2FlOGViNTAyYWFkIn0sImlhdCI6MTY2MDQwMTkwNn0.rrcM5uzDAgPSCuK_arjMsB0WdwOzWyGYTli_wF-qcA8'
      },
    });
    const note = await response.json()
    console.log(note)
    setNotes(note)
  }
  // Create a notes
  const addNote = async (title, description, tag,id) => {
    // Api calls
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmN2I4ZjI1YmYyN2FlOGViNTAyYWFkIn0sImlhdCI6MTY2MDQwMTkwNn0.rrcM5uzDAgPSCuK_arjMsB0WdwOzWyGYTli_wF-qcA8'
      },

      body: JSON.stringify({ title, description, tag })
    });
    const note =await response.json()
    //logic to add note
    // console.log("Adding a notes")
    setNotes(notes.concat(note))

  }
  // Update a note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmN2I4ZjI1YmYyN2FlOGViNTAyYWFkIn0sImlhdCI6MTY2MDQwMTkwNn0.rrcM5uzDAgPSCuK_arjMsB0WdwOzWyGYTli_wF-qcA8'
      },

      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    const newNotes = notes.map((note) => {
      if (note._id === id) {
          return {...note , title , description , tag} ;
      }
      return note;
  });
  // logic to edit in client
    setNotes((prev)=>newNotes)

  }
  // Delete a note
  const deleteNote =async (id) => {
    // api call
    const response = await fetch(`${host}/api/notes/deltnote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmN2I4ZjI1YmYyN2FlOGViNTAyYWFkIn0sImlhdCI6MTY2MDQwMTkwNn0.rrcM5uzDAgPSCuK_arjMsB0WdwOzWyGYTli_wF-qcA8'
      }
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    // logic dlt note
    console.log("deleting notes with id" + id)
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }
  return (
    <noteContext.Provider value={{ mode, updateMode, notes, addNote, deleteNote , getNotes,editNote}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
