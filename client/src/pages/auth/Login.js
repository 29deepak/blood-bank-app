import React from 'react'
import Form from '../../components/shared/Form/Form'

const Login = () => {
    return (
        <div className='container'>
            <Form formTitle={"Login Page"} submitBtn={"Login"} formType={'login'} />
        </div>
    )
}

export default Login