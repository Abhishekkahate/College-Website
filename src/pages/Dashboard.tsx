import { motion } from 'framer-motion';
import {
    Clock,
    Calendar,
    AlertCircle,
    FileText,
    GraduationCap,
    MapPin,
    Bell
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const {
        notices,
        notes,
        exams
    } = useData();

    // Mock upcoming classes
    const upcomingClasses = [
        { id: 1, name: 'Data Structures', time: '10:00 AM', room: '301', type: 'Lecture' },
        { id: 2, name: 'Database Systems', time: '11:30 AM', room: 'Lab 2', type: 'Lab' },
    ];

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
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* Welcome Banner */}
            <motion.div
                variants={item}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-accent-600 p-8 text-white shadow-lg shadow-primary-500/25"
            >
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Student'}!</h1>
                    <p className="text-primary-100 max-w-xl">
                        You have {upcomingClasses.length} classes scheduled for today.
                        Your next exam is in {exams.length > 0 ? '5 days' : 'a while'}.
                    </p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform origin-bottom-right" />
                <div className="absolute right-10 bottom-0 opacity-20">
                    <GraduationCap className="h-48 w-48" />
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Upcoming Classes */}
                    <motion.div variants={item} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-surface-900 dark:text-white">Today's Schedule</h2>
                            <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">View All</button>
                        </div>
                        <div className="grid gap-4">
                            {upcomingClasses.map((cls) => (
                                <div key={cls.id} className="glass-card p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 flex items-center justify-center">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-surface-900 dark:text-white">{cls.name}</h3>
                                            <p className="text-sm text-surface-500 dark:text-surface-400">{cls.time} • {cls.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm font-medium">{cls.room}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Notes */}
                    <motion.div variants={item} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-surface-900 dark:text-white">Recent Notes</h2>
                            <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">View All</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {notes.slice(0, 2).map((note) => (
                                <div key={note.id} className="glass-card p-4 hover:border-primary-500/50 transition-colors cursor-pointer group">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-2 rounded-lg bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400 group-hover:bg-accent-600 group-hover:text-white transition-colors">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <span className="text-xs font-medium text-surface-400">{note.date}</span>
                                    </div>
                                    <h3 className="font-bold text-surface-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">{note.title}</h3>
                                    <p className="text-xs text-surface-500 dark:text-surface-400">{note.courseName}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>

                {/* Right Column */}
                <div className="space-y-8">

                    {/* Notices */}
                    <motion.div variants={item} className="glass-card p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-surface-900 dark:text-white">Notices</h2>
                            <Bell className="h-5 w-5 text-surface-400" />
                        </div>
                        <div className="space-y-4">
                            {notices.slice(0, 3).map((notice) => (
                                <div key={notice.id} className="pb-4 border-b border-surface-100 dark:border-white/5 last:border-0 last:pb-0">
                                    <div className="flex items-start gap-3">
                                        <div className="h-2 w-2 mt-2 rounded-full bg-red-500 shrink-0" />
                                        <div>
                                            <h4 className="text-sm font-semibold text-surface-900 dark:text-white hover:text-primary-600 cursor-pointer transition-colors">
                                                {notice.title}
                                            </h4>
                                            <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">{notice.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-2 text-sm font-medium text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors">
                            View All Notices
                        </button>
                    </motion.div>

                    {/* Upcoming Exams */}
                    <motion.div variants={item} className="glass-card p-6 bg-gradient-to-br from-surface-900 to-surface-800 text-white border-none">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="h-6 w-6 text-accent-400" />
                            <h2 className="text-lg font-bold">Upcoming Exam</h2>
                        </div>
                        {exams.length > 0 ? (
                            <div>
                                <h3 className="text-2xl font-bold mb-1">{exams[0].courseName}</h3>
                                <p className="text-surface-300 text-sm mb-4">Final Exam</p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-surface-300">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(exams[0].date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-surface-300">
                                        <Clock className="h-4 w-4" />
                                        <span>{exams[0].time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-surface-300">
                                        <MapPin className="h-4 w-4" />
                                        <span>{exams[0].room}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-surface-300">No upcoming exams.</p>
                        )}
                    </motion.div>

                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
