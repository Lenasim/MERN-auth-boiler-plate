import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'


export default function (SpecificComponent, option, adminRoute = null) {
    //option : null 아무나 출입 true 로그인온리 false 노로그인온리
    //adminRoute : arg가 비어있으면 null, 어드민온리 설정가능

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(res => {
                //로그인 하지 않은 상태 
                if (!res.payload.isAuth) {
                    if (option) {
                        props.history.push('/')
                    }
                } else {
                    //로그인 한 상태 
                    if (adminRoute && !res.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (option === false)
                            props.history.push('/')
                    }
                }
            })
        })

        return (
            <SpecificComponent {...props}/>
        )
    }
    return AuthenticationCheck
}