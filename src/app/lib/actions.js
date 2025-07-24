'use server';

import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';

export async function authenticate(prevState, formData) {
  try {
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // Optional: check result?.error and return message
    if (result?.error) return 'Invalid credentials.';

    return null; // success
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
