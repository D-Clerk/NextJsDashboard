// src/app/customers/[id]/edit/page.jsx

import { fetchCustomerById } from '@/app/lib/data';
import EditCustomerForm from '@/app/ui/customers/edit-form';

export default async function EditCustomerPage({ params }) {
  const customer = await fetchCustomerById(params.id);

  return (
    <main>
      <h1>Edit Customer</h1>
      <EditCustomerForm customer={customer} />
    </main>
  );
}
