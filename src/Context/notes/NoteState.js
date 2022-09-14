import React, { useState } from "react";
// import { useEffect } from "react";
import noteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  let initalNotes = []
  // all states
  const [details, setDetails] = useState({ name: '', email: '' });
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
  // get data of user
  const getData = async () => {
    const res = await fetch(`${host}/api/notes/getuserdata`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    });
    const info = await res.json();
    setDetails({ name: info.name, email: info.email })
  }

  // get notes
  const getNotes = async () => {
    // Api calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    });
    const note = await response.json()
    setNotes(note)
  }
  // Create a notes
  const addNote = async (title, description, tag, id) => {
    // Api calls
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json()
    //logic to add note

    setNotes(notes.concat(note))

  }
  // Update a note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    await response.json(); // parses JSON response into native JavaScript objects
    const newNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title, description, tag };
      }
      return note;
    });
    // logic to edit in client
    setNotes((prev) => newNotes)

  }
  // Delete a note
  const deleteNote = async (id) => {
    // api call
    const response = await fetch(`${host}/api/notes/deltnote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    });
    await response.json(); // parses JSON response into native JavaScript objects
    // logic dlt note
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }
  return (
    <noteContext.Provider value={{ mode, updateMode, notes, addNote, deleteNote, getNotes, editNote, details, setDetails, getData }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
