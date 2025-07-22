import { getInvoiceById, getCustomers } from '@/app/lib/data';
import EditInvoiceForm from '@/app/ui/invoices/edit-form';

export default async function EditInvoicePage({ params }) {
  const invoice = await getInvoiceById(params.id);
  const customers = await getCustomers();

  return (
    <main className="p-4">
      
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
}
