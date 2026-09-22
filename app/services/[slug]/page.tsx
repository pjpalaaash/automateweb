import { notFound } from 'next/navigation';
import Experience from '../../experience';
import { services } from '../../content';
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; const s = services.find(x => x.id === slug); return { title: s?.title || 'Service not found', description: s?.short, alternates: { canonical: '/services/' + slug }, openGraph: { title: s?.title, description: s?.short, url: '/services/' + slug }, twitter: { title: s?.title, description: s?.short } }; }
export default async function Page({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; if (!services.some(s => s.id === slug))
    notFound(); return <Experience page="service" detailId={slug}/>; }
