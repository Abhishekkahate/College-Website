import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';
import type { User, Student, Admin } from '../types';

const SALT_ROUNDS = 10;

export interface LoginResult {
    success: boolean;
    user?: User;
    error?: string;
}

/**
 * Student Login - Custom authentication using roll_no, section, and password
 */
export async function loginStudent(
    rollNo: string,
    section: string,
    password: string
): Promise<LoginResult> {
    try {
        // Query student by roll_no and section
        const { data: student, error } = await supabase
            .from('students')
            .select('*')
            .eq('roll_no', rollNo)
            .eq('section', section.toUpperCase())
            .single();

        if (error || !student) {
            return {
                success: false,
                error: 'Invalid credentials. Please check your Roll Number and Section.'
            };
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, student.password_hash);

        if (!passwordMatch) {
            return {
                success: false,
                error: 'Invalid password.'
            };
        }

        // Convert database student to app Student type
        const userStudent: Student = {
            id: student.id,
            name: student.name,
            email: student.email,
            avatar: student.avatar || '',
            course: student.course,
            semester: student.semester,
            rollNo: student.roll_no,
            section: student.section,
            role: 'student'
        };

        // Store session in localStorage (custom approach since we're not using Supabase Auth for students)
        localStorage.setItem('user', JSON.stringify(userStudent));
        localStorage.setItem('userType', 'student');

        return {
            success: true,
            user: userStudent
        };
    } catch (error) {
        console.error('Student login error:', error);
        return {
            success: false,
            error: 'An error occurred during login. Please try again.'
        };
    }
}

/**
 * Admin Login - Uses Supabase Auth
 */
export async function loginAdmin(email: string, password: string): Promise<LoginResult> {
    try {
        // Sign in with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (authError || !authData.user) {
            return {
                success: false,
                error: 'Invalid admin credentials.'
            };
        }

        // Fetch admin profile from admins table
        const { data: admin, error: adminError } = await supabase
            .from('admins')
            .select('*')
            .eq('id', authData.user.id)
            .single();

        if (adminError || !admin) {
            // Admin user exists in auth but not in admins table
            await supabase.auth.signOut();
            return {
                success: false,
                error: 'Admin profile not found.'
            };
        }

        // Convert database admin to app Admin type
        const userAdmin: Admin = {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            avatar: admin.avatar || '',
            role: 'admin'
        };

        // Store session
        localStorage.setItem('user', JSON.stringify(userAdmin));
        localStorage.setItem('userType', 'admin');

        return {
            success: true,
            user: userAdmin
        };
    } catch (error) {
        console.error('Admin login error:', error);
        return {
            success: false,
            error: 'An error occurred during login. Please try again.'
        };
    }
}

/**
 * Logout - Clears session
 */
export async function logout(): Promise<void> {
    const userType = localStorage.getItem('userType');

    // If admin, sign out from Supabase Auth
    if (userType === 'admin') {
        await supabase.auth.signOut();
    }

    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
        return JSON.parse(userStr) as User;
    } catch {
        return null;
    }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    return getCurrentUser() !== null;
}

/**
 * Hash password for student registration (for admin to create students)
 */
export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify Supabase Auth session (for admins)
 */
export async function verifyAdminSession(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    return session !== null;
}
