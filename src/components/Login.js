import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import noteContext from '../Context/notes/noteContext';

const Login = (props) => {
  const context = useContext(noteContext)
  const { mode } = context
  document.title = 'Login - Your Notes '
  let navigate = useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "" });
  const onChange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.bar(15)
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credential.email, password: credential.password })
    });
    props.bar(50)
    const json = await response.json();

    props.bar(100)
    if (json.success) {
      props.showAlert("success", "Login Successfully")
      localStorage.setItem('token', json.authentication)

      navigate('/')
    }
    else {
      props.showAlert("danger", "Invalid Password or email")
    }
  }
  return (
    <div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{ color: `${mode.color}` }}>Email address</label>
          <input type="email" className="form-control" value={credential.email} onChange={onChange} id="exampleInputEmail1" name='email' aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="current-password" className="form-label" style={{ color: `${mode.color}` }}>Password</label>
          <input type="password" onChange={onChange} className="form-control" value={credential.password} id="exampleInputPassword1" name='password' />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <Link className='my-3' style={{ marginTop: `1110px`, textDecoration: 'none', color: `${mode.color === 'black' ? 'blue' : 'white'}` }} to='/signup'  > <p>Not Having An Account? Signup Now</p></Link>
    </div>
  )
}

export default Login
