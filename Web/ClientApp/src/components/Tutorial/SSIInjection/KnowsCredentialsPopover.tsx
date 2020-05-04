import React from 'react';
import TutorialPopover from '../TutorialPopover';
import { passwordsFilename } from './constants';
import { ValidState } from '../../../models/ISSIInjectionTutorialStateMachine';

interface KnowsCredentialsPopoverProps {
    children: JSX.Element;
    state: ValidState;
}

const KnowsCredentialsPopover = ({ children, state }: KnowsCredentialsPopoverProps): JSX.Element => {
    const action = `Type the credentials you found in ${passwordsFilename} into the login form and submit the form`;
    const description = "You have the credentials you're almost in!";

    return (
        <TutorialPopover
            action={action}
            description={description}
            isVisible={state === 'knowsCredentials'}
        >
            {children}
        </TutorialPopover>
    );
}

export default KnowsCredentialsPopover;