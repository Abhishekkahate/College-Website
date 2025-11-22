import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
    return (
        <div className="min-h-screen bg-surface-50 font-sans">
            <Sidebar />
            <div className="ml-72 flex min-h-screen flex-col transition-all duration-300">
                <Header />
                <main className="flex-1 p-8">
                    <div className="mx-auto max-w-7xl animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
