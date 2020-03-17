import React from 'react';
import { Link } from 'gatsby';
import { Button } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useTransitionIntoDOM } from '../../../services/useTransitionIntoDOM';

interface TutorialContentProps {
    tutorialTitle: string;
    nextTutorialLink?: string;
    nextTutorialTitle?: string;
}

const TutorialCongrats = ({ tutorialTitle, nextTutorialTitle, nextTutorialLink }: TutorialContentProps) => {
    const mightAppear = useTransitionIntoDOM('appear');

    return (
        <div className={`upper-align-center congrats-container ${mightAppear}`}>
            {
                <>
                    <h1>Congratulations you have completed the {tutorialTitle} tutorial!</h1>
                    <Button>
                        <ArrowLeftOutlined />
                        &nbsp;
                    <Link to={'/'}>Return to tutorials</Link>
                    </Button>
                    <NextTutorialButton nextTutorialTitle={nextTutorialTitle} nextTutorialLink={nextTutorialLink} />
                </>
            }
        </div>
    );
};

const NextTutorialButton = ({ nextTutorialTitle, nextTutorialLink }) => (
    <>
        {(nextTutorialTitle && nextTutorialLink) && (
            <Button>
                <Link to={nextTutorialLink}>Go to the {nextTutorialTitle} tutorial</Link>
                &nbsp;
                    <ArrowRightOutlined />
            </Button>
        )}
    </>
);

export default TutorialCongrats;