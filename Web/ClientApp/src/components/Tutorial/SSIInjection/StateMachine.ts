import { ISSIInjectionTutorialStateMachine, ValidState, ValidAction } from '../../../models/ISSIInjectionTutorialStateMachine';

const stateMachine: ISSIInjectionTutorialStateMachine = {
    initial: {
        HAS_LS_COMMAND: 'displaySSI',
        LOGIN: 'finish',
        FAILED_LOGIN: 'failedLogin',
    },
    displaySSI: {
        NAVIGATES_TO_PASSWORDS: 'knowsCredentials',
        LOGIN: 'finish',
        FAILED_LOGIN: 'failedLogin',
    },
    knowsCredentials: {
        HAS_LS_COMMAND: 'displaySSI',
        LOGIN: 'finish',
        FAILED_LOGIN: 'failedLogin',
    },
    failedLogin: {
        HAS_LS_COMMAND: 'displaySSI',
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