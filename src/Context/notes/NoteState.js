import React, { useState } from "react";
import noteContext from "./noteContext";
const NoteState = (props) => {
    const [mode, setMode] = useState({
        color:"black",
        backgroundColor:"#9dfdbd63",
        text:"Enable Dark mode",
    });
    
    const updateMode = () =>{
        if (mode.backgroundColor==='#9dfdbd63') {
            setMode({
                color:"white",
                backgroundColor:"#2e7546",
                text:"Disable Dark mode",
                back:document.body.style.backgroundColor='#386146'
            })
        }
        else{
            setMode({
                color:"black",
                backgroundColor:"#9dfdbd63",
                text:"Enable Dark mode",
                back:document.body.style.backgroundColor='white'
            })
        }
          }
    const initalNotes = [
      {
        "_id": "62f7c5fbde7dd6a6dd02d3bdwqa",
        "user": "62f7b8f25bf27ae8eb502aad",
        "title": "notitle",
        "description": "hello world , how are you",
        "tag": "mypero",
        "date": "2022-08-13T15:40:43.139Z",
        "__v": 0
      },
      {
        "_id": "62fba069224d7b8ad87b423dedwd",
        "user": "62f7b8f25bf27ae8eb502aad",
        "title": "owais",
        "description": "hello world , how you",
        "tag": "mypero",
        "date": "2022-08-16T13:49:29.071Z",
        "__v": 0
      },
      {
        "_id": "62fba069224d7b8ad87b423dewd",
        "user": "62f7b8f25bf27ae8eb502aad",
        "title": "owais",
        "description": "hello world , how you",
        "tag": "mypero",
        "date": "2022-08-16T13:49:29.071Z",
        "__v": 0
      },
      {
        "_id": "62fba069224d7b8ad87b423ddew",
        "user": "62f7b8f25bf27ae8eb502aad",
        "title": "owais",
        "description": "hello world , how you",
        "tag": "mypero",
        "date": "2022-08-16T13:49:29.071Z",
        "__v": 0
      },
      {
        "_id": "62fba069224d7b8ad87b423dvefv",
        "user": "62f7b8f25bf27ae8eb502aad",
        "title": "owais",
        "description": "hello world , how you",
        "tag": "mypero",
        "date": "2022-08-16T13:49:29.071Z",
        "__v": 0
      },
      {
        "_id": "62fba069224d7b8ad87b423dwcd",
        "user": "62f7b8f25bf27ae8eb502aad",
        "title": "owais",
        "description": "hello world , how you",
        "tag": "mypero",
        "date": "2022-08-16T13:49:29.071Z",
        "__v": 0
      },
      {
        "_id": "62fba069224d7b8ad8cxs7b423d",
        "user": "62f7b8f25bf27ae8eb502aad",
        "title": "owais",
        "description": "hello world , how you",
        "tag": "mypero",
        "date": "2022-08-16T13:49:29.071Z",
        "__v": 0
      },
      {
        "_id": "62fba069224d7b8ad87b4ewq23d",
        "user": "62f7b8f25bf27ae8eb502aad",
        "title": "owais",
        "description": "hello world , how you",
        "tag": "mypero",
        "date": "2022-08-16T13:49:29.071Z",
        "__v": 0
      },
      {
        "_id": "62fba069224d7b8ad87b423dhtyh",
        "user": "62f7b8f25bf27ae8eb502aad",
        "title": "owais",
        "description": "hello world , how you",
        "tag": "mypero",
        "date": "2022-08-16T13:49:29.071Z",
        "__v": 0
      },
      {
        "_id": "62fba069224d7b8ad87b423dhyt",
        "user": "62f7b8f25bf27ae8eb502aad",
        "title": "owais",
        "description": "hello world , how you",
        "tag": "mypero",
        "date": "2022-08-16T13:49:29.071Z",
        "__v": 0
      },
      {
        "_id": "62fba069224d7b8ad87b423nhhd",
        "user": "62f7b8f25bf27ae8eb502aad",
        "title": "owais",
        "description": "hello world , how you",
        "tag": "mypero",
        "date": "2022-08-16T13:49:29.071Z",
        "__v": 0
      },
      {
        "_id": "62fba069224d7b8ad87b423dnhhl",
        "user": "62f7b8f25bf27ae8eb502aad",
        "title": "owais",
        "description": "hello world , how you",
        "tag": "mypero",
        "date": "2022-08-16T13:49:29.071Z",
        "__v": 0
      },
    ]
    const [notes, setNotes] = useState(initalNotes);
  return (
    <noteContext.Provider value={{mode,updateMode,notes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
