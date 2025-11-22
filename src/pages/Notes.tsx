import React, { useState } from 'react';
import { FileText, Download, Upload, Search, X, File } from 'lucide-react';
import { notes as initialNotes } from '../data/mockData';
import type { Note } from '../types';

const Notes = () => {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock upload logic
        const newNote: Note = {
            id: `n${notes.length + 1}`,
            title: 'New Uploaded Note',
            courseId: 'c1',
            courseName: 'Data Structures',
            author: 'You',
            date: new Date().toISOString().split('T')[0],
            url: '#',
            type: 'PDF',
            size: '1.2 MB',
        };
        setNotes([newNote, ...notes]);
        setIsUploadModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Study Notes</h1>
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
                >
                    <Upload className="h-4 w-4" />
                    Upload Note
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search notes by title or course..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredNotes.map((note) => (
                    <div key={note.id} className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                        <div>
                            <div className="flex items-start justify-between">
                                <div className="rounded-lg bg-gray-100 p-2">
                                    <FileText className="h-6 w-6 text-gray-600" />
                                </div>
                                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                                    {note.type}
                                </span>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold text-gray-900 line-clamp-1">{note.title}</h3>
                                <p className="text-sm text-gray-500">{note.courseName}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                            <div className="text-xs text-gray-500">
                                <p>{note.author}</p>
                                <p>{note.date}</p>
                            </div>
                            <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-600 transition-colors">
                                <Download className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isUploadModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Upload Note</h2>
                            <button
                                onClick={() => setIsUploadModalOpen(false)}
                                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                                <input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" placeholder="e.g. Chapter 1 Summary" required />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Course</label>
                                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                                    <option>Data Structures</option>
                                    <option>Database Systems</option>
                                    <option>Linear Algebra</option>
                                </select>
                            </div>

                            <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                                <File className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-500">Click to browse or drag file here</p>
                                <p className="text-xs text-gray-400 mt-1">PDF, DOCX, JPG up to 10MB</p>
                            </div>

                            <button type="submit" className="w-full rounded-lg bg-primary-600 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
                                Upload File
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notes;
