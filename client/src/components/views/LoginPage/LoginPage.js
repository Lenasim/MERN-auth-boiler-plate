import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import './LoginPage.css'

function LoginPage(props) {
    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = e => {
        setEmail(e.currentTarget.value)
    }
    const onPasswordHandler = e => {
        setPassword(e.currentTarget.value)
    }
    const onSubmitHandler = e => {
        e.preventDefault()
        let body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))
        .then(res => res.payload.loginSuccess? props.history.push('/') : alert('Error'))
    
    }
    return (
        <div className="loginpage">
            <form className="loginform" onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage
