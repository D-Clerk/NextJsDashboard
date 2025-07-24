'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '../app/ui/fonts.js';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/ui/dashboard';

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    // Attempt sign in
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.error) {
      setErrorMsg('Invalid email or password');
    } else if (res?.ok) {
      router.push(callbackUrl);
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-6 items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className={`${lusitana.className} mb-6 text-2xl font-bold text-gray-900`}>
          Log in to Acme
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="email@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="rounded border border-gray-300 p-2"
          />
          <label htmlFor="password" className="text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder="Your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="rounded border border-gray-300 p-2"
          />
          {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
          <button
            type="submit"
            className="mt-4 rounded bg-blue-600 py-2 text-white hover:bg-blue-500"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}
