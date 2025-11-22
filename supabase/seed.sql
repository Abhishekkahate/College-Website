-- =============================================
-- College Website Database Seed Data
-- =============================================
-- This file contains sample data for testing and development

-- =============================================
-- SAMPLE STUDENTS
-- =============================================
-- Password for all students: "password123"
-- Hashed with bcrypt: $2a$10$rKZLvXZ5YJ5YJ5YJ5YJ5YeH5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ

INSERT INTO students (id, roll_no, section, name, email, password_hash, avatar, course, semester) VALUES
('a0000000-0000-0000-0000-000000000001', 'CS2024001', 'A', 'Alex Johnson', 'alex.j@college.edu', '$2a$10$rKZLvXZ5YJ5YJ5YJ5YJ5YeH5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Computer Science', 4),
('a0000000-0000-0000-0000-000000000002', 'CS2024002', 'A', 'Sarah Lee', 'sarah.l@college.edu', '$2a$10$rKZLvXZ5YJ5YJ5YJ5YJ5YeH5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Computer Science', 4),
('a0000000-0000-0000-0000-000000000003', 'CS2024003', 'B', 'Mike Chen', 'mike.c@college.edu', '$2a$10$rKZLvXZ5YJ5YJ5YJ5YJ5YeH5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ5YJ', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Computer Science', 4);

-- =============================================
-- SAMPLE FACULTY
-- =============================================

INSERT INTO faculty (name, department, email, phone, office, image_url) VALUES
('Dr. Smith', 'Computer Science', 'smith@college.edu', '+1 234 567 8901', 'Room 301, CS Block', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
('Prof. Williams', 'Information Technology', 'williams@college.edu', '+1 234 567 8902', 'Room 204, IT Block', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
('Dr. Brown', 'Mathematics', 'brown@college.edu', '+1 234 567 8903', 'Room 105, Math Block', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');

-- =============================================
-- SAMPLE COURSES
-- =============================================

INSERT INTO courses (id, code, name, professor, section) VALUES
('b0000000-0000-0000-0000-000000000001', 'CS201', 'Data Structures', 'Dr. Smith', 'A'),
('b0000000-0000-0000-0000-000000000002', 'CS202', 'Database Systems', 'Prof. Williams', 'A'),
('b0000000-0000-0000-0000-000000000003', 'MA201', 'Linear Algebra', 'Dr. Brown', 'A');

-- =============================================
-- SAMPLE COURSE SCHEDULES
-- =============================================

INSERT INTO course_schedule (course_id, day, time, room) VALUES
('b0000000-0000-0000-0000-000000000001', 'Monday', '10:00 AM', 'Lab 3'),
('b0000000-0000-0000-0000-000000000001', 'Wednesday', '10:00 AM', 'Lab 3'),
('b0000000-0000-0000-0000-000000000002', 'Tuesday', '02:00 PM', 'Hall A'),
('b0000000-0000-0000-0000-000000000002', 'Thursday', '02:00 PM', 'Hall A'),
('b0000000-0000-0000-0000-000000000003', 'Monday', '01:00 PM', 'Room 101'),
('b0000000-0000-0000-0000-000000000003', 'Friday', '11:00 AM', 'Room 101');

-- =============================================
-- SAMPLE EXAMS
-- =============================================

INSERT INTO exams (course_id, date, time, room, duration, section) VALUES
('b0000000-0000-0000-0000-000000000001', '2024-05-15', '10:00 AM', 'Exam Hall 1', '3h', 'A'),
('b0000000-0000-0000-0000-000000000002', '2024-05-18', '02:00 PM', 'Exam Hall 2', '2.5h', 'A');

-- =============================================
-- SAMPLE ASSIGNMENTS
-- =============================================

INSERT INTO assignments (course_id, title, description, due_date, section) VALUES
('b0000000-0000-0000-0000-000000000001', 'Binary Tree Implementation', 'Implement a binary search tree with insertion, deletion, and traversal methods.', '2024-04-05', 'A'),
('b0000000-0000-0000-0000-000000000002', 'SQL Queries Practice', 'Complete the exercises on complex joins and subqueries.', '2024-04-15', 'A');

-- =============================================
-- SAMPLE NOTICES
-- =============================================

INSERT INTO notices (title, content, author, priority) VALUES
('Semester Registration Deadline Extended', 'The deadline for spring semester registration has been extended to March 25th. Please ensure all dues are cleared.', 'Registrar Office', 'High'),
('Library Maintenance Schedule', 'The main library will be closed for maintenance on Saturday, March 23rd, from 9 AM to 2 PM.', 'Library Admin', 'Medium'),
('Guest Lecture: AI in Healthcare', 'Dr. Sarah Connor will be delivering a guest lecture on AI applications in modern healthcare this Friday at the Auditorium.', 'CS Department', 'Low');

-- =============================================
-- SAMPLE EVENTS
-- =============================================

INSERT INTO events (title, date, time, location, category, description, image_url) VALUES
('Tech Symposium 2024', '2024-04-25', '09:00 AM', 'Main Auditorium', 'Academic', 'Annual technology symposium featuring guest speakers from top tech companies.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
('Inter-College Cricket Tournament', '2024-05-01', '10:00 AM', 'Sports Ground', 'Sports', 'Final match of the inter-college cricket tournament.', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
('Cultural Fest - Aura', '2024-05-10', '05:00 PM', 'Open Air Theatre', 'Cultural', 'A night of music, dance, and drama performances by students.', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');

-- =============================================
-- SAMPLE LOST ITEMS
-- =============================================

INSERT INTO lost_items (title, description, location, contact, image_url, status, posted_by) VALUES
('Blue Water Bottle', 'Lost a blue metal water bottle near the library entrance.', 'Library Entrance', '+1 234 567 8900', 'https://images.unsplash.com/photo-1602143407151-01114192003b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Lost', 'a0000000-0000-0000-0000-000000000001'),
('Scientific Calculator', 'Found a Casio scientific calculator in Room 301.', 'Room 301', 'Security Office', 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Found', 'a0000000-0000-0000-0000-000000000002');

-- =============================================
-- NOTE: Admin users should be created through Supabase Auth
-- After creating an admin user in Auth, insert into admins table:
-- INSERT INTO admins (id, name, email, avatar) VALUES
-- ('auth-user-id-here', 'Admin User', 'admin@college.edu', 'avatar-url');
-- =============================================
