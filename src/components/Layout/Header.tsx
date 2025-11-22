import { Bell, Search, Menu } from 'lucide-react';
import { currentUser } from '../../data/mockData';

const Header = () => {
    return (
        <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-white/50 backdrop-blur-xl px-8 transition-all duration-300">
            <div className="flex items-center gap-4">
                <button className="mr-2 rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden">
                    <Menu className="h-6 w-6" />
                </button>
                <div className="relative hidden md:block group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search courses, exams..."
                        className="h-10 w-80 rounded-xl border-none bg-white/50 pl-10 pr-4 text-sm shadow-sm ring-1 ring-gray-200 transition-all hover:bg-white hover:shadow-md focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative rounded-full p-2 text-gray-500 hover:bg-white hover:text-primary-600 hover:shadow-md transition-all duration-300">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-200/50">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                        <p className="text-xs font-medium text-primary-600">{currentUser.course}</p>
                    </div>
                    <div className="relative group cursor-pointer">
                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-75 blur transition duration-200 group-hover:opacity-100"></div>
                        <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="relative h-10 w-10 rounded-full object-cover ring-2 ring-white"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
