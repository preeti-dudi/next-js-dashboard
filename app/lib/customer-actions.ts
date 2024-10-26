'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import {
  Customer,
  CustomerField,
  CustomersTableType,
} from './definitions';
import { formatCurrency } from './utils';

const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  email: z.string({
    invalid_type_error: 'Please enter an email.',
  }),
  image: z
    .any()
  // .refine((file) => file instanceof File, {
  //     message: 'Please upload an image file.',
  // })
  // .refine((file) => file && file.size > 0, {
  //     message: 'Image file is required.',
  // })
  // .refine((file) => file && file.type.startsWith('image/'), {
  //     message: 'File must be an image.',
  // }),
});

const CreateCustomer = CustomerFormSchema.omit({ id: true });
const UpdateCustomer = CustomerFormSchema.omit({ id: true });

export type CustomerState = {
  errors?: {
    name?: string[];
    email?: string[];
    image?: string[];
  };
  message?: string | null;
};

export async function createCustomer(prevState: CustomerState, formData: FormData) {
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer.',
    };
  }

  const { name, email } = validatedFields.data;

  // Handle image upload
  const imageFile = formData.get('image') as File;
  let image_url = '';

  if (imageFile) {
    const imagePath = path.join(process.cwd(), 'public', 'customers', imageFile.name);
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    fs.writeFileSync(imagePath, new Uint8Array(buffer));
    image_url = `/customers/${imageFile.name}`; // Set the image URL to the relative path
  }


  try {
    await sql`
        INSERT INTO customers (name, email, image_url)
        VALUES (${name}, ${email}, ${image_url})
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Customer.',
    };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function editCustomer(id: string, prevState: CustomerState, formData: FormData) {
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Edit Customer.',
    };
  }

  const { name, email } = validatedFields.data;

  // Handle image upload
  const imageFile = formData.get('image') as File;
  let image_url = '';

  if (imageFile) {
    const imagePath = path.join(process.cwd(), 'public', 'customers', imageFile.name);
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    fs.writeFileSync(imagePath, new Uint8Array(buffer));
    image_url = `/customers/${imageFile.name}`; // Set the image URL to the relative path
  }


  try {
    await sql`
        UPDATE customers 
        SET name = ${name}, email${email}, image_url=${image_url}
        WHERE id=${id}
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Edit Customer.',
    };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}



export async function deleteCustomer(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    };
  }
  revalidatePath('/dashboard/customers');
}


const CUSTOMERS_PER_PAGE = 6;

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * CUSTOMERS_PER_PAGE;

  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC 
      LIMIT ${CUSTOMERS_PER_PAGE} OFFSET ${offset}
    
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchCustomerPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM customers
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / CUSTOMERS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}


export async function fetchCustomereById(id: string) {
  try {
    const data = await sql<Customer>`
      SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url
		FROM customers
		WHERE
		  customers.id = ${id}`;
    const customer = data.rows.map((customer) => customer);

    return <Customer>customer[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Customer.');
  }
}

