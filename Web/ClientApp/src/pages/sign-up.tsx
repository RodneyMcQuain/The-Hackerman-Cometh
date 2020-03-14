import * as React from 'react';
import { IUser } from '../models/IUser';
import { formatDate } from '../services/formatDate';
import { handleResponse } from '../services/handleResponse';
// import { Preloader } from '../Components/Preloader';
// import { PasswordValidation } from '../components/SignUp/PasswordValidation';
// import { UsernameValidationText } from '../components/SignUp/UsernameValidationText';
// import { EmailValidationText } from '../components/SignUp/EmailValidationText';
import { navigate } from 'gatsby';
import Layout from '../components/Layout/layout';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, } from 'antd';

const formItemLayout = {
    maxWidth: 200,
    labelCol: {
        xs: {
            span: 10,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const inputLayout = {
    maxWidth: 200,

};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationForm = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [serverError, setServerError] = useState();
    const onFinish = userInfo => {
        console.log(userInfo);
        const userInfoForPost = modifyUserBeforePost(userInfo);
        setIsLoading(true);


        fetch(`api/User/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfoForPost)
        })
            .then(response => handleResponse(navigate, response))
            .then(response => {
                
                // if(  >= 400){

                // }
                // else{
                setIsLoading(false);

                navigate('/log-in');
                // }
            })
            .catch(error => {
                setIsLoading(false)

                console.log(error);
            });

    };

    return (
        <Layout>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label="User Name"
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
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule) {
                                const email = getFieldValue('email');

                                return fetch(`api/User/CheckEmail/${email}`)
                                    .then(response => handleResponse(navigate, response))

                                    .then(response => {
                                        if(response.status === 400)
                                            return Promise.reject('Email is already in use!');
                                        else
                                            return Promise.resolve();
                                })

                            }
                        })
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule) {
                                const value = getFieldValue('password');

                                if (value.search('[A-Z]') === -1) {
                                    return Promise.reject('Must Contain an upper-case character!');
                                }
                                else if (value.search('[a-z]') === -1) {
                                    return Promise.reject('Must contain a lower-case Letter!');
                                }
                                else if (value.search('[0-9]') === -1) {
                                    return Promise.reject('Must contain a number!');
                                }
                                else if (value.length <= 8) {
                                    return Promise.reject('Must contain atleast 8 characters!')
                                }
                                else {
                                    return Promise.resolve();
                                }
                            }
                        })
                    ]}
                    hasFeedback
                >

                    <Input.Password />
                </Form.Item>

                <Form.Item
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
                            validator(rule, value) {
                                if (!rule) {
                                    return Promise.reject('Test');
                                }
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                </Button>
                </Form.Item>
            </Form>
        </Layout>
    );

    function modifyUserBeforePost(user: IUser): IUser {
        user.email = user.email.trim();
        user.username = user.username.trim();
        let today = new Date().toString();
        user.dateCreated = formatDate(today);

        return user;
    }
};

export default RegistrationForm;


// interface RegistrationState {
//     user: IUser;
//     passwordCheck: string;
//     isLoading: boolean;
//     isEmailNotEmpty: boolean;
//     isEmailValid: boolean;
//     isEmailDuplicate: boolean;
//     isUsernameNotEmpty: boolean;
//     isUsernameDuplicate: boolean;
//     isPasswordValid: boolean;
// }

// export class SignUp extends React.Component<{}, RegistrationState> {
//     constructor(props) {
//         super(props);

//         this.state = {
//             user: {} as IUser,
//             passwordCheck: "",
//             isLoading: false,
//             isEmailNotEmpty: false,
//             isEmailValid: false,
//             isEmailDuplicate: false,
//             isUsernameNotEmpty: false,
//             isUsernameDuplicate: false,
//             isPasswordValid: false
//         };

//         this.setArrayValidity = this.setArrayValidity.bind(this);
//         this.handleEmailChange = this.handleEmailChange.bind(this);
//         this.handlePasswordChange = this.handlePasswordChange.bind(this);
//         this.handlePasswordCheckChange = this.handlePasswordCheckChange.bind(this);
//         this.handlePasswordValidity = this.handlePasswordValidity.bind(this);
//         this.handleUsernameChange = this.handleUsernameChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     public render() {
//         const { user, passwordCheck, isLoading, isEmailNotEmpty, isEmailValid, isEmailDuplicate, isUsernameNotEmpty,
//             isUsernameDuplicate, isPasswordValid } = this.state;

//         const possibleErrors = [isEmailNotEmpty, isEmailValid, isEmailDuplicate, isUsernameNotEmpty,
//             isUsernameDuplicate, isPasswordValid];

//         const isButtonEnabled = this.isButtonEnabled(possibleErrors);
//         let registerButton = isButtonEnabled
//             ? <input type="submit" value="Sign Up" className="btn" />
//             : <input type="submit" value="Sign Up" className="btn" disabled />

//         if (isLoading)
//             return <Preloader />
//         else
//             return (
//                 <Layout>
//                     <div className="registration-container -center-container -curved-border">
//                         <h1>Sign Up</h1>

//                         <form onSubmit={this.handleSubmit} >
//                             <label>Username</label>
//                             <input type="text" name="username" className="form-control input-md" placeholder="Username" value={user.username} onChange={e => this.handleUsernameChange(e)} />
//                             <UsernameValidationText
//                                 isUsernameDuplicate={isUsernameDuplicate}
//                                 setArrayValidity={this.setArrayValidity}
//                             />

//                             <label>Email</label>
//                             <input type="text" name="email" className="form-control input-md" placeholder="Email" value={user.email} onChange={e => this.handleEmailChange(e)} />
//                             <EmailValidationText
//                                 isEmailDuplicate={isEmailDuplicate}
//                                 isEmailValid={isEmailValid}
//                                 setArrayValidity={this.setArrayValidity}
//                             />

//                             <PasswordValidation
//                                 password={user.password}
//                                 passwordCheck={passwordCheck}
//                                 handlePasswordChange={this.handlePasswordChange}
//                                 handlePasswordCheckChange={this.handlePasswordCheckChange}
//                                 handlePasswordValidity={this.handlePasswordValidity}
//                             />

//                             {registerButton}
//                         </form>
//                     </div>
//                 </Layout>
//             );
//     }

//     private setValidity(isValid: boolean): string {
//         if (isValid) return "valid";
//         else return "invalid";
//     }

//     private setArrayValidity(validityArray: boolean[]): string[] {
//         return validityArray.map(isValid => this.setValidity(isValid));
//     }

//     private isButtonEnabled(possibleErrors: boolean[]): boolean {
//         let isError = false;

//         possibleErrors.map(validationType => {
//             if (!validationType)
//                 isError = true;
//         });

//         return !isError;
//     }

//     private handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
//         const username = event.target.value;
//         const isUsernameNotEmpty = this.isNotEmpty(username);
//         const isUsernameDuplicate = this.isUsernameDuplicate(username);
//         let user = this.state.user;
//         user.username = username;

//         isUsernameDuplicate.then(isDuplicate => {
//             this.setState({
//                 user: user,
//                 isUsernameNotEmpty: isUsernameNotEmpty,
//                 isUsernameDuplicate: isDuplicate
//             });
//         });
//     }

//     private isUsernameDuplicate(username: string): Promise<boolean> {
//         return fetch(`api/User/CheckUsername/${username}`)
//             .then(response => handleResponse(navigate, response))
//             .catch(error => {
//                 console.log(error)
//                 return false;
//             });
//     }

//     private handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
//         const email = event.target.value;
//         const isEmailValid = this.isEmailValid(email);
//         const isEmailNotEmpty = this.isNotEmpty(email);
//         const isEmailDuplicate = this.isEmailDuplicate(email);
//         let user = this.state.user;
//         user.email = email;

//         isEmailDuplicate.then(isDuplicate => {
//             this.setState({
//                 user: user,
//                 isEmailNotEmpty: isEmailNotEmpty,
//                 isEmailValid: isEmailValid,
//                 isEmailDuplicate: isDuplicate
//             });
//         });
//     }

//     private isEmailValid(email: string): boolean {
//         const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//         if (email.match(emailRegex))
//             return true;
//         else
//             return false;
//     }

//     private isEmailDuplicate(email: string): Promise<boolean> {
//         return fetch(`api/User/CheckEmail/${email}`)
//             .then(response => handleResponse(navigate, response))
//             .catch(error => {
//                 console.log(error)
//                 return false;
//             });
//     }

//     private isNotEmpty(text: string): boolean {
//         return text.trim().length !== 0;
//     }

//     private handlePasswordValidity(isPasswordValid: boolean) {
//         this.setState({ isPasswordValid: isPasswordValid });
//     }

//     private handlePasswordCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
//         const passwordCheck = event.target.value;

//         this.setState({ passwordCheck: passwordCheck });
//     }

//     private handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
//         const password = event.target.value;
//         let user = this.state.user;
//         user.password = password;

//         this.setState({ user: user });
//     }

//     public handleSubmit(event: React.FormEvent<EventTarget>) {
//         event.preventDefault();
//         let user = this.state.user;
//         user = this.modifyUserBeforePost(user);

//         this.setState({ isLoading: true });

//         fetch(`api/User/`, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(user)
//         })
//             .then(response => handleResponse(navigate, response))
//             .then(() => {
//                 this.setState({ isLoading: false });

//                 navigate('/log-in');
//             })
//             .catch(error => {
//                 this.setState({ isLoading: false });

//                 console.log(error);
//             });
//     }

    // modifyUserBeforePost(user: IUser): IUser {
    //     user.email = user.email.trim();
    //     user.username = user.username.trim();
    //     let today = new Date().toString();
    //     user.dateCreated = formatDate(today);

    //     return user;
    // }
// }

// export default SignUp;
