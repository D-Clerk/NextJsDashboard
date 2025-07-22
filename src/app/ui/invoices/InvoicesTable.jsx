'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function InvoicesTable({ invoices }) {
  if (!invoices?.length) {
    return <p>No invoices found.</p>;
  }

  return (
    <table className="min-w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2 text-left">Customer</th>
          <th className="border border-gray-300 p-2 text-left">Email</th>
          <th className="border border-gray-300 p-2 text-right">Amount</th>
          <th className="border border-gray-300 p-2 text-left">Date</th>
          <th className="border border-gray-300 p-2 text-left">Status</th>
          <th className="border border-gray-300 p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map(({ id, name, email, amount, date, status, image_url }) => (
          <tr key={id} className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2 flex items-center gap-2">
              {image_url && (
                <Image
                  src={image_url}
                  alt={`${name}'s avatar`}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              {name}
            </td>
            <td className="border border-gray-300 p-2">{email}</td>
            <td className="border border-gray-300 p-2 text-right">
              ${(amount / 100).toFixed(2)}
            </td>
            <td className="border border-gray-300 p-2">
              {new Date(date).toLocaleDateString()}
            </td>
            <td className="border border-gray-300 p-2 capitalize">{status}</td>
            <td className="border border-gray-300 p-2 text-center">
              <Link href={`/dashboard/invoices/${id}/edit`} className="text-blue-500 hover:underline">
                <PencilIcon className="w-5 h-5 inline text-blue-600 hover:text-blue-800" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
