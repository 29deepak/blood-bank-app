import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const location = useLocation()
    console.log(user)
    const logoutHandler = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token')
            navigate("/login")
        }
    }
    return (
        <header class="p-3 text-bg-dark">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">

                    </a>

                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="#" class="nav-link px-2 text-white">BLOOD BANK APP</a></li>
                    </ul>

                    <div class="text-end d-flex p-2">
                        <h2>Welcome <span>{user?.name}  {user?.organisationName} {user?.hospitalName}<button className='btn btn-secondary'>{user?.role}</button></span></h2>
                    </div>
                    {
                        (location.pathname === "/" || location.pathname === "/donar" || location.pathname === "/hospital") ? (
                            <div class="text-end d-flex p-2">
                                <Link to="/analytics"><span className='btn btn-primary'>Analytics</span></Link>
                            </div>
                        ) : (
                            <div class="text-end d-flex p-2">
                                <Link to="/"><span className='btn btn-primary'>Home</span></Link>
                            </div>
                        )
                    }
                    <button type="button" class="btn btn-danger" onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        </header>
    )
}

export default Header