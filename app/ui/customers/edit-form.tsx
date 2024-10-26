'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState, useState } from 'react';
import { createCustomer, CustomerState } from '@/app/lib/customer-actions';
import { Customer } from '@/app/lib/definitions';

export default function Form({
  customer
}: {
  customer: Customer;
}) {
  const initialState: CustomerState = { message: null, errors: {} };
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle image upload and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const [state, formAction] = useActionState(createCustomer, initialState);

  return (
    <form
      action={formAction}
      encType="multipart/form-data" // Add this to enable file uploads
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Enter a name
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="name"
              name="name"
              type="text"
              placeholder={customer.name}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
          {state.errors?.name && (
            <p className="mt-2 text-sm text-red-500">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Enter an email
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="email"
              name="email"
              type="email"
              placeholder={customer.email}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
          {state.errors?.email && (
            <p className="mt-2 text-sm text-red-500">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        {/* Image File */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">
            Upload an image
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*" // Accept only image files
              onChange={handleImageChange}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
          {/* Preview uploaded image */}
          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium">Image Preview:</p>
              <img src={previewUrl} alt="Preview" className="mt-2 max-h-32" />
            </div>
          )}
          {state.errors?.image && (
            <p className="mt-2 text-sm text-red-500">
              {state.errors.image[0]}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
