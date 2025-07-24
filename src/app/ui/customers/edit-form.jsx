'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditCustomerForm({ customer }) {
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/customers/${customer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    router.push('/ui/customers');  // Navigate here after save
  };

  const handleCancel = () => {
    router.push('/ui/customers');  // Navigate here on cancel
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* form inputs... */}
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          className="w-full rounded border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          className="w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
