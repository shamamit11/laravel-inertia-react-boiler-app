import {
    DashboardOutlined,
    UserOutlined,
} 
from '@ant-design/icons';
import { Link, usePage } from '@inertiajs/react';

const UserNavComponent = () => {
    const { lang } = usePage().props;

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const userNavItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: <Link href='/dashboard'>{lang.common.dashboard}</Link>,
        },
    
        getItem(lang.common.customer_management, 'customermanagement', null, [], 'group'),
    
        {
            key: 'customer',
            icon: <UserOutlined />,
            label: <Link href='/customer'>{lang.common.customers}</Link>,
        }
    ];

    return userNavItems;
}

export default UserNavComponent;