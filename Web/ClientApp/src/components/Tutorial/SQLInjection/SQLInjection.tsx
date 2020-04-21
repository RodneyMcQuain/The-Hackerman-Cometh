import React, { useState } from 'react';
import TutorialLayout from '../Layout/TutorialLayout'
import { Card, Form, Input, Button } from 'antd';
import { sqlInjectionTitle } from '../tutorialTitles';

import SiderContent from './SiderContent';
import { transitionState } from './StateMachine'
import { ValidState } from '../../../models/ISQLIInjectionTutorialStateMachine'
import { adminUsername, sqlCommand } from './constants'
import FailedLoginMessage from '../FailedLoginMessage';
import EmailPopover from './EmailPopover'
import CommandPopover from './CommandPopover'
import HasInjectionPopover from './HasInjectionPopover';

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

const SQLInjection = (): JSX.Element => {
    const [username, setUsername] = useState<string>('');
    const [state, setState] = useState<ValidState>('initial');

    return (
        <TutorialLayout
            isCompleted={state === 'finish'}
            tutorialTitle={sqlInjectionTitle}
            SiderContent={SiderContent()}
        >
            <HasInjectionPopover state={state}>
                <Card title={`${sqlInjectionTitle} Tutorial`}>
                    <Form onFinish={({ username, password }) => {
                        setUsername(username);
                        handleSubmit(username, password, state, setState)
                    }}>
                        <EmailPopover isVisible={state==="initial"}>
                            <Form.Item
                                {...formItemLayout}
                                label="Username"
                                name="username"
                            >
                                <Input onChange={e => handleUsername(e.target.value, state, setState)} />
                            </Form.Item>
                        </EmailPopover>
                        <CommandPopover isVisible={state === "passwordEntry"}>
                            <Form.Item
                                {...formItemLayout}
                                {...formItemLayout}
                                label="Password"
                                name="password"
                            >
                                <Input.Password onChange={e => handlePassword(e.target.value, state, setState)} />
                            </Form.Item>
                        </CommandPopover>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                    <FailedLoginMessage currentState={state} username={username} failureState={'failedLogin'} />
                </Card>
            </HasInjectionPopover>
        </TutorialLayout>
    );
}

function handleSubmit(
    username: string,
    password: string,
    state: ValidState,
    setState: (ValidState) => void
): void {
    if (isUsername(username) && isPassword(password))
        transitionState(state, 'LOGIN', setState);
    else if (!isUsername(username) || !isPassword(password))
        transitionState(state, 'FAILED_LOGIN', setState);
}

function handleUsername(username: string, state: ValidState, setState: (ValidState) => void) {
    if (isUsername(username))
        transitionState(state, "SUCCESS_USERNAME", setState);
}

function handlePassword(password: string, state: ValidState, setState: (ValidState) => void) {
    if (isPassword(password))
        transitionState(state, "HAS_INJECTION", setState);
}

const isUsername = (text: string): boolean => text?.trim().toLowerCase() === adminUsername.toLowerCase();
const isPassword = (text: string): boolean => text?.trim().toLowerCase() === sqlCommand.toLowerCase();

export default SQLInjection;