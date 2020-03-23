import React from 'react';
import TutorialPopover from '../TutorialPopover';
import { lsCommand } from './constants';
import { isBrowser } from '../../../services/isBrowser';
import { ValidState } from '../../../models/ISSIInjectionTutorialStateMachine';

interface LsPopoverProps {
    children: JSX.Element;
    state: ValidState;
}

const LsPopover = ({ children, state }: LsPopoverProps): JSX.Element => {
    const action = `Type '${lsCommand}' and submit the form`;
    const description = '"ls" refers to a command that lists the files of a specified directory. '
        + `The specified directory, "../../", means to go back 2 directories (i.e. from the current URL "${isBrowser() && window.location}" to "${isBrowser() && window.location.origin}"). `
        + `Thus, it would list the files at directory "${isBrowser() && window.location.origin}".`;
    const isVisible = state === 'initial';

    return (
        <TutorialPopover
            action={action}
            description={description}
            isVisible={isVisible}
            alignment="rightBottom"
        >
            {children}
        </TutorialPopover>
    );
};

export default LsPopover;