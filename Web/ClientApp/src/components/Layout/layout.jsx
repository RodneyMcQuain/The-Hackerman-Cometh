import React from 'react';
import Navbar from './Navbar';
import '../../styles/global.scss';
import 'normalize.css';

const Layout = ({ children }) => (
    <>
        <Navbar />
        <section>{children}</section>
    </>
);

export default Layout;
