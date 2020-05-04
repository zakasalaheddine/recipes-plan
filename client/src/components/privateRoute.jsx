import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const { user } = useContext(AuthContext);
    const isAuthenticated = () => {
        if(!user)
            return false;
        if(!user.jwtToken)
            return false;
        return true;
    }
    return (
        <Route 
            {...rest} 
            render={(props) => {
                return isAuthenticated() ? <Component {...props} /> : <Redirect to='/login' />
            }
        } />
    )
}

export default PrivateRoute;