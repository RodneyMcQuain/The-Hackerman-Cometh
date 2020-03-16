import * as React from 'react'
import { Link } from 'gatsby'
import {Layout, Card, Col, Row, Button, Form } from 'antd'

interface Tutorial {
    name: string,
    description: string,
    link: string
}

const Tutorial = [
    {
        name:"Server-Side Includes Injection",
        description: "A server side injection is a very simple hacking method, the user inputs simple Linux commands into any given text input and as a result the command is executed. Commonly used for gaining access to local file systems.",
        link:"ssi-injection",
    },
    {
        name:"Structured Query Language Injection",
        description:"An SQL (Structured Query Language) Injection is a simple cyber attack, the hacker inputs a query that will return true and in return gain access to valuable information.",
        link:"sql-injection",
    },
    {
    name:"Review SSI and SQL",
    description: "This tutoial is a review of the prior learned skills with less guidance.",
    link: "review0-Tutorial",

    }
]

const Tutorials = () => (
    <Layout>
        <Row gutter={16} justify="center">
            {Tutorial.map(Tutorial => (
                <Col span={8} flex="auto">
                    <Card title={Tutorial.name} bordered={false}>
                        <span>{Tutorial.description}</span>
                        <br></br>
                        <Button type="primary" href={Tutorial.link}>
                                Start
                        </Button>
                       
                    </Card>
                </Col>
            ))}
        </Row>
    </Layout>
);
export default Tutorials;