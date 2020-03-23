import React from 'react';
import { isBrowser } from '../../../services/isBrowser';
import TutorialPopover from '../TutorialPopover';
import { ssiLocalStorageKey, passwordsFilename } from './constants';
import { getFailedLogInMessage } from './getFailedLogInMessage';
import { ValidState } from '../../../models/ISSIInjectionTutorialStateMachine';

interface SSITextProps {
    state: ValidState;
}

const SSIText = ({ state }: SSITextProps): JSX.Element => {
    if (state === 'displaySSI') {
        isBrowser() && localStorage.setItem(ssiLocalStorageKey, 'true');
        return (
            <SSITextPopover>
                <div className="ssi-text">
                    {getFailedLogInMessage("passwords.txt asdkfhasldjf.html alsdjfllkjlk.html ljskldjfllksdjf.html")}
                </div>
            </SSITextPopover>
        );
    }

    return null;
};

interface SSITextPopoverProps {
    children: JSX.Element;
}

const SSITextPopover = ({ children }: SSITextPopoverProps): JSX.Element => {
    const passwordsTxtUrl = `${window.location.origin}/${passwordsFilename}`;
    const action = `Navigate to "${passwordsTxtUrl}"`;
    const description = `The "ls" command was executed and returned a directory structure as a result of the injection, exposing a very secret ${passwordsFilename} file.`;

    return (
        <TutorialPopover
            action={action}
            description={description}
        >
            {children}
        </TutorialPopover>
    );
};

export default SSIText;