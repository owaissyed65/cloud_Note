import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import noteContext from '../Context/notes/noteContext';
import "../CSS/Set.css"
const Navbar = () => {
    const context = useContext(noteContext)
    const { updateMode, mode } = context;
    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: `${mode.backgroundColor}` }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{ color: `${mode.color}` }} to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active focus" style={{ color: `${mode.color}` }} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about" style={{ color: `${mode.color}` }}>About</Link>
                            </li>
                        </ul>
                        <div className="form-check form-switch mx-3 ">
                            <input className="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={updateMode} />
                            <label className="form-check-label" style={{ color: `${mode.color}` }} htmlFor="flexSwitchCheckDefault">{mode.text}</label>
                        </div>
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
