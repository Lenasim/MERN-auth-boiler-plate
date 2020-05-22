import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import './RegisterPage.css'

function RegisterPage(props) {
    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = e => {
        setEmail(e.currentTarget.value)
    }
    const onNameHandler = e => {
        setName(e.currentTarget.value)
    }
    const onPasswordHandler = e => {
        setPassword(e.currentTarget.value)
    }
    const onConfirmPasswordHandler = e => {
        setConfirmPassword(e.currentTarget.value)
    }
    const onSubmitHandler = e => {
        e.preventDefault()
        if(Password !== ConfirmPassword) {
            return alert("Password does not match")
        }
        let body = {
            email: Email,
            name: Name,
            password: Password,
        }
        dispatch(registerUser(body))
            .then(res => res.payload.success ? props.history.push('/login') : alert('Failed to sign up'))
    }

    return (
        <div className="registerpage">
            <form className="registerform" onSubmit={onSubmitHandler}>
            <h2>Sign Up</h2>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Email</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">Create an account</button>
            </form>
        </div>
    )
}

export default RegisterPage
