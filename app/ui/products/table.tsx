import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { fetchFilteredProducts } from '@/app/lib/product-actions';
import { EyeIcon } from '@heroicons/react/24/outline';

export default async function ProductsTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const products = await fetchFilteredProducts(query, currentPage);
    return (
        <div className="w-full">
            <div className="mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                                    <tr>
                                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-5 font-medium">
                                            View
                                        </th>
                                        <th scope="col" className="px-3 py-5 font-medium">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 text-gray-900">
                                    {products.map((product, index) => (
                                        <tr key={index} className="group">
                                            <td className=" bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                                                {product.name}
                                            </td>
                                            <td>
                                                <EyeIcon className='w-4 border-blue-200'/>
                                            <div className="flex hidden items-center gap-3">
                                                    <Image
                                                        src={`${product.image_url}`}
                                                        className=""
                                                        alt={`${product.name}'s picture`}
                                                        width={280}
                                                        height={280}
                                                    />
                                                    <div className="flex justify-between px-2 py-4">
                                                       <p>{product.name}
                                                        </p> 
                                                        <p>{product.amount}
                                                            </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td >
                                                {product.amount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
