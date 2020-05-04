import * as React from 'react';
import { IUser } from '../models/IUser';
import { formatDate } from '../services/formatDate';
import { handleResponse } from '../services/handleResponse';
import { navigate } from 'gatsby';
import PaddingLayout from '../components/Layout/PaddingLayout';
import { Form, Input, Button, } from 'antd';
import HiddenPublicRoute from '../components/HiddenPublicRoute';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
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
            offset: 6,
        },
    },
};

const RegistrationForm = () => {
    const [form] = Form.useForm();

    return (
        <HiddenPublicRoute>
            <PaddingLayout>
                <Form
                    form={form}
                    className="user-form"
                    name="register"
                    onFinish={userInfo => saveUserInfo(userInfo)}
                >
                    <Form.Item {...tailFormItemLayout} className="margin-bottom-0">
                        <h1>Sign Up</h1>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="username"
                        label="Username"
                        className="sign-up-field"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a username!'
                            },
                            {
                                whitespace: true,
                                message: 'Username cannot be whitespace!'
                            },
                            () => ({
                                validator(_rule, value) {
                                    return validateUserName(value);
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'Email is invalid!',
                            },
                            {
                                required: true,
                                message: 'Please input an E-mail!',
                            },
                            () => ({
                                validator(_rule, value) {
                                    return validateEmail(value);
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input a password!',
                            },
                            () => ({
                                validator(_rule, value) {
                                    return validatePasswordRequirments(value);
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_rule, value) {
                                    const password = getFieldValue('password');
                                    return verifyPassword(value, password);
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </PaddingLayout>
        </HiddenPublicRoute>
    );
};

function saveUserInfo(userInfo) {
    const userInfoForPost = modifyUserBeforePost(userInfo);

    fetch(`api/User/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfoForPost)
    })
        .then(response => handleResponse(navigate, response))
        .then(() => {
            navigate('/log-in');
        });

}

function modifyUserBeforePost(user: IUser): IUser {
    let updatedUser = { ...user };
    updatedUser.email = user.email.trim();
    updatedUser.username = user.username.trim();
    const today = new Date().toString();
    updatedUser.dateCreated = formatDate(today);

    return updatedUser;
}

function validateUserName(userName) {
    if (userName?.trim() === "")
        return Promise.reject();

    return fetch(`api/User/CheckUsername/${userName}`)
        .then(response => handleResponse(navigate, response))
        .then(response => {
            if (response.status === 400)
                return Promise.reject('Username is already in use! Please select a different one.');
            else
                return Promise.resolve();
        });
}

function validateEmail(email) {
    if (email?.trim() === "")
        return Promise.reject();

    return fetch(`api/User/CheckEmail/${email}`)
        .then(response => {
            if (response.status === 400)
                return Promise.reject('E-mail is already in use! Please select a different one.');
            else
                return Promise.resolve();
        });
}

function validatePasswordRequirments(password) {
    let message = "";

    if (password.search('[A-Z]') === -1)
        message += 'an upper-case character,\n';

    if (password.search('[a-z]') === -1)
        message += ' a lower-case character,\n';

    if (password.search('[0-9]') === -1)
        message += ' a number\n';

    if (password.search('[?!@#$%^&*]') === -1)
        message += ' one of the following special characters \'?!@#$%^&*\',\n';

    if (password.length < 8)
        message += ' at least 8 characters,\n';

    if (message !== "")
        return Promise.reject("Passwords must contain: " + message);
    else
        return Promise.resolve();
}

function verifyPassword(password, passwordValidationString) {
    if (!password || passwordValidationString === password) 
        return Promise.resolve();

    return Promise.reject('The password confirmation does not match the password you entered!');
}


export default RegistrationForm;