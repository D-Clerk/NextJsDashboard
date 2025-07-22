'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function EditInvoiceForm({ invoice, customers }) {
  const [formState, setFormState] = useState({
    customerId: invoice.customer_id,
    amount: invoice.amount / 100,
    status: invoice.status,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/invoices/${invoice.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    });

    router.refresh();
    router.push('/dashboard/invoices');
  };

  const handleCancel = () => {
    router.push('/ui/invoices');
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this invoice?');
    if (!confirmed) return;

    await fetch(`/api/invoices/${invoice.id}`, {
      method: 'DELETE',
    });

    router.refresh();
    router.push('/ui/invoices');
  };

  return (
    <>
<div className="flex items-center justify-between mb-4">
  <h2 className="text-xl font-semibold">Edit Invoice</h2>
  <button
    onClick={handleDelete}
    className="text-red-600 hover:text-red-800 flex items-center gap-1"
  >
    <TrashIcon className="h-5 w-5" />
    <span className="hidden sm:inline">Delete</span>
  </button>
</div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 bg-gray-50 p-4 rounded-md shadow">
          <div>
            <label>Customer</label>
            <select
              name="customerId"
              value={formState.customerId}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            >
              {customers.map((cust) => (
                <option key={cust.id} value={cust.id}>
                  {cust.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Amount (USD)</label>
            <input
              name="amount"
              type="number"
              step="0.01"
              value={formState.amount}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label>Status</label>
            <select
              name="status"
              value={formState.status}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </>
  );
}
