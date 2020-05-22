import React, {useEffect} from 'react'
import axios from 'axios'
import './LandingPage.css'

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
        .then(res => console.log(res))
    },[])

    const logoutHandler = () => {
        axios.get('/api/users/logout')
        .then(res => res.data.success? props.history.push('/login'): alert("Failed to log out"))
    }

    return (
        <div className="landingpage">
           <h2>Landing Page</h2> 

           <button onClick={logoutHandler}>Log out</button>
        </div>
    )
}

export default LandingPage
