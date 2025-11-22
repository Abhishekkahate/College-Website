
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useData } from '../context/DataContext';
import { currentUser, mockNotifications as notifications } from '../data/mockData';
import { BookOpen, Clock, Bell, TrendingUp, Calendar } from 'lucide-react';
import PageTransition from '../components/Layout/PageTransition';

const Dashboard = () => {
    const { courses, notices } = useData();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <PageTransition>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Welcome back, {currentUser.name.split(' ')[0]}! 👋
                        </h1>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">Here's what's happening today.</p>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                >
                    <motion.div variants={item} className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg shadow-blue-500/20 transition-transform hover:scale-[1.02]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100">Current GPA</p>
                                <h3 className="mt-1 text-3xl font-bold">3.8</h3>
                            </div>
                            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-sm text-blue-100">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs font-bold">+0.2</span>
                            <span>from last semester</span>
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg shadow-purple-500/20 transition-transform hover:scale-[1.02]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100">Attendance</p>
                                <h3 className="mt-1 text-3xl font-bold">92%</h3>
                            </div>
                            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                <Clock className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 h-1.5 w-full rounded-full bg-black/20">
                            <div className="h-full w-[92%] rounded-full bg-white" />
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg shadow-orange-500/20 transition-transform hover:scale-[1.02]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100">Assignments</p>
                                <h3 className="mt-1 text-3xl font-bold">4</h3>
                            </div>
                            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-sm text-orange-100">
                            <span className="font-bold text-white">2</span> due this week
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg shadow-green-500/20 transition-transform hover:scale-[1.02]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100">Next Exam</p>
                                <h3 className="mt-1 text-xl font-bold">Data Structures</h3>
                            </div>
                            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                <Calendar className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-green-100">
                            In 5 days • 10:00 AM
                        </div>
                    </motion.div>
                </motion.div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Today's Schedule</h2>
                            <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">View Full Schedule</button>
                        </div>
                        <div className="space-y-4">
                            {courses.length > 0 && courses[0].schedule.map((class_, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    key={index}
                                    className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-surface-900 dark:border dark:border-white/10"
                                >
                                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                                        <span className="text-xs font-bold uppercase">{class_.time.split(' ')[1]}</span>
                                        <span className="text-lg font-bold">{class_.time.split(':')[0]}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white">{courses[0].name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{class_.room} • {courses[0].professor}</p>
                                    </div>
                                    <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        Ongoing
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notices</h2>
                            <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">View All</button>
                        </div>
                        <div className="space-y-4">
                            {notices.map((notice, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    key={notice.id}
                                    className="relative rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-surface-900 dark:border dark:border-white/10"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={clsx(
                                            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                            notice.priority === 'High' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                                notice.priority === 'Medium' ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                                                    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                        )}>
                                            {notice.priority}
                                        </span>
                                        <span className="text-xs text-gray-400">{new Date(notice.date).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{notice.title}</h3>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{notice.content}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                            <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-surface-800">
                                <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {notifications.map((notification, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    key={notification.id}
                                    className="relative rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-surface-900 dark:border dark:border-white/10"
                                >
                                    {!notification.read && (
                                        <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-red-500" />
                                    )}
                                    <h3 className="font-bold text-gray-900 dark:text-white">{notification.title}</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{notification.message}</p>
                                    <p className="mt-3 text-xs font-medium text-gray-400">{new Date(notification.date).toLocaleDateString()}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Dashboard;
