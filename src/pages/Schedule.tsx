import { courses } from '../data/mockData';
import clsx from 'clsx';

const Schedule = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    const today = new Date();
    const currentDayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const currentHour = today.getHours();

    // Logic for holidays
    const isSecondOrFourthSaturday = () => {
        if (today.getDay() !== 6) return false;
        const dayOfMonth = today.getDate();
        const weekOfMonth = Math.ceil(dayOfMonth / 7);
        return weekOfMonth === 2 || weekOfMonth === 4;
    };

    const fixedHolidays = [
        '2024-01-26', // Republic Day
        '2024-08-15', // Independence Day
import React from 'react';
    import { motion } from 'framer-motion';
    import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
    import clsx from 'clsx';

    const Schedule = () => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

        // Mock schedule data
        const scheduleData: Record<string, any[]> = {
            Monday: [
                { id: 1, name: 'Data Structures', time: '10:00 AM', duration: 1, room: '301', type: 'Lecture', color: 'primary' },
                { id: 2, name: 'Database Lab', time: '02:00 PM', duration: 2, room: 'Lab 2', type: 'Lab', color: 'accent' },
            ],
            Tuesday: [
                { id: 3, name: 'Linear Algebra', time: '09:00 AM', duration: 1, room: '204', type: 'Lecture', color: 'secondary' },
                { id: 4, name: 'Web Development', time: '11:00 AM', duration: 1, room: 'Lab 1', type: 'Lecture', color: 'primary' },
            ],
            Wednesday: [
                { id: 5, name: 'Data Structures', time: '10:00 AM', duration: 1, room: '301', type: 'Lecture', color: 'primary' },
                { id: 6, name: 'Soft Skills', time: '03:00 PM', duration: 1, room: 'Auditorium', type: 'Workshop', color: 'accent' },
            ],
            Thursday: [
                { id: 7, name: 'Database Systems', time: '11:00 AM', duration: 1, room: '205', type: 'Lecture', color: 'secondary' },
                { id: 8, name: 'Linear Algebra', time: '01:00 PM', duration: 1, room: '204', type: 'Lecture', color: 'secondary' },
            ],
            Friday: [
                { id: 9, name: 'Web Dev Lab', time: '09:00 AM', duration: 3, room: 'Lab 1', type: 'Lab', color: 'primary' },
            ],
            Saturday: []
        };

        const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const currentHour = new Date().getHours();

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold neon-text">Weekly Schedule</h1>
                        <p className="text-surface-500 dark:text-surface-400">Manage your classes and labs</p>
                    </div>
                    <div className="glass-panel px-4 py-2 flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium">
                        <CalendarIcon className="h-5 w-5" />
                        {currentDay}
                    </div>
                </div>

                <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <div className="min-w-[1000px] p-6">
                            {/* Header Row */}
                            <div className="grid grid-cols-7 gap-4 mb-4">
                                <div className="col-span-1 font-bold text-surface-400 uppercase text-xs tracking-wider">Time</div>
                                {days.map(day => (
                                    <div key={day} className={clsx(
                                        "col-span-1 font-bold text-center uppercase text-xs tracking-wider py-2 rounded-lg",
                                        day === currentDay ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" : "text-surface-400"
                                    )}>
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Time Slots */}
                            <div className="space-y-4">
                                {times.map((time, timeIndex) => (
                                    <div key={time} className="grid grid-cols-7 gap-4 group">
                                        {/* Time Column */}
                                        <div className="col-span-1 flex items-center text-sm font-medium text-surface-500 dark:text-surface-400 relative">
                                            {time}
                                            <div className="absolute left-20 right-[-1000px] h-[1px] bg-surface-200 dark:bg-white/5 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/30 transition-colors" />
                                        </div>

                                        {/* Days Columns */}
                                        {days.map(day => {
                                            const classItem = scheduleData[day]?.find(c => c.time === time);

                                            return (
                                                <div key={`${day}-${time}`} className="col-span-1 min-h-[80px] relative">
                                                    {classItem && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            whileHover={{ scale: 1.05, zIndex: 10 }}
                                                            className={clsx(
                                                                "absolute inset-0 m-1 p-3 rounded-xl border backdrop-blur-md shadow-sm transition-all cursor-pointer",
                                                                classItem.color === 'primary' && "bg-primary-50/80 border-primary-200 dark:bg-primary-900/20 dark:border-primary-500/30",
                                                                classItem.color === 'accent' && "bg-accent-50/80 border-accent-200 dark:bg-accent-900/20 dark:border-accent-500/30",
                                                                classItem.color === 'secondary' && "bg-secondary-50/80 border-secondary-200 dark:bg-secondary-900/20 dark:border-secondary-500/30",
                                                            )}
                                                            style={{
                                                                height: `calc(${classItem.duration * 100}% + ${(classItem.duration - 1) * 16}px)`
                                                            }}
                                                        >
                                                            <p className={clsx(
                                                                "text-xs font-bold line-clamp-2",
                                                                classItem.color === 'primary' && "text-primary-700 dark:text-primary-300",
                                                                classItem.color === 'accent' && "text-accent-700 dark:text-accent-300",
                                                                classItem.color === 'secondary' && "text-secondary-700 dark:text-secondary-300",
                                                            )}>
                                                                {classItem.name}
                                                            </p>
                                                            <div className="mt-1 flex items-center gap-1 text-[10px] opacity-80">
                                                                <MapPin className="h-3 w-3" />
                                                                {classItem.room}
                                                            </div>
                                                            <div className="mt-1 inline-block px-1.5 py-0.5 rounded text-[10px] bg-white/50 dark:bg-black/20 font-medium">
                                                                {classItem.type}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    export default Schedule;
