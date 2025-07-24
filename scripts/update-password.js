const bcrypt = require('bcrypt');
const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function updateUserPassword(email, plainPassword) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await sql`
      UPDATE users SET password = ${hashedPassword} WHERE email = ${email};
    `;

    console.log(`Password for ${email} updated.`);
  } catch (error) {
    console.error('Error updating password:', error);
  }
}

const userEmail = 'user@nextmail.com';
const newPassword = '123456';

updateUserPassword(userEmail, newPassword)
  .then(() => process.exit())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
