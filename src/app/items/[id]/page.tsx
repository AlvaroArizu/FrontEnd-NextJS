export default async function ItemPage({ params: { id } }: { params: { id: string } }) {
    const item = await fetch(`https://api.mercadolibre.com/items/${id}`)
        .then(
            res =>
                res.json() as Promise<{
                    id: string;
                    title: string;
                    thumbnail: string;
                    price: number;
                    currency_id: string;
                }>
        );
    const { plain_text } = await fetch(`https://api.mercadolibre.com/items/${id}/description`)
        .then(
            res =>
                res.json() as Promise<{
                    plain_text: string;
                }>
        );

    return (
        <section className="grid gap-4">
            <img src={item.thumbnail} alt={item.title} className="rounded-lg shadow-md" />
            <div>
                <p className="font-bold text-xl">Price: {Number(item.price).toLocaleString('es-AR', {style: 'currency', currency: item.currency_id})}</p>
                <p className="text-lg font-semibold">Title: {item.title}</p>
                <hr className="my-4" />
                <p className="text-gray-700">{plain_text}</p>
            </div>
        </section>
    );
}

