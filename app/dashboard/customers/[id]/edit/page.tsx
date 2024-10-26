
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomereById } from '@/app/lib/customer-actions';
import { notFound } from 'next/navigation';
import Form from '@/app/ui/customers/edit-form';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const  [customer] = await Promise.all([
      fetchCustomereById(id)
    ]);
    
  if (!customer) {
    notFound();
  }
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/cutomers' },
          {
            label: 'Edit Customers',
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form customer={customer} />
    </main>
  );
}