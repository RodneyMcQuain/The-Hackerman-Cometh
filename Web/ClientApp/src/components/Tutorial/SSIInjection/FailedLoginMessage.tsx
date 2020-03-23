import React from 'react';
import { getFailedLogInMessage } from './getFailedLogInMessage';
import { ValidState } from '../../../models/ISSIInjectionTutorialStateMachine';

interface FailedLoginMessageProps {
    state: ValidState;
    username: string;
}

const FailedLoginMessage = ({ state, username }: FailedLoginMessageProps): JSX.Element => (
    state === 'failedLogin'
        ? <span className="failed-login">{getFailedLogInMessage(username)}</span>
        : null
);

export default FailedLoginMessage;