import React, {useEffect} from 'react'
import axios from 'axios'
import './LandingPage.css'

function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello')
        .then(res => console.log(res))
    },[])

    return (
        <div className="landingpage">
           <h2>Landing Page</h2> 
        </div>
    )
}

export default LandingPage
