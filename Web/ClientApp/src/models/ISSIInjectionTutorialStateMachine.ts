export interface ISSIInjectionTutorialStateMachine {
    initial: AlwaysPosssibleActions;
    displaySSI: DisplaySSITransitions;
    knowsCredentials: AlwaysPosssibleActions;
    failedLogin: AlwaysPosssibleActions;
    finish: {};
}

export type ValidState = keyof ISSIInjectionTutorialStateMachine; 

export type ValidAction = keyof AlwaysPosssibleActions | keyof DisplaySSITransitions;

interface AlwaysPosssibleActions extends LoginActions {
    HAS_LS_COMMAND: string;
}

interface DisplaySSITransitions extends LoginActions {
    NAVIGATES_TO_PASSWORDS: string;
}

interface LoginActions {
    LOGIN: string;
    FAILED_LOGIN: string;
}
