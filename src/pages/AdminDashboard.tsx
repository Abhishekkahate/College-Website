import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
    LayoutDashboard,
    Calendar,
    FileText,
    Bell,
    Trash2,
    LogOut,
    Users,
    BookOpen,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import PageTransition from '../components/Layout/PageTransition';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const {
        courses, addCourse, deleteCourse,
        exams, addExam, deleteExam,
        assignments, addAssignment, deleteAssignment,
        events, addEvent, deleteEvent,
        lostItems, addLostItem, deleteLostItem,
        notices, addNotice, deleteNotice
    } = useData();

    const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'exams' | 'assignments' | 'events' | 'lost-found' | 'notices'>('overview');

    // Form States
    const [newNotice, setNewNotice] = useState({ title: '', content: '', priority: 'Medium' });
    const [newCourse, setNewCourse] = useState({ code: '', name: '', professor: '', day: 'Monday', time: '', room: '' });
    const [newExam, setNewExam] = useState({ courseName: '', date: '', time: '', room: '', duration: '' });
    const [newAssignment, setNewAssignment] = useState({ courseName: '', title: '', description: '', dueDate: '' });
    const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', category: 'Academic', description: '' });
    const [newLostItem, setNewLostItem] = useState({ title: '', description: '', location: '', contact: '', status: 'Lost' });

    // Handlers
    const handleAddNotice = (e: React.FormEvent) => {
        e.preventDefault();
        addNotice({
            id: `n${Date.now()}`,
            title: newNotice.title,
            content: newNotice.content,
            date: new Date().toISOString().split('T')[0],
            author: user?.name || 'Admin',
            priority: newNotice.priority as 'Low' | 'Medium' | 'High'
        });
        setNewNotice({ title: '', content: '', priority: 'Medium' });
    };

    const handleAddCourse = (e: React.FormEvent) => {
        e.preventDefault();
        addCourse({
            id: `c${Date.now()}`,
            code: newCourse.code,
            name: newCourse.name,
            professor: newCourse.professor,
            schedule: [{ day: newCourse.day as 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday', time: newCourse.time, room: newCourse.room }]
        });
        setNewCourse({ code: '', name: '', professor: '', day: 'Monday', time: '', room: '' });
    };

    const handleAddExam = (e: React.FormEvent) => {
        e.preventDefault();
        addExam({
            id: `e${Date.now()}`,
            courseId: 'temp', // In real app, select from courses
            courseName: newExam.courseName,
            date: newExam.date,
            time: newExam.time,
            room: newExam.room,
            duration: newExam.duration
        });
        setNewExam({ courseName: '', date: '', time: '', room: '', duration: '' });
    };

    const handleAddAssignment = (e: React.FormEvent) => {
        e.preventDefault();
        addAssignment({
            id: `a${Date.now()}`,
            courseId: 'temp',
            courseName: newAssignment.courseName,
            title: newAssignment.title,
            description: newAssignment.description,
            dueDate: newAssignment.dueDate,
            status: 'Pending'
        });
        setNewAssignment({ courseName: '', title: '', description: '', dueDate: '' });
    };

    const handleAddEvent = (e: React.FormEvent) => {
        e.preventDefault();
        addEvent({
            id: `ev${Date.now()}`,
            title: newEvent.title,
            date: newEvent.date,
            time: newEvent.time,
            location: newEvent.location,
            category: newEvent.category as 'Academic' | 'Cultural' | 'Sports',
            description: newEvent.description,
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        });
        setNewEvent({ title: '', date: '', time: '', location: '', category: 'Academic', description: '' });
    };

    const handleAddLostItem = (e: React.FormEvent) => {
        e.preventDefault();
        addLostItem({
            id: `l${Date.now()}`,
            title: newLostItem.title,
            description: newLostItem.description,
            location: newLostItem.location,
            date: new Date().toISOString().split('T')[0],
            contact: newLostItem.contact,
            status: newLostItem.status as 'Lost' | 'Found',
            image: 'https://images.unsplash.com/photo-1602143407151-01114192003b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        });
        setNewLostItem({ title: '', description: '', location: '', contact: '', status: 'Lost' });
    };

    const SidebarItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={clsx(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                activeTab === id
                    ? "bg-surface-800 text-white shadow-lg shadow-surface-900/20"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-surface-800"
            )}
        >
            <Icon className="h-5 w-5" />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-surface-900 border-r border-gray-200 dark:border-surface-800 flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-surface-800">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-800 text-white">
                            <LayoutDashboard className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 dark:text-white">Admin Portal</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Manage College Data</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <SidebarItem id="overview" icon={LayoutDashboard} label="Overview" />
                    <SidebarItem id="schedule" icon={Calendar} label="Schedule" />
                    <SidebarItem id="exams" icon={FileText} label="Exams" />
                    <SidebarItem id="assignments" icon={BookOpen} label="Assignments" />
                    <SidebarItem id="events" icon={Users} label="Events" />
                    <SidebarItem id="lost-found" icon={Search} label="Lost & Found" />
                    <SidebarItem id="notices" icon={Bell} label="Notices" />
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-surface-800">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <img src={user?.avatar} alt={user?.name} className="h-8 w-8 rounded-full" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <PageTransition>
                    <div className="max-w-5xl mx-auto">
                        <header className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{activeTab.replace('-', ' & ')}</h2>
                            <p className="text-gray-500 dark:text-gray-400">Manage your college's {activeTab.replace('-', ' & ')}</p>
                        </header>

                        {activeTab === 'overview' && (
                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-gray-100 dark:border-surface-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                            <BookOpen className="h-6 w-6" />
                                        </div>
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{courses.length}</span>
                                    </div>
                                    <h3 className="text-gray-500 dark:text-gray-400 font-medium">Active Courses</h3>
                                </div>
                                <div className="rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-gray-100 dark:border-surface-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                                            <Users className="h-6 w-6" />
                                        </div>
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{events.length}</span>
                                    </div>
                                    <h3 className="text-gray-500 dark:text-gray-400 font-medium">Upcoming Events</h3>
                                </div>
                                <div className="rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-gray-100 dark:border-surface-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                                            <Bell className="h-6 w-6" />
                                        </div>
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{notices.length}</span>
                                    </div>
                                    <h3 className="text-gray-500 dark:text-gray-400 font-medium">Active Notices</h3>
                                </div>
                            </div>
                        )}

                        {activeTab === 'schedule' && (
                            <div className="space-y-8">
                                <div className="rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-gray-100 dark:border-surface-800">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add New Course</h3>
                                    <form onSubmit={handleAddCourse} className="grid gap-4 md:grid-cols-2">
                                        <input type="text" placeholder="Course Code" value={newCourse.code} onChange={e => setNewCourse({ ...newCourse, code: e.target.value })} className="input-field" required />
                                        <input type="text" placeholder="Course Name" value={newCourse.name} onChange={e => setNewCourse({ ...newCourse, name: e.target.value })} className="input-field" required />
                                        <input type="text" placeholder="Professor" value={newCourse.professor} onChange={e => setNewCourse({ ...newCourse, professor: e.target.value })} className="input-field" required />
                                        <select value={newCourse.day} onChange={e => setNewCourse({ ...newCourse, day: e.target.value as 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' })} className="input-field">
                                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        <input type="time" value={newCourse.time} onChange={e => setNewCourse({ ...newCourse, time: e.target.value })} className="input-field" required />
                                        <input type="text" placeholder="Room" value={newCourse.room} onChange={e => setNewCourse({ ...newCourse, room: e.target.value })} className="input-field" required />
                                        <button type="submit" className="btn-primary md:col-span-2">Add Course</button>
                                    </form>
                                </div>
                                <div className="space-y-4">
                                    {courses.map(course => (
                                        <div key={course.id} className="flex items-center justify-between p-4 bg-white dark:bg-surface-900 rounded-xl border border-gray-100 dark:border-surface-800">
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{course.name} ({course.code})</h4>
                                                <p className="text-sm text-gray-500">{course.professor} • {course.schedule[0].day} {course.schedule[0].time}</p>
                                            </div>
                                            <button onClick={() => deleteCourse(course.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 className="h-5 w-5" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'exams' && (
                            <div className="space-y-8">
                                <div className="rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-gray-100 dark:border-surface-800">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add New Exam</h3>
                                    <form onSubmit={handleAddExam} className="grid gap-4 md:grid-cols-2">
                                        <input type="text" placeholder="Course Name" value={newExam.courseName} onChange={e => setNewExam({ ...newExam, courseName: e.target.value })} className="input-field" required />
                                        <input type="date" value={newExam.date} onChange={e => setNewExam({ ...newExam, date: e.target.value })} className="input-field" required />
                                        <input type="time" value={newExam.time} onChange={e => setNewExam({ ...newExam, time: e.target.value })} className="input-field" required />
                                        <input type="text" placeholder="Room" value={newExam.room} onChange={e => setNewExam({ ...newExam, room: e.target.value })} className="input-field" required />
                                        <input type="text" placeholder="Duration (e.g. 2h)" value={newExam.duration} onChange={e => setNewExam({ ...newExam, duration: e.target.value })} className="input-field" required />
                                        <button type="submit" className="btn-primary md:col-span-2">Add Exam</button>
                                    </form>
                                </div>
                                <div className="space-y-4">
                                    {exams.map(exam => (
                                        <div key={exam.id} className="flex items-center justify-between p-4 bg-white dark:bg-surface-900 rounded-xl border border-gray-100 dark:border-surface-800">
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{exam.courseName}</h4>
                                                <p className="text-sm text-gray-500">{exam.date} • {exam.time} • {exam.room}</p>
                                            </div>
                                            <button onClick={() => deleteExam(exam.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 className="h-5 w-5" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'assignments' && (
                            <div className="space-y-8">
                                <div className="rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-gray-100 dark:border-surface-800">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add New Assignment</h3>
                                    <form onSubmit={handleAddAssignment} className="grid gap-4 md:grid-cols-2">
                                        <input type="text" placeholder="Course Name" value={newAssignment.courseName} onChange={e => setNewAssignment({ ...newAssignment, courseName: e.target.value })} className="input-field" required />
                                        <input type="text" placeholder="Title" value={newAssignment.title} onChange={e => setNewAssignment({ ...newAssignment, title: e.target.value })} className="input-field" required />
                                        <input type="date" value={newAssignment.dueDate} onChange={e => setNewAssignment({ ...newAssignment, dueDate: e.target.value })} className="input-field" required />
                                        <input type="text" placeholder="Description" value={newAssignment.description} onChange={e => setNewAssignment({ ...newAssignment, description: e.target.value })} className="input-field md:col-span-2" required />
                                        <button type="submit" className="btn-primary md:col-span-2">Add Assignment</button>
                                    </form>
                                </div>
                                <div className="space-y-4">
                                    {assignments.map(assignment => (
                                        <div key={assignment.id} className="flex items-center justify-between p-4 bg-white dark:bg-surface-900 rounded-xl border border-gray-100 dark:border-surface-800">
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{assignment.title}</h4>
                                                <p className="text-sm text-gray-500">{assignment.courseName} • Due: {assignment.dueDate}</p>
                                            </div>
                                            <button onClick={() => deleteAssignment(assignment.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 className="h-5 w-5" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'events' && (
                            <div className="space-y-8">
                                <div className="rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-gray-100 dark:border-surface-800">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add New Event</h3>
                                    <form onSubmit={handleAddEvent} className="grid gap-4 md:grid-cols-2">
                                        <input type="text" placeholder="Event Title" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} className="input-field" required />
                                        <input type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} className="input-field" required />
                                        <input type="time" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} className="input-field" required />
                                        <input type="text" placeholder="Location" value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} className="input-field" required />
                                        <select value={newEvent.category} onChange={e => setNewEvent({ ...newEvent, category: e.target.value })} className="input-field">
                                            <option value="Academic">Academic</option>
                                            <option value="Cultural">Cultural</option>
                                            <option value="Sports">Sports</option>
                                        </select>
                                        <input type="text" placeholder="Description" value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} className="input-field md:col-span-2" required />
                                        <button type="submit" className="btn-primary md:col-span-2">Add Event</button>
                                    </form>
                                </div>
                                <div className="space-y-4">
                                    {events.map(event => (
                                        <div key={event.id} className="flex items-center justify-between p-4 bg-white dark:bg-surface-900 rounded-xl border border-gray-100 dark:border-surface-800">
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{event.title}</h4>
                                                <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
                                            </div>
                                            <button onClick={() => deleteEvent(event.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 className="h-5 w-5" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'lost-found' && (
                            <div className="space-y-8">
                                <div className="rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-gray-100 dark:border-surface-800">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Report Lost/Found Item</h3>
                                    <form onSubmit={handleAddLostItem} className="grid gap-4 md:grid-cols-2">
                                        <input type="text" placeholder="Item Name" value={newLostItem.title} onChange={e => setNewLostItem({ ...newLostItem, title: e.target.value })} className="input-field" required />
                                        <input type="text" placeholder="Location" value={newLostItem.location} onChange={e => setNewLostItem({ ...newLostItem, location: e.target.value })} className="input-field" required />
                                        <input type="text" placeholder="Contact Info" value={newLostItem.contact} onChange={e => setNewLostItem({ ...newLostItem, contact: e.target.value })} className="input-field" required />
                                        <select value={newLostItem.status} onChange={e => setNewLostItem({ ...newLostItem, status: e.target.value })} className="input-field">
                                            <option value="Lost">Lost</option>
                                            <option value="Found">Found</option>
                                        </select>
                                        <input type="text" placeholder="Description" value={newLostItem.description} onChange={e => setNewLostItem({ ...newLostItem, description: e.target.value })} className="input-field md:col-span-2" required />
                                        <button type="submit" className="btn-primary md:col-span-2">Report Item</button>
                                    </form>
                                </div>
                                <div className="space-y-4">
                                    {lostItems.map(item => (
                                        <div key={item.id} className="flex items-center justify-between p-4 bg-white dark:bg-surface-900 rounded-xl border border-gray-100 dark:border-surface-800">
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{item.title} <span className={clsx("text-xs px-2 py-0.5 rounded-full ml-2", item.status === 'Lost' ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700")}>{item.status}</span></h4>
                                                <p className="text-sm text-gray-500">{item.location} • {item.date}</p>
                                            </div>
                                            <button onClick={() => deleteLostItem(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 className="h-5 w-5" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'notices' && (
                            <div className="space-y-8">
                                <div className="rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-gray-100 dark:border-surface-800">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add New Notice</h3>
                                    <form onSubmit={handleAddNotice} className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <input type="text" placeholder="Notice Title" value={newNotice.title} onChange={e => setNewNotice({ ...newNotice, title: e.target.value })} className="input-field" required />
                                            <select value={newNotice.priority} onChange={e => setNewNotice({ ...newNotice, priority: e.target.value })} className="input-field">
                                                <option value="Low">Low Priority</option>
                                                <option value="Medium">Medium Priority</option>
                                                <option value="High">High Priority</option>
                                            </select>
                                        </div>
                                        <textarea placeholder="Notice Content" value={newNotice.content} onChange={e => setNewNotice({ ...newNotice, content: e.target.value })} className="input-field h-32 resize-none" required />
                                        <div className="flex justify-end">
                                            <button type="submit" className="btn-primary">Post Notice</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="space-y-4">
                                    {notices.map((notice) => (
                                        <motion.div layout key={notice.id} className="group flex items-start justify-between rounded-2xl bg-white dark:bg-surface-900 p-6 shadow-sm border border-gray-100 dark:border-surface-800">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={clsx("rounded-full px-3 py-1 text-xs font-bold", notice.priority === 'High' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : notice.priority === 'Medium' ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400")}>{notice.priority}</span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(notice.date).toLocaleDateString()}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{notice.title}</h3>
                                                <p className="text-gray-600 dark:text-gray-300">{notice.content}</p>
                                                <p className="text-xs font-medium text-gray-400 mt-3">Posted by {notice.author}</p>
                                            </div>
                                            <button onClick={() => deleteNotice(notice.id)} className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="h-5 w-5" /></button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </PageTransition>
            </main>
            <style>{`
                .input-field {
                    width: 100%;
                    border-radius: 0.75rem;
                    border: 1px solid #e5e7eb;
                    background-color: #f9fafb;
                    padding: 0.625rem 1rem;
                    color: #111827;
                    outline: none;
                    transition: all 0.2s;
                }
                .dark .input-field {
                    border-color: #3f3f46;
                    background-color: #27272a;
                    color: white;
                }
                .input-field:focus {
                    ring: 2px;
                    ring-color: #3b82f6;
                }
                .btn-primary {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border-radius: 0.75rem;
                    background-color: #2563eb;
                    padding: 0.625rem 1.5rem;
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: white;
                    transition: background-color 0.2s;
                }
                .btn-primary:hover {
                    background-color: #1d4ed8;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
