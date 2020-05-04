import * as React from 'react';
import { Link } from 'gatsby';
import { Card, Col, Row, Button } from 'antd';
import PaddingLayout from '../../components/Layout/PaddingLayout';
import AntDLayout from '../../components/Layout/AntDLayout';
import { tutorials } from '../../data/tutorials';

const Tutorials = () => (
    <AntDLayout>
        <PaddingLayout>
            <>
                <h1 className="center-text">Tutorial Selection</h1>
                <Row justify="space-around" gutter={[16, 16]}>
                    {tutorials.map(tutorial => (
                        <Col style={{ "max-width": "350px" }} key={tutorial.name} xs={24} sm={12} lg={8} xl={6}>
                            <Card title={tutorial.name}>
                                <span>{tutorial.description}</span>
                                <br />
                                <br />
                                <Button type="primary">
                                    <Link to={`${tutorial.link}`} >
                                        Start
                                    </Link>
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </>
        </PaddingLayout>
    </AntDLayout>
);

export default Tutorials;