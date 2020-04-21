export interface SQLIInjectionTutorialStateMachine {
    initial: InitialActions;
    failedLogin: AlwaysPosssibleActions;
    passwordEntry: PasswordEntryActions;
    hasInjection: AlwaysPosssibleActions;
    finish: {};
}

export type ValidState = keyof SQLIInjectionTutorialStateMachine; 

export type ValidAction = keyof AlwaysPosssibleActions | keyof InitialActions | keyof PasswordEntryActions;

interface AlwaysPosssibleActions {
    LOGIN: string;
    FAILED_LOGIN: string;
}

interface InitialActions extends AlwaysPosssibleActions {
    SUCCESS_USERNAME: string;
}

interface PasswordEntryActions extends AlwaysPosssibleActions {
    HAS_INJECTION: string;
}