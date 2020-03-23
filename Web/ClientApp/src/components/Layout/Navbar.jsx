import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { LoginOutlined, UserAddOutlined, LockOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { navigate, Link } from 'gatsby';
import '../../styles/navbar.scss';
import { Token } from '../../services/Token';
import { isBrowser } from '../../services/isBrowser';

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
    tutorials: '/',
};

const Navbar = () => {
    const [key, setKey] = useState();

    useEffect(() => {
        setKey(getCurrentSubPath());
    }, []);

    return (
        Token.isUserAuthenticated()
            ? <AuthenticatedNavbar theKey={key} setKey={setKey} />
            : <UnauthenticatedNavbar theKey={key} setKey={setKey} />
    );
};

const UnauthenticatedNavbar = ({ theKey, setKey }) => (
    <Menu onClick={e => setKey(e.key)} className="top-nav" mode="horizontal" selectedKeys={[theKey]} theme="dark">
        <Menu.Item className="brand" key={links.brand}>
            <Brand />
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

const AuthenticatedNavbar = ({ theKey, setKey }) => (
    <Menu onClick={e => setKey(e.key)} className="top-nav" mode="horizontal" selectedKeys={[theKey]} theme="dark">
        <Menu.Item className="brand" key={links.brand}>
            <Brand />
        </Menu.Item>
        <Menu.Item className="ant-menu-item" key={links.tutorials}>
            <Link to={links.tutorials}>
                <HomeOutlined />Tutorials
            </Link>
        </Menu.Item>
        <Menu.Item onClick={() => signOut()}>
            <span>
                <LogoutOutlined />Sign Out
            </span>
        </Menu.Item>
    </Menu>
);

const Brand = () => (
    <Link to={links.brand}>
        <LockOutlined className="brand-icon" />The Hackerman Cometh
    </Link>
);

// The typeof window !== 'undefined' check is needed to pass the Gatsby production build process
const getCurrentSubPath = () => isBrowser() && ('/' + window.location.pathname.split('/')[1] || '/');

const signOut = () => {
    Token.logout();
    navigate(links.logIn);
};

export default Navbar;