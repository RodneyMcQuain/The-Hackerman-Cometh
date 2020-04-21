import React from 'react';

const SiderContent = (): JSX.Element => (
    <>
        <p>
            SQL injections require the manipulation of queries that will always return true with some given information, usually found on the website itself or through prior knowledge. 
        </p>
        <p>
            This example takes the admin email and turns it into a SQL query that will always return true and allow log in if the database is not secured.
            There are other queries that will yield the same result, but for this tutorial, we will only touch on the basics.
        </p>
    </>
);

export default SiderContent;