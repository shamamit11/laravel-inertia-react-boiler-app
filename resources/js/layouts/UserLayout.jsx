import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import { Col, Layout, Menu, Row, Typography, Space, Dropdown, Avatar, Button } from 'antd';
import { Link, usePage } from '@inertiajs/react';
import UserNavComponent from '@/components/UserNavComponent';

import "./layout.scss";
import Logo from "/public/images/light-logo.png";

const { Header, Sider, Content, Footer } = Layout;

const UserLayout = ({ children }) => {
    const { auth, lang } = usePage().props;
    const userNavItems = UserNavComponent();

    const initial = JSON.parse(localStorage.getItem('sidebarCollapsed')) || false;
    const [collapsed, setCollapsed] = useState(initial);

    const toggleCollapse = () => {
        const updated = !collapsed;
        setCollapsed(updated)
        localStorage.setItem('sidebarCollapsed', JSON.stringify(updated))
    };

    const items = [
        {
            key: 'logout',
            label: (
                <Link href='/logout' method='post' as='div'>
                    {lang.common.logout}
                </Link>
            ),
            icon: <LogoutOutlined />,
        },
    ];

    return (
        <Layout className="app-layout">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    overflow: 'auto',
                }}
            >

                <div className="sidebar-logo">
                    <img src={Logo} />
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[route().current()]}
                    items={userNavItems}
                />

            </Sider>

            <Layout>
                <Header className='app-header'>
                    <Row justify='space-between'>
                        <Col>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => toggleCollapse()}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Col>
                        <Col>
                            <Dropdown menu={{ items }} trigger={['click']} placement="bottom" arrow>
                                <div>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Typography.Text className='auth-dropdown'>
                                            <Space size={12}>
                                                {!auth.user_image && (
                                                    <Avatar size={36} icon={<UserOutlined />} />
                                                )}
                                                {auth.user_image && (
                                                    <Avatar size={36} src={auth.user_image} />
                                                )}
                                                <div>
                                                    <div>
                                                        <Typography.Text strong>{auth.user.first_name} {auth.user.last_name}</Typography.Text>
                                                    </div>
                                                    <div>{auth.user.email}</div>
                                                </div>
                                                <CaretDownOutlined />
                                            </Space>
                                        </Typography.Text>
                                    </a>
                                </div>
                            </Dropdown>
                        </Col>

                    </Row>
                </Header>

                <Content className="main-content-layout">
                    {children}
                </Content>

                <Footer className="app-footer">
                    <div>Laravel-React-Inertia Boiler App © 2023. Powered By: <a href="https://webdesigndubai.co" target="_blank" rel="noopener noreferrer">Web Design Dubai</a></div>
                    <div>App Version: 1.0.0</div>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default UserLayout;