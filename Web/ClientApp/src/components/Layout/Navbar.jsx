import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { LoginOutlined, UserAddOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'gatsby-link';
import '../../styles/navbar.scss';

/* 
 * For this navbar to have intended behavior the 'key' prop on Menu.Item must 
 * match the 'to' prop on Link. Unforunately Menu.Item cannot be abstracted to 
 * a separate component to facilitate this because it will cease to be recognized 
 * by Ant Design. So, use this links object and manually keep them in sync.
 */
const links = {
    brand: '/',
    logIn: '/log-in',
    signUp: '/sign-up',
};

const Navbar = () => {
    const [key, setKey] = useState();

    useEffect(() => {
        setKey(getCurrentSubPath());
    }, []);

    return (
        <Menu onClick={e => setKey(e.key)} className="top-nav" mode="horizontal" selectedKeys={[key]} theme="dark">
            <Menu.Item className="brand" key={links.brand}>
                <Link to={links.brand}>
                    <LockOutlined className="brand-icon" />The Hackerman Cometh
                </Link>
            </Menu.Item>
            <Menu.Item key={links.logIn}>
                <Link to={links.logIn}>
                    <LoginOutlined />Log In
                </Link>
            </Menu.Item>
            <Menu.Item key={links.signUp}>
                <Link to={links.signUp}>
                    <UserAddOutlined />Sign Up
                </Link>
            </Menu.Item>
        </Menu>
    );
};

// The typeof window !== 'undefined' check is needed to pass the Gatsby production build process
const getCurrentSubPath = () => typeof window !== 'undefined' && ('/' + window.location.pathname.split('/')[1] || '/');

export default Navbar;