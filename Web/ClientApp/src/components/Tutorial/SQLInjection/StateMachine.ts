import { SQLIInjectionTutorialStateMachine, ValidState, ValidAction } from '../../../models/ISQLIInjectionTutorialStateMachine';

const stateMachine: SQLIInjectionTutorialStateMachine = {
    initial: {
        LOGIN: 'finish',
        FAILED_LOGIN: 'failedLogin',
        SUCCESS_USERNAME: 'passwordEntry',
    },
    passwordEntry: {
        HAS_INJECTION: 'hasInjection',
        LOGIN: 'finish',
        FAILED_LOGIN: 'failedLogin',
    },
    hasInjection: {
        LOGIN: 'finish',
        FAILED_LOGIN: 'failedLogin',
    },
    failedLogin: {
        LOGIN: 'finish',
        FAILED_LOGIN: 'failedLogin',
    },
    finish: {},
};

export const transitionState = (
    state: ValidState,
    action: ValidAction,
    setState: (ValidState) => void
): void => {
    const nextState: ValidState = stateMachine[state][action];

    if (!nextState)
        throw "Invalid State";

    setState(nextState);
}