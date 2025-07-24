const bcrypt = require('bcrypt');
const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function createUser(email, plainPassword, name = null) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await sql`
      INSERT INTO users (email, password, name)
      VALUES (${email}, ${hashedPassword}, ${name})
      ON CONFLICT (email) DO NOTHING;
    `;

    console.log(`User created: ${email}`);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

const userEmail = 'david@capstoneproject.com';
const userPassword = '123456';
const userName = 'David Clerk'; // Optional

createUser(userEmail, userPassword, userName)
  .then(() => process.exit())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
