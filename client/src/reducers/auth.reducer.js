import { LOGIN_USER, LOGOUT_USER } from './types';

export const AuthReducer = (state, action) => {
    switch(action.type){
        case LOGIN_USER: {
            localStorage.setItem('jid', action.payload.jwtToken);
            return{
                ...state,
                isAuthenticated: true,
                jwtToken: action.payload.jwtToken,
                user: action.payload.user
            }
        }
        case LOGOUT_USER: {
            localStorage.removeItem('jid');
            return {
                ...state,
                isAuthenticated: false,
                jwtToken: null,
                user: null
            }
        }
        default: {
            return {
                ...state,
                jwtToken: localStorage.getItem('jid')
            };
        }
    }
}