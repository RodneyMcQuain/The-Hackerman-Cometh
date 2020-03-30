import * as React from 'react';
import { IUser } from '../models/IUser';
import { formatDate } from '../services/formatDate';
import { handleResponse } from '../services/handleResponse';
import { navigate } from 'gatsby';
import PaddingLayout from '../components/Layout/PaddingLayout';
import { Form, Input, Button, } from 'antd';
import SEO from '../components/seo.js';

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
interface Props {
    data: {
        site: {
            siteMetadata: {
                title: string
            }
        }
    }
}
const RegistrationForm = () => {
    const [form] = Form.useForm();

    return (
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
                    label="User Name"
                    className="sign-up-field"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a username!'
                        },
                        {
                            whitespace: true,
                            message: 'User name cannot be whitespace!'
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
                            message: 'Please input your E-mail!',
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
                            message: 'Please input password!',
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
    user.email = user.email.trim();
    user.username = user.username.trim();
    const today = new Date().toString();
    user.dateCreated = formatDate(today);

    return user;
}

function validateUserName(userName) {
    if (userName?.trim() === "")
        return Promise.reject();

    return fetch(`api/User/CheckUsername/${userName}`)
        .then(response => handleResponse(navigate, response))
        .then(response => {
            if (response.status === 400)
                return Promise.reject('User-Name is already in use!');
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
                return Promise.reject('Email is already in use!');
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

    if (password.length <= 8)
        message += ' atleast 8 characters,\n';

    if (message !== "")
        return Promise.reject("Passwords must contain: " + message);
    else
        return Promise.resolve();
}

function verifyPassword(password, passwordValidationString) {

    if (!password || passwordValidationString === password) {
        return Promise.resolve();
    }

    return Promise.reject('The two passwords that you entered do not match!');
}


export default RegistrationForm;