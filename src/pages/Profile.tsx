import { currentUser } from '../data/mockData';
import { Mail, Book, Hash, Shield, Camera, User } from 'lucide-react';

const Profile = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-900">Student Profile</h1>
                <p className="text-surface-500">Manage your personal information and settings</p>
            </div>

            <div className="card-clean p-8 bg-white">
                <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
                    <div className="relative group">
                        <div className="h-32 w-32 rounded-full bg-surface-100 flex items-center justify-center border-4 border-surface-50 overflow-hidden">
                            {currentUser.avatar ? (
                                <img
                                    src={currentUser.avatar}
                                    alt={currentUser.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <User className="h-16 w-16 text-surface-400" />
                            )}
                        </div>
                        <button className="absolute bottom-0 right-0 rounded-full bg-primary-900 p-2 text-white shadow-md hover:bg-primary-800 transition-colors border-2 border-white">
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-6 text-center md:mt-0 md:text-left flex-1">
                        <h2 className="text-2xl font-bold text-surface-900">{currentUser.name}</h2>
                        <p className="text-surface-500 font-medium">{currentUser.course} • Semester {currentUser.semester}</p>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="flex items-center gap-3 rounded-lg border border-surface-200 bg-surface-50 p-3">
                                <div className="h-10 w-10 rounded-full bg-white border border-surface-200 flex items-center justify-center">
                                    <Mail className="h-5 w-5 text-surface-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Email Address</p>
                                    <p className="text-sm font-medium text-surface-900">{currentUser.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border border-surface-200 bg-surface-50 p-3">
                                <div className="h-10 w-10 rounded-full bg-white border border-surface-200 flex items-center justify-center">
                                    <Hash className="h-5 w-5 text-surface-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Student ID</p>
                                    <p className="text-sm font-medium text-surface-900">{currentUser.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="card-clean p-6 bg-white">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center">
                            <Book className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-lg text-surface-900">Academic Overview</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-surface-100 last:border-0">
                            <span className="text-sm text-surface-600">Current CGPA</span>
                            <span className="font-bold text-surface-900 bg-surface-100 px-2 py-1 rounded">3.8</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-surface-100 last:border-0">
                            <span className="text-sm text-surface-600">Credits Completed</span>
                            <span className="font-bold text-surface-900">86 / 120</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-surface-100 last:border-0">
                            <span className="text-sm text-surface-600">Attendance</span>
                            <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded">92%</span>
                        </div>
                    </div>
                </div>

                <div className="card-clean p-6 bg-white">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-lg bg-surface-100 text-surface-600 flex items-center justify-center">
                            <Shield className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-lg text-surface-900">Account Settings</h3>
                    </div>
                    <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-surface-50 text-sm font-medium text-surface-700 transition-colors border border-transparent hover:border-surface-200 flex justify-between items-center group">
                            Change Password
                            <span className="text-surface-400 group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-surface-50 text-sm font-medium text-surface-700 transition-colors border border-transparent hover:border-surface-200 flex justify-between items-center group">
                            Notification Preferences
                            <span className="text-surface-400 group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-surface-50 text-sm font-medium text-surface-700 transition-colors border border-transparent hover:border-surface-200 flex justify-between items-center group">
                            Privacy Settings
                            <span className="text-surface-400 group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
