import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import { useSelector, useDispatch } from 'react-redux';
import API from '../services/API';
import { addLoginUsers } from '../store/authSlice'
import { Link, useLocation } from 'react-router-dom';
import { userMenu } from '../UserMenu';
import { FaWarehouse } from "react-icons/fa6";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaHospital } from "react-icons/fa";
const Layout = ({ children }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { user } = useSelector(state => state.auth);
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                let { data } = await API.get("http://localhost:4000/getCurrentUser")
                if (data.success) {
                    dispatch(addLoginUsers(data.data))
                }
            } catch (err) {
                console.log(err)
            }
        }
        getCurrentUser()
    }, [])
    return (

        <div>
            <Header />
            <div className='d-flex allCollection'>
                <div className='sidebar'>
                    <div className='blood-header'>
                        <h3>Blood Bank App</h3>
                        <hr className='text-dark' />
                    </div>
                    <div className='menu'>
                        {
                            user?.role === "orgnization" && (
                                <>
                                    <div className={`menu-item ${location.pathname === "/" && 'active'}`}>
                                        <i><FaWarehouse /></i>
                                        <Link to="/">Inventory</Link>
                                    </div>
                                    <div className={`menu-item ${location.pathname === "/donar" && 'active'}`}>
                                        <i><BiSolidDonateBlood /></i>
                                        <Link to="/donar">Donar</Link>
                                    </div>
                                    <div className={`menu-item ${location.pathname === "/hospital" && 'active'}`}>
                                        <i><FaHospital /></i>
                                        <Link to="/hospital">Hospital</Link>
                                    </div>
                                </>
                            )
                        }
                        {
                            (user?.role === "donar" || user?.role === "hospital") && (
                                <div className={`menu-item ${location.pathname === "/organisation" && 'active'}`}>
                                    <i><FaHospital /></i>
                                    <Link to="/organisation">Organisation</Link>
                                </div>
                            )
                        }
                        {
                            (user?.role === "hospital") && (
                                <div className={`menu-item ${location.pathname === "/consumers" && 'active'}`}>
                                    <i><FaHospital /></i>
                                    <Link to="/consumers">Consumer</Link>
                                </div>
                            )
                        }
                        {
                            (user?.role === "donar") && (
                                <div className={`menu-item ${location.pathname === "/donation" && 'active'}`}>
                                    <i><FaHospital /></i>
                                    <Link to="/donation">Donation</Link>
                                </div>
                            )
                        }
                        {
                            user?.role === "admin" && (
                                <>
                                    <div className={`menu-item ${location.pathname === "/donar-list" && 'active'}`}>
                                        <i><FaWarehouse /></i>
                                        <Link to="/donar-list">Donar List</Link>
                                    </div>
                                    <div className={`menu-item ${location.pathname === "/hospital-list" && 'active'}`}>
                                        <i><BiSolidDonateBlood /></i>
                                        <Link to="/hospital-list">Hospital List</Link>
                                    </div>
                                    <div className={`menu-item ${location.pathname === "/org-list" && 'active'}`}>
                                        <i><FaHospital /></i>
                                        <Link to="/org-list">Organisation List</Link>
                                    </div>
                                </>
                            )
                        }



                        {/* {userMenu && userMenu.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return (
                                <div className={`menu-item ${isActive && 'active'}`}>
                                    <i>{menu.icon}</i>
                                    <Link to={menu.path}>{menu.name}</Link>
                                </div>
                            )
                        })} */}


                    </div>


                </div>
                <div className='layout'>
                    {children}
                </div>

            </div>
        </div>
    )
}

export default Layout