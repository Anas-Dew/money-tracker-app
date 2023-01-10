import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar(props) {

    let Location = useLocation();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success navbar-dark">
                <div className="container-fluid">
                    <Link style={{fontFamily: 'DM Serif Display', fontSize: '2rem'}} className="navbar-brand text-light" to="/">{props.title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link  ${Location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/account">Account</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex justify-content-end">
                            <Link style={{backgroundColor: "#212121"}} className="btn text-white mx-2" to="/signup" role="button">Signup</Link>
                        </form> : <button onClick={logout} style={{backgroundColor: "#212121"}} className='btn text-white'>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}
