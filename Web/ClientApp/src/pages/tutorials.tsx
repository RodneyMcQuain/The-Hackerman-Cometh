import * as React from 'react'
import { Link } from 'gatsby'
import { Card, Col, Row, Button } from 'antd' 
import { Layout as AntDLayout } from '../components/Layout/layout'
import Banner from '../components/Index/Banner'
import { tutorials } from '../data/tutorials'

interface Tutorial {
    name: string,
    description: string,
    link: string
}


const Tutorials = () => (
    <AntDLayout>
        <Row gutter={16} justify="center">
            {tutorials.map(tutorial => (
                <Col span={8} flex="auto">
                    <Card title={tutorial.name} bordered={false}>
                        <span>{tutorial.description}</span>
                        <br />
                        <Button type="primary">
                            <Link to={tutorial.link} >
                                Start
                            </Link>
                        </Button>
                       
                    </Card>
                </Col>
            ))};
        </Row>
    </AntDLayout>
);
export default Tutorials;