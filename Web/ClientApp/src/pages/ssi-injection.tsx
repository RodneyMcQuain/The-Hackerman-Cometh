import React, { useState } from 'react';
import TutorialLayout from '../components/Tutorial/Layout/TutorialLayout';
import { Card, Form, Input, Button } from 'antd';
import { ssiInjectionTitle, sqlInjectionTitle } from '../components/Tutorial/tutorialTitles';
import TutorialPopover from '../components/Tutorial/TutorialPopover';
import '../styles/tutorial/ssi-injection.scss';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 7,
        },
    },
};

const stateMachine = {
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

const ssiLocalStorageKey = 'hasSeenSSIMessage';
const lsCommand = '<!--#exec cmd="ls ../"-->';
const passwordsFilename = "passwords.txt";

const SSIInjection = () => {
    const [username, setUsername] = useState<string>('');
    const [state, setState] = useState<string>(getInitialState());

    return (
        <TutorialLayout
            isCompleted={state === 'finish'}
            tutorialTitle={ssiInjectionTitle}
            nextTutorialTitle={sqlInjectionTitle}
            nextTutorialLink={'/sql-injection'}
            SiderContent={SiderContent()}
        >
            <MightBeKnowsCredentialsPopover state={state}>
                <Card title={`${ssiInjectionTitle} Tutorial`}>
                    <Form onFinish={({ username, password }) => {
                        setUsername(username);
                        handleSubmit(username, password, state, setState)
                    }}>
                        <LsPopover state={state}>
                            <Form.Item
                                {...formItemLayout}
                                label="Username"
                                name="username"
                            >
                                <Input />
                            </Form.Item>
                        </LsPopover>
                        <Form.Item
                            {...formItemLayout}
                            label="Password"
                            name="password"
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                    <SSIText state={state} />
                    <FailedLoginMessage state={state} username={username} />
                </Card>
            </MightBeKnowsCredentialsPopover>
        </TutorialLayout>
    );
}

const getInitialState = () => {
    const hasSeenSSIMessage = typeof window !== 'undefined' && localStorage.getItem(ssiLocalStorageKey);
    typeof window !== 'undefined' && localStorage.removeItem(ssiLocalStorageKey);
    return hasSeenSSIMessage ? 'knowsCredentials' : 'initial';
}

const MightBeKnowsCredentialsPopover = ({ children, state }) => (
    state === 'knowsCredentials'
        ? <KnowsCredentialsPopover>{children}</KnowsCredentialsPopover>
        : children
);

const KnowsCredentialsPopover = ({ children }) => {
    const action = `Type the credentials you found in ${passwordsFilename} into the form`;
    const description = "You're almost in!";

    return (
        <TutorialPopover
            action={action}
            description={description}
        >
            {children}
        </TutorialPopover>
    );
}

const SSIText = ({ state }): JSX.Element => {
    if (state === 'displaySSI') {
        typeof window !== 'undefined' && localStorage.setItem(ssiLocalStorageKey, 'true');
        return (
            <SSITextPopover>
                <div className="ssi-text">
                    {getFailedLogInString("passwords.txt asdkfhasldjf.html alsdjfllkjlk.html ljskldjfllksdjf.html")}
                </div>
            </SSITextPopover>
        );
    }

    return null;
};

const SSITextPopover = ({ children }) => {
    const passwordsTxtUrl = `${window.location.origin}/${passwordsFilename}`;
    const action = `Navigate to "${passwordsTxtUrl}"`;
    const description = `The "ls" command was executed and returned a directory structure as a result of the injection, exposing a very secret ${passwordsFilename} file.`

    return (
        <TutorialPopover
            action={action}
            description={description}
        >
            {children}
        </TutorialPopover>
    );
};

const FailedLoginMessage = ({ state, username }) => (
    state === 'failedLogin'
        ? <span className="failed-login">{getFailedLogInString(username)}</span>
        : null
);

const getFailedLogInString = userName => `The password for ${userName} is incorrect!`;

const SiderContent = (): JSX.Element => (
    <>
        <p>
            Server-Side-Includes was an appealing way to share common layout components across pages of a website.
            For example, it could allow you to have a navbar and a sidebar on all of your pages, without having to duplicate your markup.
        </p>
        <p>
            If Server-Side-Includes does not have proper validation then a user can  run commands with the web server’s permissions.
        </p>
        <p>
            This tutorial is centered around getting a list of directories then getting log in information for a user from these files.
        </p>
    </>
);

const LsPopover = ({ children, state }): JSX.Element => {
    const isWindow = typeof window !== 'undefined';
    const action = `Type '${lsCommand}' and submit the form`;
    const description = '"ls" refers to a command that lists the files of a specified directory. '
        + `The specified directory, "../", means to go back 1 directory (i.e. from the current URL "${isWindow && window.location}" to "${isWindow && window.location.origin}"). `
        + `Thus, it would list the files at directory "${isWindow && window.location.origin}".`;
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

function handleSubmit(username: string, password: string, state: string, setState: (string) => void) {
    if (isUsername(username) && isPassword(password))
        transitionState(state, 'LOGIN', setState);
    else if (isLsCommand(username))
        transitionState(state, 'HAS_LS_COMMAND', setState);
    else if (!isUsername(username) || !isPassword(password))
        transitionState(state, 'FAILED_LOGIN', setState);
}

const isUsername = text => text?.trim() === 'admin';
const isPassword = text => text?.trim() === 'Totally-Not-Hackable-Password!';
const isLsCommand = text => text?.trim() === lsCommand;

function transitionState(state, action, setState): void {
    const nextState: string = stateMachine[state][action];

    if (!nextState)
        throw "Invalid State";

    setState(nextState);
}

export default SSIInjection;