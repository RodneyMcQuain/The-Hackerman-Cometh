import React from 'react';
import { getFailedLogInMessage } from './getFailedLogInMessage';

interface FailedLoginMessageProps {
    currentState: string;
    username: string;
    failureState: string;
}

const FailedLoginMessage = ({ currentState, username, failureState }: FailedLoginMessageProps): JSX.Element => (
    currentState === failureState
        ? <span className="failed-login">{getFailedLogInMessage(username)}</span>
        : null
);

export default FailedLoginMessage;