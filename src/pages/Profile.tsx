import { currentUser } from '../data/mockData';
import { Mail, Book, Hash, Shield, Camera } from 'lucide-react';

const Profile = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>

            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
                    <div className="relative group">
                        <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="h-32 w-32 rounded-full object-cover ring-4 ring-gray-50"
                        />
                        <button className="absolute bottom-0 right-0 rounded-full bg-primary-600 p-2 text-white shadow-md hover:bg-primary-700 transition-colors">
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-6 text-center md:mt-0 md:text-left flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
                        <p className="text-gray-500">{currentUser.course} • Semester {currentUser.semester}</p>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Email Address</p>
                                    <p className="text-sm font-medium text-gray-900">{currentUser.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <Hash className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Student ID</p>
                                    <p className="text-sm font-medium text-gray-900">{currentUser.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Book className="h-5 w-5 text-primary-600" />
                        <h3 className="font-bold text-gray-900">Academic Overview</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Current CGPA</span>
                            <span className="font-bold text-gray-900">3.8</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Credits Completed</span>
                            <span className="font-bold text-gray-900">86 / 120</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Attendance</span>
                            <span className="font-bold text-green-600">92%</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="h-5 w-5 text-primary-600" />
                        <h3 className="font-bold text-gray-900">Account Settings</h3>
                    </div>
                    <div className="space-y-3">
                        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                            Change Password
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                            Notification Preferences
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                            Privacy Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
