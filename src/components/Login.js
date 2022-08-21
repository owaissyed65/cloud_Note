import React, { useState } from 'react'
import { useNavigate,Link } from "react-router-dom";

const Login = (props) => {
  
  document.title = 'Login - Your Notes '
  let history = useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "" });
  const onChange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit')
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
    console.log(json)
    props.bar(100)

    if (json.success) {
      props.showAlert("success","Login Successfully")
      localStorage.setItem('token',json.authToken)
      history('/')
    }
    else {
      props.showAlert("danger","Invalid Password or email")
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credential.email} onChange={onChange} id="exampleInputEmail1" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="current-password" className="form-label">Password</label>
          <input type="password" onChange={onChange} className="form-control" value={credential.password} id="exampleInputPassword1" name='password' />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <Link className='my-3' style={{marginTop:`1110px`}} to='/signup'> <p>Create a new account</p></Link>
    </div>
  )
}

export default Login
