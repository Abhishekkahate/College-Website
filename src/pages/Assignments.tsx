import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, CheckCircle, Clock, AlertCircle, Download, Upload } from 'lucide-react';
import clsx from 'clsx';

const Assignments = () => {
    // Mock assignments data
    const assignments = [
        {
            id: 1,
            title: 'Data Structures Implementation',
            course: 'Data Structures',
            dueDate: '2024-03-25',
            status: 'Pending',
            description: 'Implement AVL Tree and Red-Black Tree with insertion and deletion operations.',
            priority: 'High'
        },
        {
            id: 2,
            title: 'Database Schema Design',
            course: 'Database Systems',
            dueDate: '2024-03-28',
            status: 'Submitted',
            description: 'Design a normalized database schema for a library management system.',
            priority: 'Medium'
        },
        {
            id: 3,
            title: 'Linear Algebra Problem Set',
            course: 'Linear Algebra',
            dueDate: '2024-03-30',
            status: 'Pending',
            description: 'Solve problems 1-10 from Chapter 4 regarding vector spaces.',
            priority: 'Medium'
        },
        {
            id: 4,
            title: 'Web Portfolio Project',
            course: 'Web Development',
            dueDate: '2024-04-05',
            status: 'Pending',
            description: 'Create a personal portfolio website using React and Tailwind CSS.',
            priority: 'Low'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Submitted': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Pending': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
            case 'Overdue': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-surface-800 dark:text-gray-400';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'text-red-500';
            case 'Medium': return 'text-orange-500';
            case 'Low': return 'text-blue-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold neon-text">Assignments</h1>
                    <p className="text-surface-500 dark:text-surface-400">Track and submit your coursework</p>
                </div>
                <div className="flex gap-3">
                    <div className="glass-panel px-4 py-2 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-sm font-medium text-surface-600 dark:text-surface-300">3 Pending</span>
                    </div>
                    <div className="glass-panel px-4 py-2 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm font-medium text-surface-600 dark:text-surface-300">1 Submitted</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assignments.map((assignment, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={assignment.id}
                        className="glass-card p-6 card-hover group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FileText className="h-24 w-24 transform rotate-12" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <span className={clsx(
                                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                    getStatusColor(assignment.status)
                                )}>
                                    {assignment.status}
                                </span>
                                <div className="flex items-center gap-1 text-xs font-medium">
                                    <AlertCircle className={clsx("h-3 w-3", getPriorityColor(assignment.priority))} />
                                    <span className={clsx(getPriorityColor(assignment.priority))}>{assignment.priority} Priority</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {assignment.title}
                            </h3>
                            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">
                                {assignment.course}
                            </p>
                            <p className="text-sm text-surface-500 dark:text-surface-400 mb-6 line-clamp-2">
                                {assignment.description}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-surface-100 dark:border-white/5">
                                <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
                                    <Calendar className="h-4 w-4" />
                                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                </div>

                                {assignment.status === 'Pending' ? (
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
                                        <Upload className="h-4 w-4" />
                                        Submit
                                    </button>
                                ) : (
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-100 text-surface-600 text-sm font-medium hover:bg-surface-200 transition-colors dark:bg-surface-800 dark:text-surface-300">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        View Submission
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Assignments;
