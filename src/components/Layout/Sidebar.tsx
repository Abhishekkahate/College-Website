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
    HelpCircle,
    X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
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

    const sidebarContent = (
        <div className="flex flex-col h-full bg-white border-r border-surface-200">
            <div className="p-6 flex items-center justify-between border-b border-surface-100">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary-900 flex items-center justify-center shadow-sm">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-surface-900">CampusSync</h1>
                        <p className="text-xs text-surface-500">Student Portal</p>
                    </div>
                </div>
                <button onClick={onClose} className="lg:hidden p-2 text-surface-500 hover:bg-surface-100 rounded-lg">
                    <X className="h-5 w-5" />
                </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                <div className="mb-2 px-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">Menu</div>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => window.innerWidth < 1024 && onClose()}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                                isActive
                                    ? 'bg-primary-50 text-primary-900 font-medium'
                                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                            )
                        }
                    >
                        <item.icon className={clsx("h-5 w-5 transition-colors", "text-current")} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}

                <div className="mt-8 mb-2 px-4 text-xs font-semibold text-surface-400 uppercase tracking-wider">System</div>
                {bottomNavItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => window.innerWidth < 1024 && onClose()}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                                isActive
                                    ? 'bg-primary-50 text-primary-900 font-medium'
                                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                            )
                        }
                    >
                        <item.icon className="h-5 w-5 text-current" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-surface-100 bg-surface-50/50">
                <div className="flex items-center gap-3 mb-4 p-2 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-surface-200 flex items-center justify-center overflow-hidden">
                        <User className="h-5 w-5 text-surface-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-surface-900 truncate">{user?.name || 'Student'}</p>
                        <p className="text-xs text-surface-500 truncate">{user?.email || 'student@college.edu'}</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white border border-surface-200 px-4 py-2.5 text-sm font-medium text-surface-600 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-100"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-72 z-50">
                {sidebarContent}
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-72 z-50 lg:hidden shadow-2xl"
                        >
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
