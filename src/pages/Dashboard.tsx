
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useData } from '../context/DataContext';
import { currentUser, exams, notes, mockLostItems, mockEvents } from '../data/mockData';
import { BookOpen, Clock, Calendar, MapPin, FileText, AlertCircle } from 'lucide-react';
import PageTransition from '../components/Layout/PageTransition';

const Dashboard = () => {
    const { courses, notices } = useData();

    // Helper to get upcoming exam
    const upcomingExam = exams.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    // Helper to get recent notes
    const recentNotes = notes.slice(0, 3);

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

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Ongoing and Upcoming Class */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ongoing & Upcoming Classes</h2>
                                <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">View Schedule</button>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                {courses.length > 0 && courses[0].schedule.slice(0, 2).map((class_, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        key={index}
                                        className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-surface-900 dark:border dark:border-white/10"
                                    >
                                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-primary-50 transition-transform group-hover:scale-150 dark:bg-primary-900/20"></div>
                                        <div className="relative">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="rounded-lg bg-primary-100 p-2 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                                                    <Clock className="h-6 w-6" />
                                                </div>
                                                {index === 0 && (
                                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                        Ongoing
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{courses[0].name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{class_.time}</p>
                                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <MapPin className="h-4 w-4" />
                                                <span>{class_.room} • {courses[0].professor}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Recent Notices */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Notices</h2>
                                <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">View All</button>
                            </div>
                            <div className="space-y-4">
                                {notices.slice(0, 3).map((notice, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        key={notice.id}
                                        className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-surface-900 dark:border dark:border-white/10"
                                    >
                                        <div className={clsx(
                                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                                            notice.priority === 'High' ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                                                notice.priority === 'Medium' ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" :
                                                    "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                        )}>
                                            <AlertCircle className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-bold text-gray-900 dark:text-white">{notice.title}</h3>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(notice.date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{notice.content}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Recent Notes Uploaded */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Notes</h2>
                                <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">View All</button>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                {recentNotes.map((note, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        key={note.id}
                                        className="group rounded-xl border border-gray-200 bg-white p-4 hover:border-primary-500 transition-all dark:bg-surface-900 dark:border-white/10"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="rounded-lg bg-gray-100 p-2 dark:bg-surface-800">
                                                <FileText className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                            </div>
                                            <span className="text-xs font-medium text-gray-400">{note.type}</span>
                                        </div>
                                        <h3 className="mt-3 font-bold text-gray-900 dark:text-white line-clamp-1">{note.title}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{note.courseName}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">

                        {/* Upcoming Exam */}
                        {upcomingExam && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Exam</h2>
                                <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-6 text-white shadow-lg shadow-indigo-500/20">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                            <BookOpen className="h-6 w-6 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-indigo-100">{upcomingExam.duration}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold">{upcomingExam.courseName}</h3>
                                    <p className="text-indigo-100">{upcomingExam.courseId}</p>

                                    <div className="mt-6 space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-indigo-100">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date(upcomingExam.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-indigo-100">
                                            <Clock className="h-4 w-4" />
                                            <span>{upcomingExam.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-indigo-100">
                                            <MapPin className="h-4 w-4" />
                                            <span>{upcomingExam.room}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Upcoming Events */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Events</h2>
                            </div>
                            <div className="space-y-4">
                                {mockEvents.slice(0, 2).map((event) => (
                                    <div key={event.id} className="flex gap-4 rounded-xl bg-white p-3 shadow-sm dark:bg-surface-900 dark:border dark:border-white/10">
                                        <img src={event.image} alt={event.title} className="h-16 w-16 rounded-lg object-cover" />
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{event.title}</h4>
                                            <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">{new Date(event.date).toLocaleDateString()}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{event.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recently Lost or Found */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lost & Found</h2>
                            </div>
                            <div className="space-y-4">
                                {mockLostItems.slice(0, 2).map((item) => (
                                    <div key={item.id} className="rounded-xl border border-gray-100 bg-white p-4 dark:bg-surface-900 dark:border-white/10">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={clsx(
                                                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                                item.status === 'Lost' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                                    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            )}>
                                                {item.status}
                                            </span>
                                            <span className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</span>
                                        </div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{item.location}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Dashboard;
