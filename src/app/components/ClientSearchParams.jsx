import ClientSearchParams from '@/app/components/ClientSearchParams';

export default async function Page() {
  const invoices = await fetchInvoices(); // server-side fetch

  const handleQuery = (query) => {
    console.log('Query from URL:', query);
  };

  return (
    <div>
      <ClientSearchParams onChange={handleQuery} />
      {/* invoices table */}
    </div>
  );
}
