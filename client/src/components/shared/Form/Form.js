import React, { useState } from 'react'
import InputType from './InputType'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from "axios"
const Form = ({ formType, formTitle, submitBtn }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('donar')
    const [name, setName] = useState('')
    const [organisationName, setOrganisationName] = useState('')
    const [hospitalName, setHospitalName] = useState('')
    const [website, setWebsite] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const handleLogin = async (e, role, email, password) => {
        e.preventDefault()
        try {

            if (!role || !email || !password) {
                alert("please provide all feilds")
            }
            console.log("login", role, email, password)
            let { data } = await axios.post("http://localhost:4000/login", { role, email, password })
            console.log(data)
            if (data.success) {
                localStorage.setItem('token', data.token)
                alert(data.message)
                navigate("/")

            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleRegister = async (e, role, name, organisationName, hospitalName, email, password, website, address, phone) => {
        e.preventDefault()
        try {
            console.log("register", role, name, organisationName, hospitalName, email, password, website, address, phone)
            let data = await axios.post("http://localhost:4000/register", { role, name, organisationName, hospitalName, email, password, website, address, phone })
            alert(data.data.msg)
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form onSubmit={(e) => {
                if (formType === "login") {
                    return handleLogin(e, role, email, password)
                }
                else if (formType === "register") {
                    return handleRegister(e, role, name, organisationName, hospitalName, email, password, website, address, phone)
                }
            }}>
                <h1 className='text-center'>{formTitle}</h1>
                <hr />
                <div className='d-flex mb-3'>
                    <div class="form-check ms-2">
                        <input class="form-check-input" type="radio" name="role" value="donar" id="donar" onChange={(e) => setRole(e.target.value)} defaultChecked />
                        <label class="form-check-label" for="flexCheckDefault">
                            Donor
                        </label>
                    </div>
                    <div class="form-check ms-2">
                        <input class="form-check-input" type="radio" name="role" value="admin" id="admin" onChange={(e) => setRole(e.target.value)} />
                        <label class="form-check-label" for="flexCheckDefault">
                            Admin
                        </label>
                    </div>
                    <div class="form-check ms-2">
                        <input class="form-check-input" type="radio" name="role" value="orgnization" id="orgnization" onChange={(e) => setRole(e.target.value)} />
                        <label class="form-check-label" for="flexCheckDefault">
                            Organisation
                        </label>
                    </div>
                    <div class="form-check ms-2">
                        <input class="form-check-input" type="radio" name="role" value="hospital" id="hospital" onChange={(e) => setRole(e.target.value)} />
                        <label class="form-check-label" for="flexCheckDefault">
                            Hospital
                        </label>
                    </div>
                </div>
                {(() => {
                    switch (true) {
                        case formType === "login":
                            return (
                                <>
                                    <InputType labelText={'email'} labelFor={'email'} inputType={'email'} name={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <InputType labelText={'Password'} labelFor={'password'} inputType={'password'} name={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                                </>
                            )
                        case formType === "register":
                            return (
                                <>
                                    {
                                        (role === 'donar' || role === "admin") && (
                                            <InputType labelText={'Name'} labelFor={'name'} inputType={'text'} name={'name'} value={name} onChange={(e) => setName(e.target.value)} />
                                        )
                                    }
                                    {
                                        (role === "orgnization") && (
                                            <InputType labelText={'Organisation Name'} labelFor={'organisationName'} inputType={'text'} name={'organisationName'} value={organisationName} onChange={(e) => setOrganisationName(e.target.value)} />
                                        )
                                    }
                                    {
                                        (role === "hospital") && (
                                            <InputType labelText={'Hospital Name'} labelFor={'hospitalName'} inputType={'text'} name={'hospitalName'} value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
                                        )
                                    }
                                    <InputType labelText={'email'} labelFor={'email'} inputType={'email'} name={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <InputType labelText={'Password'} labelFor={'password'} inputType={'password'} name={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <InputType labelText={'Website'} labelFor={'website'} inputType={'text'} name={'website'} value={website} onChange={(e) => setWebsite(e.target.value)} />
                                    <InputType labelText={'Address'} labelFor={'address'} inputType={'text'} name={'address'} value={address} onChange={(e) => setAddress(e.target.value)} />
                                    <InputType labelText={'Phone'} labelFor={'phone'} inputType={'text'} name={'phone'} value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </>
                            )
                    }
                })()}

                <div className='d-flex justify-content-between'>
                    {formType === "login" ? (<p><Link to="/register">Not Registered Yet ? Register</Link></p>) : (<p><Link to="/login">Already User ? Login</Link></p>)}
                    <button className='btn btn-primary'>{submitBtn}</button>
                </div>

            </form>
        </div>
    )
}

export default Form