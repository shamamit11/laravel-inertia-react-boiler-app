import React, { useEffect } from 'react';
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import { Button, Divider, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import Logo from '/public/images/light-logo.png';
import LoginLanguageSwitcher from '@/components/LoginLanguageSwitcher';

const Login = () => {
    const { locale, lang } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = () => {
        post('/login');
    };

    const passwordRules = [
        {
            required: true,
            message: lang.common.password_error_message_1,
        },
        {
            max: 50,
            message: lang.common.password_error_message_2,
        },
    ];

    return (
        <>
            <div className="login-page" id="loginPage">
                <Head title={lang.common.sign_in_text} />

                <div className="login-form">
                    <div className="login-form-header">
                        <img src={Logo} />
                    </div>
                    {/* <div className="language-container">
                        <LoginLanguageSwitcher currentLocale={locale} />
                    </div> */}
                    <Form
                        name="login"
                        layout='vertical'
                        initialValues={data}
                        onFieldsChange={(changedFields) => {
                            changedFields.forEach(item => {
                                setData(item.name[0], item.value);
                            })
                        }}
                        onFinish={submit}
                        autoComplete="off"
                    >
                        <div className='login-text-holder'>
                            <h1>{lang.common.sign_in_text}</h1>
                            <p>{lang.common.signin_subtitle_text}</p>
                        </div>

                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: lang.common.email_error_message_1,
                                },
                                {
                                    type: "email",
                                    message: lang.common.email_error_message_2,
                                },
                                {
                                    max: 50,
                                    message: lang.common.email_error_message_3,
                                },
                            ]}
                            validateStatus={errors.email && 'error'}
                            help={errors.email}
                        >
                            <Input
                                size="large"
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                disabled={processing}
                                placeholder={lang.common.email_placeholder}
                                autoComplete="email"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={passwordRules}
                            validateStatus={errors.password && 'error'}
                            help={errors.password}
                        >
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                disabled={processing}
                                placeholder={lang.common.password_placeholder}
                                autoComplete="current-password"
                            />
                        </Form.Item>

                        <Form.Item className="form-actions">
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={processing} block>
                                {processing ? lang.common.processing_text : lang.common.login_btn_text}
                            </Button>
                        </Form.Item>

                        <div className="form-forgot-password">
                            <Link href='/forgot-password'>{lang.common.forgot_password_text}</Link>
                        </div>

                        <div className="form-register">
                            <Divider>{lang.common.or_text}</Divider>
                            <Link href='/register'>{lang.common.create_new_account}</Link>
                        </div>
                    </Form>
                </div>


            </div>
        </>
    );
};

export default Login;