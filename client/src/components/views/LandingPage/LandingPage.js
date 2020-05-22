import React, {useEffect} from 'react'
import axios from 'axios'

function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello')
        .then(res => console.log(res), err => console.log(err))
    },[])

    return (
        <div>
            Landing Page
        </div>
    )
}

export default LandingPage
