import React, { useState } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import { FetchExampleData } from '../components/fetchExampleData'

const IndexPage = () => {
    const [thing, setThing] = useState(1);

    return (
        <Layout>
            <h1>Hi people</h1>
            <p>Welcome to your new Gatsby site.</p>
            <p>Now go build {thing}</p>
            <Link to="/page-2/">Go to page 2</Link>
            <br />
            <br />
            <FetchExampleData />
        </Layout>
    )
};

export default IndexPage
