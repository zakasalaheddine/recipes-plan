import React, { createContext, useReducer } from 'react';
import { AuthReducer } from '../reducers/auth.reducer';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user, dispatch] = useReducer(AuthReducer, {
        jwtToken: localStorage.getItem('jid')
    });

    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;