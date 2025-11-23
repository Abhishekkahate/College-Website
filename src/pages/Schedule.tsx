import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';
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
            { id: 3, name: 'Linear Algebra', time: '09:00 AM', duration: 1, room: '204', type: 'Lecture', color: 'primary' },
            { id: 4, name: 'Web Development', time: '11:00 AM', duration: 1, room: 'Lab 1', type: 'Lab', color: 'accent' },
        ],
        Wednesday: [
            { id: 5, name: 'Data Structures', time: '10:00 AM', duration: 1, room: '301', type: 'Lecture', color: 'primary' },
            { id: 6, name: 'Database Systems', time: '01:00 PM', duration: 1, room: '205', type: 'Lecture', color: 'primary' },
        ],
        Thursday: [
            { id: 7, name: 'Linear Algebra', time: '09:00 AM', duration: 1, room: '204', type: 'Lecture', color: 'primary' },
            { id: 8, name: 'Web Development', time: '11:00 AM', duration: 1, room: 'Lab 1', type: 'Lab', color: 'accent' },
        ],
        Friday: [
            { id: 9, name: 'Database Systems', time: '10:00 AM', duration: 1, room: '205', type: 'Lecture', color: 'primary' },
            { id: 10, name: 'Soft Skills', time: '02:00 PM', duration: 1, room: 'Sem Hall', type: 'Workshop', color: 'green' },
        ],
        Saturday: []
    };

    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    // Logic for holidays (2nd and 4th Saturday)
    const isHoliday = (day: string) => {
        if (day !== 'Saturday') return false;
        const today = new Date();
        const dayOfMonth = today.getDate();
        const weekOfMonth = Math.ceil(dayOfMonth / 7);
        return weekOfMonth === 2 || weekOfMonth === 4;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Weekly Schedule</h1>
                    <p className="text-surface-500">Manage your classes and labs</p>
                </div>
                <div className="bg-white border border-surface-200 rounded-lg px-4 py-2 flex items-center gap-2 text-primary-700 font-medium shadow-sm">
                    <CalendarIcon className="h-5 w-5" />
                    {currentDay}
                </div>
            </div>

            <div className="card-clean overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <div className="min-w-[1000px] p-6">
                        {/* Header Row */}
                        <div className="grid grid-cols-7 gap-4 mb-4">
                            <div className="col-span-1 font-bold text-surface-400 uppercase text-xs tracking-wider">Time</div>
                            {days.map(day => (
                                <div key={day} className={clsx(
                                    "col-span-1 font-bold text-center uppercase text-xs tracking-wider py-2 rounded-lg",
                                    day === currentDay ? "bg-primary-900 text-white shadow-sm" : "text-surface-400"
                                )}>
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Time Slots */}
                        <div className="space-y-4">
                            {times.map((time) => (
                                <div key={time} className="grid grid-cols-7 gap-4">
                                    {/* Time Column */}
                                    <div className="col-span-1 text-sm font-medium text-surface-500 py-4">
                                        {time}
                                    </div>

                                    {/* Days Columns */}
                                    {days.map((day) => {
                                        const classItem = scheduleData[day]?.find(c => c.time === time);
                                        const isDayHoliday = isHoliday(day);

                                        return (
                                            <div key={`${day}-${time}`} className="col-span-1 relative min-h-[80px]">
                                                {isDayHoliday && time === '09:00 AM' ? (
                                                    <div className="absolute inset-0 h-[600px] bg-surface-50 rounded-xl flex items-center justify-center border-2 border-dashed border-surface-200 z-10">
                                                        <span className="transform -rotate-90 text-surface-400 font-bold tracking-widest uppercase">Holiday</span>
                                                    </div>
                                                ) : classItem ? (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className={clsx(
                                                            "h-full p-3 rounded-lg border transition-all hover:shadow-md cursor-pointer",
                                                            classItem.color === 'primary' ? "bg-primary-50 border-primary-100 hover:border-primary-200" :
                                                                classItem.color === 'accent' ? "bg-accent-50 border-accent-100 hover:border-accent-200" :
                                                                    "bg-green-50 border-green-100 hover:border-green-200"
                                                        )}
                                                    >
                                                        <h4 className={clsx(
                                                            "font-semibold text-sm mb-1",
                                                            classItem.color === 'primary' ? "text-primary-900" :
                                                                classItem.color === 'accent' ? "text-accent-900" :
                                                                    "text-green-900"
                                                        )}>
                                                            {classItem.name}
                                                        </h4>
                                                        <div className="flex items-center gap-1 text-xs opacity-80 text-surface-600">
                                                            <MapPin className="h-3 w-3" />
                                                            <span>{classItem.room}</span>
                                                        </div>
                                                        <div className="mt-2 text-xs font-medium px-2 py-0.5 rounded-md bg-white/60 w-fit border border-black/5">
                                                            {classItem.type}
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <div className="h-full rounded-lg border border-dashed border-surface-100 bg-surface-50/30 hover:bg-surface-50 transition-colors" />
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
