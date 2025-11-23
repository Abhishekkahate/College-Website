export interface Student {
    id: string;
    name: string;
    email: string;
    avatar: string;
    course: string;
    semester: number;
    rollNo: string;
    section: string;
    password?: string; // Optional for security in frontend, but needed for mock login
    role: 'student';
}

export interface Admin {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: 'admin';
    password?: string;
}

export type User = Student | Admin;

export interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    priority: 'Low' | 'Medium' | 'High';
}

export interface Course {
    id: string;
    code: string;
    name: string;
    professor: string;
    schedule: {
        day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
        time: string;
        room: string;
    }[];
}

export interface Exam {
    id: string;
    courseId: string;
    courseName: string;
    date: string;
    time: string;
    room: string;
    duration: string;
}

export interface Note {
    id: string;
    title: string;
    courseId: string;
    courseName: string;
    author: string;
    date: string;
    url: string; // Mock URL
    type: 'PDF' | 'DOCX' | 'IMG';
    size: string;
    unit?: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
}

export interface Assignment {
    id: string;
    courseId: string;
    courseName: string;
    title: string;
    description: string;
    dueDate: string;
    status: 'Pending' | 'Submitted' | 'Graded';
    grade?: string;
}

export interface Faculty {
    id: string;
    name: string;
    department: string;
    email: string;
    phone: string;
    office: string;
    image: string;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    category: 'Academic' | 'Cultural' | 'Sports' | 'Workshop';
    description: string;
    image: string;
}

export interface LostItem {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    contact: string;
    image: string;
    status: 'Lost' | 'Found';
}
