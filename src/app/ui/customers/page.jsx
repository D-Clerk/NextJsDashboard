// src/app/ui/customers/page.jsx
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/20/solid';
import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import Search from '@/app/ui/customers/search';

export default async function Page({ searchParams }) {
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <Search placeholder="Search customers..." />
        </div>
        <Link
          href="/customers/new"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          New Customer
        </Link>
      </div>
      <CustomersTable customers={customers} />
    </div>
  );
}
