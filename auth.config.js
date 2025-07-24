import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function getUser(email) {
  try {
    const result = await sql`SELECT * FROM users WHERE email=${email}`;
    console.log('SQL query result:', result);

    // result is an array of rows, so check length directly
    if (!result || result.length === 0) {
      console.log('No user found with that email');
      return null;
    }
    return result[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

export const authConfig = {
  pages: {
    signIn: '/login', // Redirect here on sign in required
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === baseUrl) {
        return '/login';
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (nextUrl.pathname.startsWith('/ui')) {
        return isLoggedIn;
      }
      return true;
    },
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        console.log('Authorize called with credentials:', credentials);

        const user = await getUser(credentials.email);
        console.log('User fetched from DB:', user);

        if (!user) {
          console.log('No user found with that email');
          return null;
        }

        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordsMatch) {
          console.log('Password mismatch');
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
};
