'use client';

import { useEffect, useState } from 'react';
import InvoicesTable from '@/app/ui/invoices/InvoicesTable';
import Search from '@/app/ui/invoices/search';
import Pagination from '@/app/ui/invoices/pagination';
import { CreateInvoice } from '@/app/ui/invoices/buttons';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchInvoices() {
      setLoading(true);
      try {
        const res = await fetch(`/api/invoices?query=${encodeURIComponent(query)}&page=${currentPage}`);
        if (!res.ok) throw new Error('Failed to fetch invoices');
        const data = await res.json();
        setInvoices(data.invoices);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error('Failed to fetch invoices', err);
        setInvoices([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    fetchInvoices();
  }, [query, currentPage]);

  return (
    <div className="w-full p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <CreateInvoice />
      </div>

      <Search value={query} onChange={(val) => { setQuery(val); setCurrentPage(1); }} />

      {loading ? (
        <p className="mt-8 text-center text-gray-600">Loading invoices...</p>
      ) : (
        <>
          <InvoicesTable invoices={invoices} />
          <div className="mt-6 flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
