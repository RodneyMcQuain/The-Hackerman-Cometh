import React from 'react';
import { Router } from '@reach/router';
import PrivateRoute from '../components/PrivateRoute';
import SSIInjection from '../components/Tutorial/SSIInjection/SSIInjection';
import SQLInjection from '../components/Tutorial/SQLInjection/SQLInjection';

const App = () => (
    <Router>
        <PrivateRoute path="app/ssi-injection" component={SSIInjection} />
        <PrivateRoute path="app/sql-injection" component={SQLInjection} />
    </Router>
);

export default App;