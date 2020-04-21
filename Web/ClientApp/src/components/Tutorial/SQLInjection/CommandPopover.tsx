import React from 'react';
import TutorialPopover from '../TutorialPopover';
import { sqlCommand } from './constants';

interface CommandPopoverProps {
    children: JSX.Element;
    isVisible: boolean;
}

const CommandPopover = ({ children, isVisible }: CommandPopoverProps): JSX.Element => {
    const action = `Type: ${sqlCommand}`;
    const description = 'This login form runs a vulnerable SQL query to log a user in. '
        + "The query looks something like this: "
        + "SELECT * FROM users WHERE username = '<username from textbox>' AND password = '<password from textbox>'. "
        + `So, by typing "${sqlCommand}" you're closing the string for the password and adding a condition that always evaluates to true. `
        + 'Since the condition for the WHERE clause now always evaulates to true you are able to login as an admin.'

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

export default CommandPopover;