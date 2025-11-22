import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, BookOpen, FileText, User, LogOut, GraduationCap, Moon, Sun, Search } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Calendar, label: 'Schedule', path: '/schedule' },
        { icon: FileText, label: 'Assignments', path: '/assignments' },
        { icon: User, label: 'Faculty', path: '/faculty' },
        { icon: Calendar, label: 'Events', path: '/events' },
        { icon: Search, label: 'Lost & Found', path: '/lost-found' },
        { icon: BookOpen, label: 'Exams', path: '/exams' },
        { icon: FileText, label: 'Notes', path: '/notes' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-glass transition-transform">
            <div className="flex h-full flex-col">
                <div className="flex h-20 items-center gap-3 px-8 border-b border-gray-100/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30">
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                        UniLife
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }: { isActive: boolean }) =>
                                        clsx(
                                            'relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 overflow-hidden group',
                                            isActive
                                                ? 'text-primary-600 shadow-sm bg-primary-50'
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        )
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {isActive && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-primary-600" />
                                            )}
                                            <item.icon className={clsx("h-5 w-5 transition-colors", isActive ? "text-primary-600" : "text-gray-400 group-hover:text-gray-600")} />
                                            <span className="relative z-10">{item.label}</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-4">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-5 text-white shadow-lg shadow-primary-500/25">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
                        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-black/10 blur-xl" />

                        <div className="relative z-10">
                            <p className="text-xs font-medium text-primary-100 uppercase tracking-wider">Next Class</p>
                            <p className="mt-1 text-lg font-bold">Computer Science</p>
                            <div className="mt-3 flex items-center gap-2 text-xs text-primary-100 bg-white/10 w-fit px-2 py-1 rounded-lg backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                10:00 AM • Room 301
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="mt-4 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors group"
                    >
                        <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        Sign Out
                    </button>

                    <button
                        onClick={toggleTheme}
                        className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-surface-800 dark:text-gray-400 hover:text-gray-900 transition-colors group"
                    >
                        {theme === 'light' ? (
                            <Moon className="h-5 w-5 transition-transform group-hover:rotate-12" />
                        ) : (
                            <Sun className="h-5 w-5 transition-transform group-hover:rotate-90" />
                        )}
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
