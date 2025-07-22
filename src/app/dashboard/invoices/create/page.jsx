import Form from '@/app/ui/invoices/create-form';
import { fetchCustomers } from '@/app/lib/data'; // or wherever you're getting customer data

export default async function CreateInvoicePage() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Form customers={customers} />
    </main>
  );
}
