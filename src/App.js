import React, { useState, useEffect } from 'react';
import LoadingPage from './pages/LoadingPage.jsx';
import ReservationCodePage from './pages/ReservationCodePage.jsx';

export default function App() {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }

    return <ReservationCodePage />;
}
