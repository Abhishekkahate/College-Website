import type { Student, Admin, Course, Exam, Note, Notification, Assignment, Faculty, Event, LostItem, Notice } from '../types';

export const currentUser: Student = {
    id: 's12345',
    name: 'Alex Johnson',
    email: 'alex.j@college.edu',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    course: 'Computer Science',
    semester: 4,
    rollNo: 'CS2024001',
    section: 'A',
    password: 'password123', // Mock password
    role: 'student',
};

export const mockAdmin: Admin = {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@college.edu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    role: 'admin',
    password: 'adminpassword',
};

export const mockNotices: Notice[] = [
    {
        id: 'n1',
        title: 'Semester Registration Deadline Extended',
        content: 'The deadline for spring semester registration has been extended to March 25th. Please ensure all dues are cleared.',
        date: '2024-03-20',
        author: 'Registrar Office',
        priority: 'High',
    },
    {
        id: 'n2',
        title: 'Library Maintenance Schedule',
        content: 'The main library will be closed for maintenance on Saturday, March 23rd, from 9 AM to 2 PM.',
        date: '2024-03-19',
        author: 'Library Admin',
        priority: 'Medium',
    },
    {
        id: 'n3',
        title: 'Guest Lecture: AI in Healthcare',
        content: 'Dr. Sarah Connor will be delivering a guest lecture on AI applications in modern healthcare this Friday at the Auditorium.',
        date: '2024-03-18',
        author: 'CS Department',
        priority: 'Low',
    },
];

export const courses: Course[] = [
    {
        id: 'c1',
        code: 'CS201',
        name: 'Data Structures',
        professor: 'Dr. Smith',
        schedule: [
            { day: 'Monday', time: '10:00 AM', room: 'Lab 3' },
            { day: 'Wednesday', time: '10:00 AM', room: 'Lab 3' },
        ],
    },
    {
        id: 'c2',
        code: 'CS202',
        name: 'Database Systems',
        professor: 'Prof. Williams',
        schedule: [
            { day: 'Tuesday', time: '02:00 PM', room: 'Hall A' },
            { day: 'Thursday', time: '02:00 PM', room: 'Hall A' },
        ],
    },
    {
        id: 'c3',
        code: 'MA201',
        name: 'Linear Algebra',
        professor: 'Dr. Brown',
        schedule: [
            { day: 'Monday', time: '01:00 PM', room: 'Room 101' },
            { day: 'Friday', time: '11:00 AM', room: 'Room 101' },
        ],
    },
];

export const exams: Exam[] = [
    {
        id: 'e1',
        courseId: 'c1',
        courseName: 'Data Structures',
        date: '2024-05-15',
        time: '10:00 AM',
        room: 'Exam Hall 1',
        duration: '3h',
    },
    {
        id: 'e2',
        courseId: 'c2',
        courseName: 'Database Systems',
        date: '2024-05-18',
        time: '02:00 PM',
        room: 'Exam Hall 2',
        duration: '2.5h',
    },
];

export const notes: Note[] = [
    {
        id: 'n1',
        title: 'Binary Trees Introduction',
        courseId: 'c1',
        courseName: 'Data Structures',
        author: 'Dr. Smith',
        date: '2024-03-10',
        url: '#',
        type: 'PDF',
        size: '2.4 MB',
    },
    {
        id: 'n2',
        title: 'SQL Joins Cheatsheet',
        courseId: 'c2',
        courseName: 'Database Systems',
        author: 'Alex Johnson',
        date: '2024-03-12',
        url: '#',
        type: 'PDF',
        size: '1.1 MB',
    },
    {
        id: 'n3',
        title: 'Vector Spaces Notes',
        courseId: 'c3',
        courseName: 'Linear Algebra',
        author: 'Sarah Lee',
        date: '2024-03-15',
        url: '#',
        type: 'DOCX',
        size: '500 KB',
    },
];

export const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'Exam Schedule Released',
        message: 'The final exam schedule for Spring 2024 has been released.',
        date: '2024-03-15',
        read: false,
    },
    {
        id: '2',
        title: 'New Assignment Posted',
        message: 'Prof. Johnson posted a new assignment for Database Systems.',
        date: '2024-03-14',
        read: true,
    },
];

export const mockAssignments: Assignment[] = [
    {
        id: '1',
        courseId: 'CS101',
        courseName: 'Introduction to Programming',
        title: 'Final Project Proposal',
        description: 'Submit a proposal for your final project including scope and technologies.',
        dueDate: '2024-04-10',
        status: 'Pending',
    },
    {
        id: '2',
        courseId: 'CS102',
        courseName: 'Data Structures',
        title: 'Binary Tree Implementation',
        description: 'Implement a binary search tree with insertion, deletion, and traversal methods.',
        dueDate: '2024-04-05',
        status: 'Submitted',
        grade: 'A',
    },
    {
        id: '3',
        courseId: 'CS103',
        courseName: 'Database Systems',
        title: 'SQL Queries Practice',
        description: 'Complete the exercises on complex joins and subqueries.',
        dueDate: '2024-04-15',
        status: 'Pending',
    },
];

export const mockFaculty: Faculty[] = [
    {
        id: 'f1',
        name: 'Dr. Smith',
        department: 'Computer Science',
        email: 'smith@college.edu',
        phone: '+1 234 567 8901',
        office: 'Room 301, CS Block',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 'f2',
        name: 'Prof. Williams',
        department: 'Information Technology',
        email: 'williams@college.edu',
        phone: '+1 234 567 8902',
        office: 'Room 204, IT Block',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 'f3',
        name: 'Dr. Brown',
        department: 'Mathematics',
        email: 'brown@college.edu',
        phone: '+1 234 567 8903',
        office: 'Room 105, Math Block',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
];

export const mockEvents: Event[] = [
    {
        id: 'ev1',
        title: 'Tech Symposium 2024',
        date: '2024-04-25',
        time: '09:00 AM',
        location: 'Main Auditorium',
        category: 'Academic',
        description: 'Annual technology symposium featuring guest speakers from top tech companies.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 'ev2',
        title: 'Inter-College Cricket Tournament',
        date: '2024-05-01',
        time: '10:00 AM',
        location: 'Sports Ground',
        category: 'Sports',
        description: 'Final match of the inter-college cricket tournament.',
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 'ev3',
        title: 'Cultural Fest - Aura',
        date: '2024-05-10',
        time: '05:00 PM',
        location: 'Open Air Theatre',
        category: 'Cultural',
        description: 'A night of music, dance, and drama performances by students.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
];

export const mockLostItems: LostItem[] = [
    {
        id: 'l1',
        title: 'Blue Water Bottle',
        description: 'Lost a blue metal water bottle near the library entrance.',
        location: 'Library Entrance',
        date: '2024-03-20',
        contact: '+1 234 567 8900',
        image: 'https://images.unsplash.com/photo-1602143407151-01114192003b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'Lost',
    },
    {
        id: 'l2',
        title: 'Scientific Calculator',
        description: 'Found a Casio scientific calculator in Room 301.',
        location: 'Room 301',
        date: '2024-03-21',
        contact: 'Security Office',
        image: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'Found',
    },
];
