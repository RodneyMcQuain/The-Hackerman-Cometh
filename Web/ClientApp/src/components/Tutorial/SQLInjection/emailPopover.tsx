import React from 'react';
import TutorialPopover from '../TutorialPopover';
import { adminUsername } from './constants';

interface EmailPopoverProps {
    children: JSX.Element;
    isVisible: boolean;
}

const EmailPopover = ({ children, isVisible }: EmailPopoverProps): JSX.Element => {
    const action = `Type '${adminUsername}' here`;
    const description = 'It is better to secure the username of the admin of the website so you don’t SQL inject twice, which lowers success rates!'

    return (
        <TutorialPopover
            action={action}
            description={description}
            isVisible={isVisible}
            alignment="rightTop"
        >
            {children}
        </TutorialPopover>
    );
};

export default EmailPopover;