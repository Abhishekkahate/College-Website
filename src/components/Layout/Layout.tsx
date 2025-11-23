import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import PageTransition from './PageTransition';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-surface-50">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="lg:pl-72 min-h-screen flex flex-col transition-all duration-300">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
                    <PageTransition>
                        <Outlet />
                    </PageTransition>
                </main>
            </div>
        </div>
    );
};

export default Layout;
