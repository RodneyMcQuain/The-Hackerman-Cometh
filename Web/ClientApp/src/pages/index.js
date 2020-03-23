import React from 'react';
import Banner from '../components/Index/Banner';
import Tutorials from '../components/Index/Tutorials';
import { Token } from '../services/token';

const IndexPage = () => {
    return (
        Token.isUserAuthenticated()
            ? <Tutorials />
            : <Banner />
    );
};

export default IndexPage;
