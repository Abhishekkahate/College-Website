import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import PageTransition from './PageTransition';

const Layout = () => {
    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
            <Sidebar />
            <div className="pl-72 pr-4 min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 pb-8">
                    <PageTransition>
                        <Outlet />
                    </PageTransition>
                </main>
            </div>
        </div>
    );
};

export default Layout;
