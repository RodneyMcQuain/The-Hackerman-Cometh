import React, { useState } from 'react';
import TutorialLayout from '../Layout/TutorialLayout';
import { Card, Form, Input, Button } from 'antd';
import { ssiInjectionTitle, sqlInjectionTitle } from '../tutorialTitles';
import '../../../styles/tutorial/ssi-injection.scss';
import { isBrowser } from '../../../services/isBrowser';
import SiderContent from './SiderContent';
import { transitionState } from './StateMachine';
import { ValidState } from '../../../models/ISSIInjectionTutorialStateMachine';
import { lsCommand, ssiLocalStorageKey } from './constants';
import SSIText from './SSIText';
import KnowsCredentialsPopover from './KnowsCredentialsPopover';
import FailedLoginMessage from './FailedLoginMessage';
import LsPopover from './LsPopover';

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

const SSIInjection = (): JSX.Element => {
    const [username, setUsername] = useState<string>('');
    const [state, setState] = useState<ValidState>(getInitialState());

    return (
        <TutorialLayout
            isCompleted={state === 'finish'}
            tutorialTitle={ssiInjectionTitle}
            nextTutorialTitle={sqlInjectionTitle}
            nextTutorialLink={'/sql-injection'}
            SiderContent={SiderContent()}
        >
            <KnowsCredentialsPopover state={state}>
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
            </KnowsCredentialsPopover>
        </TutorialLayout>
    );
}

const getInitialState = (): ValidState => {
    const hasSeenSSIMessage = isBrowser() && localStorage.getItem(ssiLocalStorageKey);
    isBrowser() && localStorage.removeItem(ssiLocalStorageKey);
    return hasSeenSSIMessage ? 'knowsCredentials' : 'initial';
}

function handleSubmit(
    username: string,
    password: string,
    state: ValidState,
    setState: (ValidState) => void
): void {
    if (isUsername(username) && isPassword(password))
        transitionState(state, 'LOGIN', setState);
    else if (isLsCommand(username))
        transitionState(state, 'HAS_LS_COMMAND', setState);
    else if (!isUsername(username) || !isPassword(password))
        transitionState(state, 'FAILED_LOGIN', setState);
}

const isUsername = (text: string): boolean => text?.trim() === 'admin';
const isPassword = (text: string): boolean => text?.trim() === 'Totally-Not-Hackable-Password!';
const isLsCommand = (text: string): boolean => text?.trim() === lsCommand;

export default SSIInjection;