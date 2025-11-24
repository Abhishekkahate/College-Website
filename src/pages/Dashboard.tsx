import { motion } from 'framer-motion';
import {
    Clock,
    Calendar,
    AlertCircle,
    FileText,
    MapPin,
    Bell,
    ArrowRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const {
        notices,
        notes,
        exams,
        courses
    } = useData();

    // Get today's day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];

    // Derive upcoming classes from courses
    const upcomingClasses = courses.flatMap(course =>
        course.schedule
            .filter(s => s.day === today)
            .map(s => ({
                id: `${course.id}-${s.day}-${s.time}`,
                name: course.name,
                time: s.time,
                room: s.room,
                type: 'Lecture' // Assuming lecture for now, could be added to schema
            }))
    ).sort((a, b) => a.time.localeCompare(b.time));

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
                className="relative overflow-hidden rounded-2xl bg-white border border-surface-200 p-8 shadow-sm"
            >
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold text-surface-900 mb-2">Welcome back, {user?.name || 'Student'}!</h1>
                    <p className="text-surface-500 max-w-xl">
                        You have {upcomingClasses.length} classes scheduled for today.
                        Your next exam is in {exams.length > 0 ? '5 days' : 'a while'}.
                    </p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-primary-50 skew-x-12 transform origin-bottom-right opacity-50" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Upcoming Classes */}
                    <motion.div variants={item} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-surface-900">Today's Schedule</h2>
                            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</button>
                        </div>
                        <div className="grid gap-4">
                            {upcomingClasses.map((cls) => (
                                <div key={cls.id} className="card-clean p-4 flex items-center justify-between hover:border-primary-200 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-surface-900">{cls.name}</h3>
                                            <p className="text-sm text-surface-500">{cls.time} • {cls.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-surface-500 bg-surface-50 px-3 py-1 rounded-full border border-surface-100">
                                        <MapPin className="h-3.5 w-3.5" />
                                        <span className="text-xs font-medium">{cls.room}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Notes */}
                    <motion.div variants={item} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-surface-900">Recent Notes</h2>
                            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {notes.slice(0, 2).map((note) => (
                                <div key={note.id} className="card-clean p-5 hover:border-primary-300 transition-all cursor-pointer group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-2 rounded-lg bg-accent-50 text-accent-600 group-hover:bg-accent-100 transition-colors">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <span className="text-xs font-medium text-surface-400 bg-surface-50 px-2 py-1 rounded-md">{note.date}</span>
                                    </div>
                                    <h3 className="font-semibold text-surface-900 mb-1 group-hover:text-primary-700 transition-colors line-clamp-1">{note.title}</h3>
                                    <p className="text-xs text-surface-500 mb-4">{note.courseName}</p>
                                    <div className="flex items-center text-primary-600 text-xs font-medium group-hover:translate-x-1 transition-transform">
                                        Read Note <ArrowRight className="h-3 w-3 ml-1" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>

                {/* Right Column */}
                <div className="space-y-8">

                    {/* Notices */}
                    <motion.div variants={item} className="card-clean p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-surface-900">Notices</h2>
                            <Bell className="h-5 w-5 text-surface-400" />
                        </div>
                        <div className="space-y-4">
                            {notices.slice(0, 3).map((notice) => (
                                <div key={notice.id} className="pb-4 border-b border-surface-100 last:border-0 last:pb-0">
                                    <div className="flex items-start gap-3">
                                        <div className="h-2 w-2 mt-2 rounded-full bg-red-500 shrink-0" />
                                        <div>
                                            <h4 className="text-sm font-semibold text-surface-900 hover:text-primary-600 cursor-pointer transition-colors">
                                                {notice.title}
                                            </h4>
                                            <p className="text-xs text-surface-500 mt-1">{notice.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-2 text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors border-t border-surface-100 mt-2 pt-4">
                            View All Notices
                        </button>
                    </motion.div>

                    {/* Upcoming Exams */}
                    <motion.div variants={item} className="card-clean p-6 bg-surface-900 text-white border-none">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <AlertCircle className="h-5 w-5 text-accent-300" />
                            </div>
                            <h2 className="text-lg font-bold">Upcoming Exam</h2>
                        </div>
                        {exams.length > 0 ? (
                            <div>
                                <h3 className="text-xl font-bold mb-1">{exams[0].courseName}</h3>
                                <p className="text-surface-300 text-sm mb-6">Final Exam</p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-surface-300 bg-white/5 p-3 rounded-lg">
                                        <Calendar className="h-4 w-4 text-accent-300" />
                                        <span>{new Date(exams[0].date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-surface-300 bg-white/5 p-3 rounded-lg">
                                        <Clock className="h-4 w-4 text-accent-300" />
                                        <span>{exams[0].time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-surface-300 bg-white/5 p-3 rounded-lg">
                                        <MapPin className="h-4 w-4 text-accent-300" />
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
