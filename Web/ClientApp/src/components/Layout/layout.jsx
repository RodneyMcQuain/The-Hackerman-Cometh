import React from 'react';
import Navbar from './Navbar';
import '../../styles/global.scss';
import 'normalize.css';
import favicon from '../../images/hackermanCometh.png';
import Helmet from 'react-helmet';

const Layout = ({ children, className }) => (
    <>
        <Helmet>
            <link rel="icon" href={favicon} />
        </Helmet>
        <Navbar />
        <section className={className}>{children}</section>
    </>
);

export default Layout;
