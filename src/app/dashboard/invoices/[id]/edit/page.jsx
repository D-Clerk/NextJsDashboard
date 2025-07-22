'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditInvoicePage({ params }) {
  const { id } = params; // invoice id from URL
  const router = useRouter();

  const [invoice, setInvoice] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    status: 'pending',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch invoice data on mount
  useEffect(() => {
    async function fetchInvoice() {
      try {
        const res = await fetch(`/api/invoices/${id}`);
        if (!res.ok) throw new Error('Failed to fetch invoice');
        const data = await res.json();
        setInvoice(data);
        setFormData({
          amount: data.amount / 100, // convert cents to dollars
          date: data.date?.slice(0, 10) || '',
          status: data.status || 'pending',
        });
      } catch (err) {
        setError('Failed to load invoice');
      } finally {
        setLoading(false);
      }
    }
    fetchInvoice();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/invoices/${id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to update invoice');

      // Option 1: Redirect back to invoices list
      //router.push('/dashboard/invoices');

      // Option 2: Or just reload current page to fetch updated data
       router.refresh();

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading invoice...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Invoice #{id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Amount ($)</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Date</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
