'use client';

import { useEffect } from 'react';

const Interview = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log('Component Did Mount'); // called once
        }
    }, []);

    return <div>Hello</div>;
};

export default Interview;
