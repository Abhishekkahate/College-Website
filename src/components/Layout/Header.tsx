import { Bell, Search, Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <header className="sticky top-0 z-40 bg-surface-50/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-surface-200/50 lg:bg-transparent lg:border-none lg:backdrop-blur-none">
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-white rounded-lg text-surface-600 transition-colors"
                >
                    <Menu className="h-6 w-6" />
                </button>

                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
                    <input
                        type="text"
                        placeholder="Search for anything..."
                        className="h-10 w-full rounded-lg bg-white border border-surface-200 pl-10 pr-4 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="relative rounded-lg p-2 text-surface-500 hover:bg-white hover:text-primary-900 transition-all">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                <div className="h-8 w-[1px] bg-surface-200 mx-2 hidden sm:block"></div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-surface-900">Academic Year</p>
                        <p className="text-xs text-primary-600 font-medium">2024-2025</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
