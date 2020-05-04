import React from 'react';

const SiderContent = (): JSX.Element => (
    <>
        <p>
            Structured query language (SQL) injections often manipulate a query to always return true. 
        </p>
        <p>
            This example takes a SQL query for a login form and manipulates it so that it will return true, thus allowing a login if the system is not secured.
            There are other methods that will yield the same result, but this tutorial will only cover one option for simplicity's sake. 
            There are also systems where this exact method will not work, but others will.
        </p>
    </>
);

export default SiderContent;