import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
export default function Login(props) {
    const host = process.env.REACT_APP_API_URL || 'http://localhost:5000'
    const navigate = useNavigate();
    const loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/login-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: document.getElementById('email').value, password: document.getElementById('password').value }),
            mode: 'cors'
        });
        const respond = await response.json()
        console.log(respond);

        // REDIRECT USER
        if (respond.authToken) {
            localStorage.setItem('token', respond.authToken)

            props.showAlert('Cool!', 'Login Sucesss!', 'success')
            navigate('/')

        } else {
            props.showAlert('Woah!', 'Something went wrong!', 'danger')
        }
    }

    return (
        <>
            <form onSubmit={loginUser}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input placeholder='Your email' type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input placeholder='Your password' type="password" className="form-control" name='password' id="password" />
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="keeploggedin"/>
                        <label className="form-check-label" htmlFor="keeploggedin" name='keeploggedin'>Keep me logged in.</label>
                </div> */}
                <div className='d-flex flex-direction-column'>

                    <button type="submit" className="btn btn-primary" >Login</button>
                    <Link style={{color: "#8e00f1"}} className=" d-flex align-items-center text-decoration-none mx-3" to="/signup" role="button">Create a new account</Link>
                </div>
            </form>
        </>
    )
}
