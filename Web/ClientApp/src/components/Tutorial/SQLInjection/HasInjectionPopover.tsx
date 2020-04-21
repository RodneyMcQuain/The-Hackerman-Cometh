import React from 'react';
import { ValidState } from '../../../models/ISQLInjectionTutorialStateMachine';
import TutorialPopover from '../TutorialPopover';

interface HasInjectionPopoverProps {
    children: JSX.Element;
    state: ValidState;
}

const HasInjectionPopover = ({ children, state }: HasInjectionPopoverProps) => {
    const action = `Submit the form`;
    const description = "You have the injection in place, you're almost in!";

    return (
        <TutorialPopover
            action={action}
            description={description}
            isVisible={state === 'hasInjection'}
        >
            {children}
        </TutorialPopover>
    );
};

export default HasInjectionPopover;