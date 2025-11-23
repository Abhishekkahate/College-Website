import React, { useState } from 'react';
import { FileText, Download, Upload, X, Folder, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import type { Note } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Notes = () => {
    const { notes, addNote, courses } = useData();
    const { user } = useAuth();
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [newNote, setNewNote] = useState<Partial<Note>>({
        title: '',
        courseId: '',
        unit: '',
        url: '',
        type: 'PDF'
    });

    // Get unique subjects from courses
    const subjects = courses.map(c => c.name);

    // Get units for selected subject (mock data for now, or derive from notes)
    const units = ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5'];

    // Filter notes based on selection
    const filteredNotes = notes.filter(note => {
        if (selectedSubject && note.courseName !== selectedSubject) return false;
        if (selectedUnit && note.unit !== selectedUnit) return false;
        return true;
    });

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNote.title || !newNote.courseId || !newNote.unit) return;

        // In a real app, handle file upload to storage here
        // For now, we'll just add the note object
        await addNote({
            ...newNote,
            id: Date.now().toString(),
            author: user?.name || 'Unknown',
            date: new Date().toISOString().split('T')[0],
            size: '2.5 MB', // Mock size
            courseName: courses.find(c => c.id === newNote.courseId)?.name || 'Unknown'
        } as Note);

        setIsUploadModalOpen(false);
        setNewNote({ title: '', courseId: '', unit: '', url: '', type: 'PDF' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900">Study Notes</h1>
                    <p className="text-surface-500">Access and share study materials</p>
                </div>
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary-900 px-6 py-2.5 text-white font-medium hover:bg-primary-800 transition-all shadow-sm"
                >
                    <Upload className="h-4 w-4" />
                    Upload Note
                </button>
            </div>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-surface-500 overflow-x-auto pb-2">
                <button
                    onClick={() => { setSelectedSubject(null); setSelectedUnit(null); }}
                    className={clsx("hover:text-primary-700 transition-colors", !selectedSubject && "font-bold text-primary-700")}
                >
                    All Subjects
                </button>
                {selectedSubject && (
                    <>
                        <ChevronRight className="h-4 w-4" />
                        <button
                            onClick={() => setSelectedUnit(null)}
                            className={clsx("hover:text-primary-700 transition-colors", !selectedUnit && "font-bold text-primary-700")}
                        >
                            {selectedSubject}
                        </button>
                    </>
                )}
                {selectedUnit && (
                    <>
                        <ChevronRight className="h-4 w-4" />
                        <span className="font-bold text-primary-700">{selectedUnit}</span>
                    </>
                )}
            </div>

            <AnimatePresence mode="wait">
                {!selectedSubject ? (
                    // Subject Selection View
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {subjects.map((subject, index) => (
                            <motion.div
                                key={subject}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedSubject(subject)}
                                className="card-clean p-6 cursor-pointer hover:border-primary-300 transition-all group bg-white"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                        <Folder className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-surface-900 group-hover:text-primary-700 transition-colors">{subject}</h3>
                                        <p className="text-sm text-surface-500">{notes.filter(n => n.courseName === subject).length} Files</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : !selectedUnit ? (
                    // Unit Selection View
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {units.map((unit, index) => (
                            <motion.div
                                key={unit}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedUnit(unit)}
                                className="card-clean p-6 cursor-pointer hover:border-primary-300 transition-all group bg-white"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center group-hover:bg-accent-600 group-hover:text-white transition-colors">
                                        <Folder className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-surface-900">{unit}</h3>
                                        <p className="text-sm text-surface-500">{notes.filter(n => n.courseName === selectedSubject && n.unit === unit).length} Files</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    // Notes List View
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 gap-4"
                    >
                        {filteredNotes.length > 0 ? (
                            filteredNotes.map((note, index) => (
                                <motion.div
                                    key={note.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="card-clean p-4 flex items-center justify-between group hover:border-primary-300 bg-white"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-surface-900 group-hover:text-primary-700 transition-colors">{note.title}</h3>
                                            <p className="text-xs text-surface-500">
                                                Uploaded by {note.author} • {note.date} • {note.size}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 hover:text-primary-700 transition-colors">
                                        <Download className="h-5 w-5" />
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-surface-500">
                                <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                <p>No notes found in this unit.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 border border-surface-200"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-surface-900">Upload Note</h2>
                                <button onClick={() => setIsUploadModalOpen(false)} className="text-surface-400 hover:text-surface-900 transition-colors">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleUpload} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-surface-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-clean w-full"
                                        value={newNote.title}
                                        onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                                        placeholder="e.g. Chapter 1 Summary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-surface-700 mb-1">Subject</label>
                                    <select
                                        required
                                        className="input-clean w-full"
                                        value={newNote.courseId}
                                        onChange={e => setNewNote({ ...newNote, courseId: e.target.value })}
                                    >
                                        <option value="">Select Subject</option>
                                        {courses.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-surface-700 mb-1">Unit</label>
                                    <select
                                        required
                                        className="input-clean w-full"
                                        value={newNote.unit}
                                        onChange={e => setNewNote({ ...newNote, unit: e.target.value })}
                                    >
                                        <option value="">Select Unit</option>
                                        {units.map(u => (
                                            <option key={u} value={u}>{u}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-surface-700 mb-1">File</label>
                                    <div className="border-2 border-dashed border-surface-200 rounded-xl p-6 text-center hover:border-primary-500 transition-colors cursor-pointer bg-surface-50/50">
                                        <Upload className="h-8 w-8 mx-auto text-surface-400 mb-2" />
                                        <p className="text-sm text-surface-500">Click to upload PDF</p>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-primary-900 py-2.5 text-white font-bold hover:bg-primary-800 transition-colors shadow-sm"
                                >
                                    Upload Note
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Notes;
