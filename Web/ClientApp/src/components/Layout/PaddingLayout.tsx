import React from 'react';
import Layout from './layout';

interface PaddingLayoutProps {
    children: JSX.Element;
}

const PaddingLayout = ({ children }: PaddingLayoutProps) => (
    <Layout className="padding-container">
        {children}
    </Layout>
);

export default PaddingLayout;