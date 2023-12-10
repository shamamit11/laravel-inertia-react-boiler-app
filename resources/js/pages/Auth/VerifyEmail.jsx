import React from 'react';
import { Head, useForm, Link, router, usePage } from "@inertiajs/react";
import { Button, Divider, Form, message, Alert } from "antd";

import Logo from "/public/images/light-logo.png";

const VerifyEmail = ({ status }) => {
    const { lang } = usePage().props;
    const { post, processing } = useForm();

    const submit = () => {
        post('/email/verification-notification', {
            onSuccess: () => {
                message.success(lang.common.verification_link_sent)
            },
            onFinish: () => {
                router.get(`/login`)
            }
        });
    };

    return (
        <div className="login-page" id="loginPage">
            <Head title={lang.common.email_verification} />

            <div className="login-form">
                <div className="login-form-header">
                    <img src={Logo} />
                </div>

                <Form
                    name="emailverification"
                    layout="vertical"
                    onFinish={submit}
                    autoComplete="off"
                >

                    <div className='login-text-holder'>
                        <h1>{lang.common.email_verification}</h1>
                        <p>{lang.common.email_verify_text}</p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <Alert
                            style={{ marginTop: 10, marginBottom: 10 }}
                            message={lang.common.verification_link_sent}
                            type='success'
                        />
                    )}

                    <Form.Item className="form-actions">
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={processing} block>
                            {processing ? lang.common.please_wait : lang.common.resend_link}
                        </Button>
                    </Form.Item>

                    <div className="form-register">
                        <Divider>{lang.common.or_text}</Divider>
                        <Link href='/logout' method="post">{lang.common.logout}</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default VerifyEmail;