import React from 'react';
import { Layout } from 'antd';

const AntDLayout = ({ children }) => (
    <Layout style={{ minHeight: "100vh" }}>
        {children}
    </Layout>
);

export default AntDLayout;