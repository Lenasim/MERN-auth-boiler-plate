import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types'

export default function (preState = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...preState, loginSuccess: action.payload }
        case REGISTER_USER:
            return { ...preState, register: action.payload }
        case AUTH_USER:
            return { ...preState, userData: action.payload }
        default:
            return preState;
    }
}