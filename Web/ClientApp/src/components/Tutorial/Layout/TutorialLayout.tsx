import React, { useState } from 'react';
import Layout from '../../Layout/layout';
import { Layout as AntDLayout, Button, } from 'antd';
import '../../../styles/tutorial/layout.scss';
import TutorialCongrats from './TutorialCongrats';

const { Sider } = AntDLayout;

interface TutorialLayoutProps {
    SiderContent: JSX.Element;
    children: JSX.Element;
    isCompleted: boolean;
    tutorialTitle: string;
    nextTutorialTitle?: string;
    nextTutorialLink?: string;
}

const TutorialLayout = ({ SiderContent, children, isCompleted, tutorialTitle, nextTutorialTitle, nextTutorialLink }: TutorialLayoutProps) => {
    const [hasReadSidebar, setHasReadSidebar] = useState<boolean>(false);

    return (
        <Layout>
            <AntDLayout style={{ minHeight: "100vh" }}>
                {!isCompleted
                    ? (
                        <>
                            <TutorialSider SiderContent={SiderContent} />
                            <div className="tutorial-content-container">
                                <PracticeButton hasReadSidebar={hasReadSidebar} setHasReadSidebar={setHasReadSidebar} />
                                <TutorialContent hasReadSidebar={hasReadSidebar} content={children} />
                            </div>
                        </>
                    )
                    : (
                        <TutorialCongrats
                            tutorialTitle={tutorialTitle}
                            nextTutorialTitle={nextTutorialTitle}
                            nextTutorialLink={nextTutorialLink}
                        />
                    )
                }
            </AntDLayout>
        </Layout>
    );
};

interface TutorialSiderProps {
    SiderContent: JSX.Element;
}

const TutorialSider = ({ SiderContent }: TutorialSiderProps) => (
    <Sider collapsible breakpoint="md">
        <div className="tutorial-sidebar">
            <h1>Objective</h1>
            {SiderContent}
        </div>
    </Sider>
);

interface PracticeButtonProps {
    hasReadSidebar: boolean;
    setHasReadSidebar: (boolean) => void;
}

const PracticeButton = ({ hasReadSidebar, setHasReadSidebar }: PracticeButtonProps) => (
    <div className={`fade-container ${hasReadSidebar ? 'hide' : ''}`}>
        <Button
            type="primary"
            size="large"
            onClick={() => setHasReadSidebar(true)}
            className="practice-button upper-align-center minor-pulse"
        >
            Practice
        </Button>
    </div>
);

interface TutorialContentProps {
    content: JSX.Element;
    hasReadSidebar: boolean;
}

const TutorialContent = ({ content, hasReadSidebar }: TutorialContentProps) => (
    <div className={`tutorial-content ${hasReadSidebar ? 'appear' : ''}`}>
        {content}
    </div>
)

export default TutorialLayout;