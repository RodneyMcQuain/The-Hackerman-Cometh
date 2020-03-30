import React from 'react';
import Layout from '../components/Layout/layout';
import Banner from '../components/Index/Banner';
import SEO from '../components/seo.js';
const IndexPage = () => {
    return (
        <SEO
            title="Hackerman Arrives"
            description="Save our website!!"
        />

        <Layout>
            <Banner />
        </Layout>
    );
};

export default IndexPage;
