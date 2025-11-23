import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle, BookOpen } from 'lucide-react';
import clsx from 'clsx';

const Exams = () => {
    // Mock exams data
    const exams = [
        {
            id: 1,
            subject: 'Data Structures',
            code: 'CS301',
            date: '2024-04-10',
            time: '10:00 AM - 01:00 PM',
            room: 'Hall A',
            type: 'Mid Term',
            status: 'Upcoming',
            syllabus: 'Units 1, 2, 3'
        },
        {
            id: 2,
            subject: 'Database Systems',
            code: 'CS302',
            date: '2024-04-12',
            time: '02:00 PM - 05:00 PM',
            room: 'Hall B',
            type: 'Mid Term',
            status: 'Upcoming',
            syllabus: 'Units 1, 2'
        },
        {
            id: 3,
            subject: 'Linear Algebra',
            code: 'MA301',
            date: '2024-04-15',
            time: '10:00 AM - 01:00 PM',
            room: 'Hall C',
            type: 'Mid Term',
            status: 'Upcoming',
            syllabus: 'All Units'
        },
        {
            id: 4,
            subject: 'Web Development',
            code: 'CS303',
            date: '2024-03-15',
            time: '10:00 AM - 01:00 PM',
            room: 'Lab 1',
            type: 'Practical',
            status: 'Completed',
            syllabus: 'HTML, CSS, JS'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold neon-text">Exams</h1>
                    <p className="text-surface-500 dark:text-surface-400">View your exam schedule and syllabus</p>
                </div>
                <div className="glass-panel px-4 py-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary-500" />
                    <span className="text-sm font-medium text-surface-600 dark:text-surface-300">Next Exam in 5 days</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {exams.map((exam, index) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        key={exam.id}
                        className="group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-surface-900 border border-surface-200 dark:border-white/10 hover:shadow-lg transition-all"
                    >
                        {/* Left Side - Date & Time */}
                        <div className={clsx(
                            "flex flex-col items-center justify-center p-6 sm:w-40 text-white relative overflow-hidden",
                            exam.status === 'Completed' ? "bg-surface-500" : "bg-gradient-to-br from-primary-600 to-primary-800"
                        )}>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="text-3xl font-bold">{new Date(exam.date).getDate()}</div>
                            <div className="text-sm font-medium uppercase tracking-wider opacity-90">{new Date(exam.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                            <div className="mt-2 text-xs opacity-75">{new Date(exam.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>

                            {exam.status === 'Completed' && (
                                <div className="mt-3 px-2 py-1 rounded bg-black/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3" /> Done
                                </div>
                            )}
                        </div>

                        {/* Right Side - Details */}
                        <div className="flex-1 p-6 flex flex-col justify-between relative">
                            {/* Dashed Line Separator */}
                            <div className="absolute left-0 top-4 bottom-4 w-[1px] border-l-2 border-dashed border-surface-200 dark:border-white/10 hidden sm:block"></div>
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-surface-50 dark:bg-surface-950 hidden sm:block"></div>

                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-surface-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                            {exam.subject}
                                        </h3>
                                        <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{exam.code} • {exam.type}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400">
                                        <BookOpen className="h-5 w-5" />
                                    </div>
                                </div>

                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-300">
                                        <Clock className="h-4 w-4 text-primary-500" />
                                        <span>{exam.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-300">
                                        <MapPin className="h-4 w-4 text-primary-500" />
                                        <span>{exam.room}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-surface-100 dark:border-white/5">
                                <p className="text-xs text-surface-500 dark:text-surface-400">
                                    <span className="font-semibold text-surface-700 dark:text-surface-200">Syllabus:</span> {exam.syllabus}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Exams;
