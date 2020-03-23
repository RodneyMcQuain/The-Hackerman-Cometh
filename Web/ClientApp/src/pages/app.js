import React from 'react';
import { Router } from '@reach/router';
import PrivateRoute from '../components/PrivateRoute';
import SSIInjection from '../components/Tutorial/SSIInjection/SSIInjection';

const App = () => (
    <Router>
        <PrivateRoute path="app/ssi-injection" component={SSIInjection} />
    </Router>
);

export default App;