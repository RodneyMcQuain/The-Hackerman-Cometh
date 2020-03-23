import React from 'react';
import { navigate } from 'gatsby-link';
import { Token } from '../services/token';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!Token.isUserAuthenticated()) {
        navigate('/log-in');
        return null;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;