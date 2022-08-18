import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import noteContext from '../Context/notes/noteContext';
import "../CSS/Set.css"
const Navbar = () => {
    const darkMode = useContext(noteContext)
    return (
        <div>

            <nav className='navbar navbar-expand-lg navbar sticky-top  ' style={{ backgroundColor: `${darkMode.mode.backgroundColor}` }}>
                <div className="container-fluid" >
                    <Link className="navbar-brand" style={{ color: `${darkMode.mode.color}` }} to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" >
                                <Link className="nav-link focus " style={{ color: `${darkMode.mode.color}` }} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link focus" style={{ color: `${darkMode.mode.color}` }} to="/about">About</Link>
                            </li>

                        </ul>
                        <div className="form-check form-switch  ">
                            <input className="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={darkMode.updateMode} />
                            <label className="form-check-label" style={{ color: `${darkMode.mode.color}` }} htmlFor="flexSwitchCheckDefault">{darkMode.mode.text}</label>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar