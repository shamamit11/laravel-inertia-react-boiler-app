import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import UserLayout from '@/layouts/UserLayout';

const Index = () => {
    const props = usePage().props;
    console.log(props);

    return (
        <>
            <Head title='Dashboard'/>
            <h1>This is Dashboard Page.</h1>
        </>
        
    )
}

Index.layout = page => <UserLayout children={page} />

export default Index;