'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
    ProductsTable
  } from './definitions';
import fs from 'fs';
import path from 'path';

const ProductFormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Please enter a name.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter a amount greater than $0.' }),
    data: z.string(),
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

const CreateProduct = ProductFormSchema.omit({ id: true, data:true });
const UpdateProduct = ProductFormSchema.omit({ id: true });

export type ProductState = {
    errors?: {
        name?: string[];
        image?: string[];
        amount?: string[];
    };
    message?: string | null;
};

export async function createProduct(prevState: ProductState, formData: FormData) {
    const validatedFields = CreateProduct.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Product.',
        };
    }

    const { name, amount } = validatedFields.data;

    // Handle image upload
    const imageFile = formData.get('image') as File;
    let image_url = '';

    if (imageFile) {
        const imagePath = path.join(process.cwd(), 'public', 'products', imageFile.name);
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        fs.writeFileSync(imagePath, new Uint8Array(buffer));
        image_url = `/products/${imageFile.name}`; // Set the image URL to the relative path
    }


    try {
        await sql`
          INSERT INTO products (name, image_url, amount)
          VALUES (${name}, ${image_url}, ${amount})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Product.',
        };
    }

    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
}

 
const ITEMS_PER_PAGE = 6;
export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await sql<ProductsTable>`
      SELECT
        products.id,
        products.name,
        products.image_url,
        products.data,
        products.amount
      FROM products
      WHERE
        products.name ILIKE ${`%${query}%`}
      ORDER BY products.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchProductsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM products
    WHERE
      products.name ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchProductById(id: string) {
  try {
    const data = await sql<ProductsTable>`
      SELECT
        products.id,
        products.name,
        products.image_url,
        products.data,
        products.amount
      FROM products
      WHERE products.id = ${id};
    `;

    const product = data.rows.map((product) => ({
      ...product,
      // Convert amount from cents to dollars
      amount: product.amount / 100,
    }));

    return product[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function deleteProduct(id: string) {
    // throw new Error('Failed to Delete Product');
    try {
        await sql`DELETE FROM products WHERE id = ${id}`;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Product.',
        };
    }
    revalidatePath('/dashboard/products');
}
