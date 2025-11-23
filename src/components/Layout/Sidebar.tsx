import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    BookOpen,
    GraduationCap,
    FileText,
    LogOut,
    User,
    Settings,
    HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Sidebar = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Calendar, label: 'Schedule', path: '/schedule' },
        { icon: BookOpen, label: 'Assignments', path: '/assignments' },
        { icon: GraduationCap, label: 'Exams', path: '/exams' },
        { icon: FileText, label: 'Notes', path: '/notes' },
    ];

    const bottomNavItems = [
        { icon: Settings, label: 'Settings', path: '/settings' },
        { icon: HelpCircle, label: 'Help & Support', path: '/help' },
    ];

    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-4 top-4 bottom-4 w-64 glass-card flex flex-col z-50 overflow-hidden"
        >
            <div className="p-6 flex items-center gap-3 border-b border-white/20 dark:border-white/10">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold neon-text">CampusSync</h1>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Student Portal</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                <div className="mb-2 px-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">Menu</div>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden',
                                isActive
                                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium shadow-sm'
                                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-white/5 hover:text-primary-600 dark:hover:text-primary-400'
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/5 rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <item.icon className={clsx("h-5 w-5 relative z-10 transition-colors", isActive ? "text-primary-600 dark:text-primary-400" : "group-hover:text-primary-600 dark:group-hover:text-primary-400")} />
                                <span className="relative z-10">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute right-2 h-2 w-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]"
                                    />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}

                <div className="mt-8 mb-2 px-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">System</div>
                {bottomNavItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group',
                                isActive
                                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium'
                                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-white/5 hover:text-primary-600 dark:hover:text-primary-400'
                            )
                        }
                    >
                        <item.icon className="h-5 w-5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-white/20 dark:border-white/10 bg-white/30 dark:bg-black/20 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-white/50 dark:bg-white/5 border border-white/20">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 p-[2px]">
                        <div className="h-full w-full rounded-full bg-white dark:bg-surface-900 flex items-center justify-center overflow-hidden">
                            <User className="h-5 w-5 text-primary-500" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{user?.name || 'Student'}</p>
                        <p className="text-xs text-surface-500 dark:text-surface-400 truncate">{user?.email || 'student@college.edu'}</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-surface-100 px-4 py-2.5 text-sm font-medium text-surface-600 transition-all hover:bg-red-50 hover:text-red-600 dark:bg-white/5 dark:text-surface-300 dark:hover:bg-red-900/20 dark:hover:text-red-400 shadow-sm"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
