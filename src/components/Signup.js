import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import noteContext from '../Context/notes/noteContext';

const Signup = (props) => {
  const context = useContext(noteContext)
  const { mode } = context
  document.title = 'Signup - Your Notes '
  let history = useNavigate();
  const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
  const onChange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value })
  }
  const { name, email, password } = credential;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit')
    props.bar(10)
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    props.bar(30)
    const json = await response.json();
    console.log(json)
    props.bar(70)

    if (json.success) {
      props.showAlert("success", "Signup Successfully")
      localStorage.setItem('token', json.authentication)
      console.log(localStorage.getItem('token'))
      props.bar(100)
      history('/login')
    }
    else {
      props.showAlert("danger", "Invalid Information")
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label " style={{ color: `${mode.color}` }}>Your Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} value={name} />
        </div>
        <div className="mb-3">
          <label style={{ color: `${mode.color}` }} htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={email} />
          <div id="emailHelp" className="form-text"style={{ color: `${mode.color==='grey'?'white':'grey'}` }}>We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{ color: `${mode.color}` }}>Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={password} minLength={5} required />
        </div>
        <div className="mb-3">
          <label style={{ color: `${mode.color}` }} htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <Link to='/login'> <p>Already a user?</p> </Link>
    </div>
  )
}

export default Signup
