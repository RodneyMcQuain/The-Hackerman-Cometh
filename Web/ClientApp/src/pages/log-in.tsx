import React, { useState } from 'react';
import { IUser } from '../models/IUser';
import { navigate, Link } from 'gatsby';
import PaddingLayout from '../components/Layout/PaddingLayout';
import { Form, Input, Button } from 'antd';
import { IToken } from '../models/IToken';
import { Token } from '../services/token';
import { LoadingOutlined } from '@ant-design/icons';
import SEO from '../components/seo.js';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
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
            offset: 8,
        },
    },
};

const Login = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<number>();

    return (
        
        <PaddingLayout>
            <Form
                form={form}
                className="user-form"
                name="login"
                onFinish={userInfo => attemptLogin(userInfo, setIsLoading, setServerError)}
            >
                <Form.Item {...tailFormItemLayout} className="margin-bottom-0">
                    <h1>Log in</h1>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="username"
                    label="User Name or E-mail"
                    className="sign-up-field"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a username!'
                        },
                    ]}
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
                        }
                    ]}
                >

                    <Input.Password />
                </Form.Item>

                <Form.Item className="margin-bottom-5px" {...tailFormItemLayout}>
                    <LoginButton isLoading={isLoading} />
                </Form.Item>

                <ErrorMessage statusCode={serverError} />

                <Form.Item {...tailFormItemLayout}>
                    <SignUpCTA />
                </Form.Item>
            </Form>
        </PaddingLayout>
    );
};

const ErrorMessage = ({ statusCode }) => {
    let message;

    if (statusCode === 401)
        message = "Those credentials are invalid";

    if (statusCode === 404)
        message = "That username or email does not exist";

    if (statusCode === 500)
        message = "Sorry, there was an unexpected error. Please try again later.";

    return message
        ? (
            <Form.Item className="margin-bottom-5px" {...tailFormItemLayout}>
                <div className="red-text">{message}</div>
            </Form.Item>
        )
        : null;
}

function attemptLogin(user: IUser, setIsLoading: (boolean) => void, setServerError: (number) => void) {
    setIsLoading(true);

    fetch(`api/User/Login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(response => {
            setServerError(response.status);
            if (response.status !== 200)
                throw '';
            return response;
        })
        .then(response => response.json() as Promise<IToken>)
        .then(token => {
            Token.setToken(token);
            setIsLoading(false);

            if (Token.isUserAuthenticated())
                navigate('/');
        })
        .catch(() => { setIsLoading(false); });
}

interface LogInButtonProps {
    isLoading: boolean;
}

const LoginButton = ({ isLoading }: LogInButtonProps) => (
    <Button type="primary" htmlType="submit">
        Log in {isLoading && <LoadingOutlined />}
    </Button>
);

const SignUpCTA = () => <div>Don't have an account?&nbsp;<Link to="sign-up">Sign Up</Link></div>

export default Login;