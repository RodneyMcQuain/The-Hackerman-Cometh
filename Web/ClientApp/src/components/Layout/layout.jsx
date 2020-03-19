import React from 'react';
import Navbar from './Navbar';
import '../../styles/global.scss';
import 'normalize.css';

const Layout = ({ children, className }) => (
    <>
        <Navbar />
        <section className={className}>{children}</section>
    </>
);

export default Layout;
