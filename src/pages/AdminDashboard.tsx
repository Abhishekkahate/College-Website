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
    Search,
    Plus
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
                "flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                activeTab === id
                    ? "bg-surface-900 text-white shadow-sm"
                    : "text-surface-500 hover:bg-surface-100 hover:text-surface-900"
            )}
        >
            <Icon className="h-5 w-5" />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-surface-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-surface-200 flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-surface-100">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-900 text-white shadow-sm">
                            <LayoutDashboard className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="font-bold text-surface-900">Admin Portal</h1>
                            <p className="text-xs text-surface-500">Manage College Data</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <SidebarItem id="overview" icon={LayoutDashboard} label="Overview" />
                    <SidebarItem id="schedule" icon={Calendar} label="Schedule" />
                    <SidebarItem id="exams" icon={FileText} label="Exams" />
                    <SidebarItem id="assignments" icon={BookOpen} label="Assignments" />
                    <SidebarItem id="events" icon={Users} label="Events" />
                    <SidebarItem id="lost-found" icon={Search} label="Lost & Found" />
                    <SidebarItem id="notices" icon={Bell} label="Notices" />
                </nav>

                <div className="p-4 border-t border-surface-100">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <img src={user?.avatar} alt={user?.name} className="h-8 w-8 rounded-full bg-surface-200" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-surface-900 truncate">{user?.name}</p>
                            <p className="text-xs text-surface-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <PageTransition>
                    <div className="max-w-5xl mx-auto">
                        <header className="mb-8">
                            <h2 className="text-2xl font-bold text-surface-900 capitalize">{activeTab.replace('-', ' & ')}</h2>
                            <p className="text-surface-500">Manage your college's {activeTab.replace('-', ' & ')}</p>
                        </header>

                        {activeTab === 'overview' && (
                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="card-clean p-6 bg-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                                            <BookOpen className="h-6 w-6" />
                                        </div>
                                        <span className="text-3xl font-bold text-surface-900">{courses.length}</span>
                                    </div>
                                    <h3 className="text-surface-500 font-medium">Active Courses</h3>
                                </div>
                                <div className="card-clean p-6 bg-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                                            <Users className="h-6 w-6" />
                                        </div>
                                        <span className="text-3xl font-bold text-surface-900">{events.length}</span>
                                    </div>
                                    <h3 className="text-surface-500 font-medium">Upcoming Events</h3>
                                </div>
                                <div className="card-clean p-6 bg-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                                            <Bell className="h-6 w-6" />
                                        </div>
                                        <span className="text-3xl font-bold text-surface-900">{notices.length}</span>
                                    </div>
                                    <h3 className="text-surface-500 font-medium">Active Notices</h3>
                                </div>
                            </div>
                        )}

                        {activeTab === 'schedule' && (
                            <div className="space-y-8">
                                <div className="card-clean p-6 bg-white">
                                    <h3 className="text-lg font-bold text-surface-900 mb-6 flex items-center gap-2">
                                        <Plus className="h-5 w-5 text-primary-600" />
                                        Add New Course
                                    </h3>
                                    <form onSubmit={handleAddCourse} className="grid gap-4 md:grid-cols-2">
                                        <input type="text" placeholder="Course Code" value={newCourse.code} onChange={e => setNewCourse({ ...newCourse, code: e.target.value })} className="input-clean" required />
                                        <input type="text" placeholder="Course Name" value={newCourse.name} onChange={e => setNewCourse({ ...newCourse, name: e.target.value })} className="input-clean" required />
                                        <input type="text" placeholder="Professor" value={newCourse.professor} onChange={e => setNewCourse({ ...newCourse, professor: e.target.value })} className="input-clean" required />
                                        <select value={newCourse.day} onChange={e => setNewCourse({ ...newCourse, day: e.target.value as 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' })} className="input-clean">
                                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        <input type="time" value={newCourse.time} onChange={e => setNewCourse({ ...newCourse, time: e.target.value })} className="input-clean" required />
                                        <input type="text" placeholder="Room" value={newCourse.room} onChange={e => setNewCourse({ ...newCourse, room: e.target.value })} className="input-clean" required />
                                        <button type="submit" className="btn-primary md:col-span-2 justify-center">Add Course</button>
                                    </form>
                                </div>
                                <div className="space-y-4">
                                    {courses.map(course => (
                                        <div key={course.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-surface-200 hover:border-primary-300 transition-colors shadow-sm">
                                            <div>
                                                <h4 className="font-bold text-surface-900">{course.name} <span className="text-surface-500 font-normal">({course.code})</span></h4>
                                                <p className="text-sm text-surface-500 mt-1">{course.professor} • {course.schedule[0].day} {course.schedule[0].time}</p>
                                            </div>
                                            <button onClick={() => deleteCourse(course.id)} className="text-surface-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 className="h-5 w-5" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'exams' && (
                            <div className="space-y-8">
                                <div className="card-clean p-6 bg-white">
                                    <h3 className="text-lg font-bold text-surface-900 mb-6 flex items-center gap-2">
                                        <Plus className="h-5 w-5 text-primary-600" />
                                        Add New Exam
                                    </h3>
                                    <form onSubmit={handleAddExam} className="grid gap-4 md:grid-cols-2">
                                        <input type="text" placeholder="Course Name" value={newExam.courseName} onChange={e => setNewExam({ ...newExam, courseName: e.target.value })} className="input-clean" required />
                                        <input type="date" value={newExam.date} onChange={e => setNewExam({ ...newExam, date: e.target.value })} className="input-clean" required />
                                        <input type="time" value={newExam.time} onChange={e => setNewExam({ ...newExam, time: e.target.value })} className="input-clean" required />
                                        <input type="text" placeholder="Room" value={newExam.room} onChange={e => setNewExam({ ...newExam, room: e.target.value })} className="input-clean" required />
                                        <input type="text" placeholder="Duration (e.g. 2h)" value={newExam.duration} onChange={e => setNewExam({ ...newExam, duration: e.target.value })} className="input-clean" required />
                                        <button type="submit" className="btn-primary md:col-span-2 justify-center">Add Exam</button>
                                    </form>
                                </div>
                                <div className="space-y-4">
                                    {exams.map(exam => (
                                        <div key={exam.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-surface-200 hover:border-primary-300 transition-colors shadow-sm">
                                            <div>
                                                <h4 className="font-bold text-surface-900">{exam.courseName}</h4>
                                                <p className="text-sm text-surface-500 mt-1">{exam.date} • {exam.time} • {exam.room}</p>
                                            </div>
                                            <button onClick={() => deleteExam(exam.id)} className="text-surface-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 className="h-5 w-5" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'assignments' && (
                            <div className="space-y-8">
                                <div className="card-clean p-6 bg-white">
                                    <h3 className="text-lg font-bold text-surface-900 mb-6 flex items-center gap-2">
                                        <Plus className="h-5 w-5 text-primary-600" />
                                        Add New Assignment
                                    </h3>
                                    <form onSubmit={handleAddAssignment} className="grid gap-4 md:grid-cols-2">
                                        <input type="text" placeholder="Course Name" value={newAssignment.courseName} onChange={e => setNewAssignment({ ...newAssignment, courseName: e.target.value })} className="input-clean" required />
                                        <input type="text" placeholder="Title" value={newAssignment.title} onChange={e => setNewAssignment({ ...newAssignment, title: e.target.value })} className="input-clean" required />
                                        <input type="date" value={newAssignment.dueDate} onChange={e => setNewAssignment({ ...newAssignment, dueDate: e.target.value })} className="input-clean" required />
                                        <input type="text" placeholder="Description" value={newAssignment.description} onChange={e => setNewAssignment({ ...newAssignment, description: e.target.value })} className="input-clean md:col-span-2" required />
                                        <button type="submit" className="btn-primary md:col-span-2 justify-center">Add Assignment</button>
                                    </form>
                                </div>
                                <div className="space-y-4">
                                    {assignments.map(assignment => (
                                        <div key={assignment.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-surface-200 hover:border-primary-300 transition-colors shadow-sm">
                                            <div>
                                                <h4 className="font-bold text-surface-900">{assignment.title}</h4>
                                                <p className="text-sm text-surface-500 mt-1">{assignment.courseName} • Due: {assignment.dueDate}</p>
                                            </div>
                                            <button onClick={() => deleteAssignment(assignment.id)} className="text-surface-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 className="h-5 w-5" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'events' && (
                            <div className="space-y-8">
                                <div className="card-clean p-6 bg-white">
                                    <h3 className="text-lg font-bold text-surface-900 mb-6 flex items-center gap-2">
                                        <Plus className="h-5 w-5 text-primary-600" />
                                        Add New Event
                                    </h3>
                                    <form onSubmit={handleAddEvent} className="grid gap-4 md:grid-cols-2">
                                        <input type="text" placeholder="Event Title" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} className="input-clean" required />
                                        <input type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} className="input-clean" required />
                                        <input type="time" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} className="input-clean" required />
                                        <input type="text" placeholder="Location" value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} className="input-clean" required />
                                        <select value={newEvent.category} onChange={e => setNewEvent({ ...newEvent, category: e.target.value })} className="input-clean">
                                            <option value="Academic">Academic</option>
                                            <option value="Cultural">Cultural</option>
                                            <option value="Sports">Sports</option>
                                        </select>
                                        <input type="text" placeholder="Description" value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} className="input-clean md:col-span-2" required />
                                        <button type="submit" className="btn-primary md:col-span-2 justify-center">Add Event</button>
                                    </form>
                                </div>
                                <div className="space-y-4">
                                    {events.map(event => (
                                        <div key={event.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-surface-200 hover:border-primary-300 transition-colors shadow-sm">
                                            <div>
                                                <h4 className="font-bold text-surface-900">{event.title}</h4>
                                                <p className="text-sm text-surface-500 mt-1">{event.date} • {event.location}</p>
                                            </div>
                                            <button onClick={() => deleteEvent(event.id)} className="text-surface-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 className="h-5 w-5" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'lost-found' && (
                            <div className="space-y-8">
                                <div className="card-clean p-6 bg-white">
                                    <h3 className="text-lg font-bold text-surface-900 mb-6 flex items-center gap-2">
                                        <Plus className="h-5 w-5 text-primary-600" />
                                        Report Lost/Found Item
                                    </h3>
                                    <form onSubmit={handleAddLostItem} className="grid gap-4 md:grid-cols-2">
                                        <input type="text" placeholder="Item Name" value={newLostItem.title} onChange={e => setNewLostItem({ ...newLostItem, title: e.target.value })} className="input-clean" required />
                                        <input type="text" placeholder="Location" value={newLostItem.location} onChange={e => setNewLostItem({ ...newLostItem, location: e.target.value })} className="input-clean" required />
                                        <input type="text" placeholder="Contact Info" value={newLostItem.contact} onChange={e => setNewLostItem({ ...newLostItem, contact: e.target.value })} className="input-clean" required />
                                        <select value={newLostItem.status} onChange={e => setNewLostItem({ ...newLostItem, status: e.target.value })} className="input-clean">
                                            <option value="Lost">Lost</option>
                                            <option value="Found">Found</option>
                                        </select>
                                        <input type="text" placeholder="Description" value={newLostItem.description} onChange={e => setNewLostItem({ ...newLostItem, description: e.target.value })} className="input-clean md:col-span-2" required />
                                        <button type="submit" className="btn-primary md:col-span-2 justify-center">Report Item</button>
                                    </form>
                                </div>
                                <div className="space-y-4">
                                    {lostItems.map(item => (
                                        <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-surface-200 hover:border-primary-300 transition-colors shadow-sm">
                                            <div>
                                                <h4 className="font-bold text-surface-900">{item.title} <span className={clsx("text-xs px-2 py-0.5 rounded-full ml-2 font-medium", item.status === 'Lost' ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700")}>{item.status}</span></h4>
                                                <p className="text-sm text-surface-500 mt-1">{item.location} • {item.date}</p>
                                            </div>
                                            <button onClick={() => deleteLostItem(item.id)} className="text-surface-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 className="h-5 w-5" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'notices' && (
                            <div className="space-y-8">
                                <div className="card-clean p-6 bg-white">
                                    <h3 className="text-lg font-bold text-surface-900 mb-6 flex items-center gap-2">
                                        <Plus className="h-5 w-5 text-primary-600" />
                                        Add New Notice
                                    </h3>
                                    <form onSubmit={handleAddNotice} className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <input type="text" placeholder="Notice Title" value={newNotice.title} onChange={e => setNewNotice({ ...newNotice, title: e.target.value })} className="input-clean" required />
                                            <select value={newNotice.priority} onChange={e => setNewNotice({ ...newNotice, priority: e.target.value })} className="input-clean">
                                                <option value="Low">Low Priority</option>
                                                <option value="Medium">Medium Priority</option>
                                                <option value="High">High Priority</option>
                                            </select>
                                        </div>
                                        <textarea placeholder="Notice Content" value={newNotice.content} onChange={e => setNewNotice({ ...newNotice, content: e.target.value })} className="input-clean h-32 resize-none" required />
                                        <div className="flex justify-end">
                                            <button type="submit" className="btn-primary">Post Notice</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="space-y-4">
                                    {notices.map((notice) => (
                                        <motion.div layout key={notice.id} className="group flex items-start justify-between rounded-xl bg-white p-6 shadow-sm border border-surface-200 hover:border-primary-300 transition-colors">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={clsx("rounded-full px-2.5 py-0.5 text-xs font-bold", notice.priority === 'High' ? "bg-red-100 text-red-700" : notice.priority === 'Medium' ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700")}>{notice.priority}</span>
                                                    <span className="text-sm text-surface-500">{new Date(notice.date).toLocaleDateString()}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-surface-900 mb-1">{notice.title}</h3>
                                                <p className="text-surface-600">{notice.content}</p>
                                                <p className="text-xs font-medium text-surface-400 mt-3">Posted by {notice.author}</p>
                                            </div>
                                            <button onClick={() => deleteNotice(notice.id)} className="p-2 rounded-lg text-surface-400 hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="h-5 w-5" /></button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </PageTransition>
            </main>
        </div>
    );
};

export default AdminDashboard;
