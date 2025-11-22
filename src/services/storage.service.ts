import { supabase } from '../lib/supabase';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface UploadResult {
    success: boolean;
    url?: string;
    error?: string;
}

/**
 * Upload a file to Supabase Storage
 */
async function uploadFile(
    bucket: string,
    path: string,
    file: File
): Promise<UploadResult> {
    try {
        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            return {
                success: false,
                error: `File size exceeds the maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`
            };
        }

        // Upload file
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Upload error:', error);
            return {
                success: false,
                error: error.message
            };
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return {
            success: true,
            url: publicUrl
        };
    } catch (error) {
        console.error('Upload error:', error);
        return {
            success: false,
            error: 'An error occurred during file upload'
        };
    }
}

/**
 * Upload a note file (PDF, DOCX)
 */
export async function uploadNote(file: File, courseId: string): Promise<UploadResult> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const path = `${courseId}/${fileName}`;

    return uploadFile('notes', path, file);
}

/**
 * Upload an event image
 */
export async function uploadEventImage(file: File): Promise<UploadResult> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const path = `events/${fileName}`;

    return uploadFile('event-images', path, file);
}

/**
 * Upload a lost item image
 */
export async function uploadLostItemImage(file: File): Promise<UploadResult> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const path = `lost-items/${fileName}`;

    return uploadFile('lost-item-images', path, file);
}

/**
 * Upload a user avatar
 */
export async function uploadAvatar(file: File, userId: string): Promise<UploadResult> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const path = `avatars/${fileName}`;

    // Use upsert to replace existing avatar
    try {
        const { data, error } = await supabase.storage
            .from('avatars')
            .upload(path, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (error) {
            return {
                success: false,
                error: error.message
            };
        }

        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(data.path);

        return {
            success: true,
            url: publicUrl
        };
    } catch (error) {
        console.error('Avatar upload error:', error);
        return {
            success: false,
            error: 'An error occurred during avatar upload'
        };
    }
}

/**
 * Delete a file from storage
 */
export async function deleteFile(bucket: string, path: string): Promise<boolean> {
    try {
        const { error } = await supabase.storage
            .from(bucket)
            .remove([path]);

        if (error) {
            console.error('Delete error:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Delete error:', error);
        return false;
    }
}

/**
 * Get file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get file type from filename
 */
export function getFileType(filename: string): 'PDF' | 'DOCX' | 'IMG' {
    const ext = filename.split('.').pop()?.toLowerCase();

    if (ext === 'pdf') return 'PDF';
    if (ext === 'docx' || ext === 'doc') return 'DOCX';
    return 'IMG';
}
