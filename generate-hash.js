// Run this to generate a proper bcrypt hash for "password123"
import bcrypt from 'bcryptjs';

async function generateHash() {
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    console.log('\n=================================');
    console.log('Generated bcrypt hash for "password123":');
    console.log(hash);
    console.log('=================================\n');
    console.log('Copy this hash and use it in the SQL below:\n');
    console.log(`UPDATE students SET password_hash = '${hash}' WHERE roll_no IN ('CS2024001', 'CS2024002', 'CS2024003');`);
    console.log('\n');
}

generateHash();
