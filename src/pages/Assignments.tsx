import { useData } from '../context/DataContext';
import { CheckCircle, Clock, AlertCircle, Download, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';

const Assignments = () => {
    const { assignments } = useData();

    // Group assignments by courseName
    const groupedAssignments = assignments.reduce((acc, assignment) => {
        if (!acc[assignment.courseName]) {
            acc[assignment.courseName] = [];
        }
        acc[assignment.courseName].push(assignment);
        return acc;
    }, {} as Record<string, typeof assignments>);

    return (
        <PageTransition>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assignments</h1>
                    <p className="text-gray-500 dark:text-gray-400">Track your upcoming deadlines and grades</p>
                </div>

                <div className="space-y-8">
                    {Object.entries(groupedAssignments).map(([courseName, courseAssignments], groupIndex) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: groupIndex * 0.1 }}
                            key={courseName}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-primary-100 p-2 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                                    <BookOpen className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{courseName}</h2>
                            </div>

                            <div className="grid gap-4">
                                {courseAssignments.map((assignment, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (groupIndex * 0.1) + (index * 0.05) }}
                                        key={assignment.id}
                                        className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md md:flex-row md:items-center md:justify-between dark:bg-surface-900 dark:border dark:border-white/10"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={clsx(
                                                'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
                                                assignment.status === 'Submitted' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                                                    assignment.status === 'Pending' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                                                        'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                            )}>
                                                {assignment.status === 'Submitted' ? <CheckCircle className="h-6 w-6" /> :
                                                    assignment.status === 'Pending' ? <Clock className="h-6 w-6" /> :
                                                        <AlertCircle className="h-6 w-6" />}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{assignment.title}</h3>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{assignment.description}</p>
                                                <div className="mt-3 flex flex-wrap items-center gap-4">
                                                    <div className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        <span className="uppercase">Due:</span>
                                                        <span className="text-gray-900 dark:text-white">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                                                    </div>
                                                    {assignment.grade && (
                                                        <div className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                                                            <span className="uppercase">Grade:</span>
                                                            <span className="font-bold text-green-600 dark:text-green-400">{assignment.grade}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 border-t border-gray-100 pt-4 md:border-0 md:pt-0 dark:border-white/10">
                                            <button
                                                onClick={() => alert('Downloading questions PDF...')}
                                                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
                                            >
                                                <Download className="h-4 w-4" />
                                                Questions PDF
                                            </button>
                                            <div className={clsx(
                                                'rounded-full px-3 py-1 text-xs font-bold',
                                                assignment.status === 'Submitted' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                            )}>
                                                {assignment.status}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Assignments;
