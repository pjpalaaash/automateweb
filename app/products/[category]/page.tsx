import { notFound } from 'next/navigation';
import Experience from '../../experience';
import { products } from '../../content';
export async function generateMetadata({ params }: {
    params: Promise<{
        category: string;
    }>;
}) { const { category } = await params; const p = products.find(x => x.id === category); return { title: p?.title || 'Category not found', description: p?.text, alternates: { canonical: '/products/' + category }, openGraph: { title: p?.title, description: p?.text, url: '/products/' + category }, twitter: { title: p?.title, description: p?.text } }; }
export default async function Page({ params }: {
    params: Promise<{
        category: string;
    }>;
}) { const { category } = await params; if (!products.some(p => p.id === category))
    notFound(); return <Experience page="product" detailId={category}/>; }
