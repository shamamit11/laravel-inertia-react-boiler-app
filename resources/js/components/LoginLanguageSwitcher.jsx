import React from 'react';
import { router } from "@inertiajs/react";
import { Button, Space } from 'antd';

const LoginLanguageSwitcher = ({ currentLocale }) => {

    const changeLocale = (newLocale) => {
        router.visit(`/change-locale/${newLocale}`, {
            onSuccess: () => {
                window.location.reload();
            },
        });
    };

    return (
        <div>
            <Space size={"small"}>
                <Button shape="round" size="middle" style={{ fontSize: 12, fontWeight: 700, color: "white", background: "orange", borderColor: "orange" }} onClick={() => changeLocale('en')} disabled={currentLocale === 'en'}>
                    English
                </Button>
                <Button shape="round" size="middle" style={{ fontSize: 12, fontWeight: 700, color: "white", background: "orange", borderColor: "orange" }} onClick={() => changeLocale('ar')} disabled={currentLocale === 'ar'}>
                    عربي
                </Button>
            </Space>
        </div>
    );
};

export default LoginLanguageSwitcher;
