import { Bell, Search, Menu } from 'lucide-react';

import { motion } from 'framer-motion';

const Header = () => {


    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-4 z-40 mb-6 mx-6 rounded-2xl glass-card px-6 py-4 flex items-center justify-between"
        >
            <div className="flex items-center gap-4 flex-1">
                <button className="lg:hidden p-2 hover:bg-surface-100 rounded-lg dark:hover:bg-white/10">
                    <Menu className="h-6 w-6 text-surface-600 dark:text-surface-300" />
                </button>

                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
                    <input
                        type="text"
                        placeholder="Search for anything..."
                        className="h-11 w-full rounded-xl bg-surface-50/50 border border-surface-200 pl-10 pr-4 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all dark:bg-surface-900/50 dark:border-white/10 dark:text-white dark:focus:border-primary-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">


                <button className="relative rounded-xl p-2.5 text-surface-500 hover:bg-surface-100 hover:text-primary-600 transition-all dark:text-surface-400 dark:hover:bg-white/10 dark:hover:text-primary-400">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-surface-900 animate-pulse"></span>
                </button>

                <div className="h-8 w-[1px] bg-surface-200 dark:bg-white/10 mx-2 hidden sm:block"></div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-surface-900 dark:text-white">Academic Year</p>
                        <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">2024-2025</p>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
