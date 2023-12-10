import React from 'react';
import { Head, usePage } from '@inertiajs/react';

const Test = () => {
    const props = usePage().props;
    console.log(props);

    return (
        <>
            <Head title='Test Page'/>
            <h1>This is test component</h1>
        </>
        
    )
}

export default Test