import React from 'react';
import { navigate } from 'gatsby';
import { Token } from '../services/token';

const HiddenPublicRoute = ({ children }) => {
    if (Token.isUserAuthenticated()) {
        navigate('/');
        return null;
    }

    return <>{children}</>;
};

export default HiddenPublicRoute;