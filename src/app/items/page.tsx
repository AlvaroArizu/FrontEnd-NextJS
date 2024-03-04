import React from "react";
import Link from "next/link";

export default async function ItemsPage({ searchParams }: { searchParams: { search: string } }) {
    const { results } = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${searchParams.search}&limit=4`)
        .then(res =>
            res.json() as Promise<{
                results: {
                    id: string;
                    title: string;
                    thumbnail: string;
                    price: number;
                    currency_id: string;
                    seller_address: {
                        city: {
                            name: string;
                        };
                    };
                }[];
            }>
        );
    return (
        <section className="max-w-screen-lg mx-auto">
            <article className="grid gap-4">
                {results.map((item) => (
                    <Link href={`/items/${item.id}`} key={item.id}>
                        <div className="flex gap-4 p-4 border rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                            <img src={item.thumbnail} alt={item.title} className="w-32 h-32 object-cover rounded-lg" />
                            <div className="flex flex-col justify-between">
                                <div>
                                    <p className="font-bold text-lg text-gray-900">{item.title}</p>
                                    <p className="text-gray-700">Price: {Number(item.price).toLocaleString('es-AR', {style: 'currency', currency: item.currency_id})}</p>
                                </div>
                                <p className="text-sm text-gray-500">City: {item.seller_address?.city?.name ?? 'No disponible'}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </article>
        </section>
    );
}

