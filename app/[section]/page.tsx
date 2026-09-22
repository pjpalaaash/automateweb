import { notFound } from 'next/navigation';
import Experience from '../experience';
const titles: Record<string, string> = { services: 'Automation Services', products: 'Product Categories', gallery: 'Connected Living Gallery', videos: 'Automation Videos', contact: 'Contact & Consultation' };
const descriptions: Record<string, string> = { services: 'Explore six automation services for homes and offices: lighting, security, climate, home theatre, voice control and curtains.', products: 'Discover automation device categories and request a quotation based on your space and requirements.', gallery: 'Explore illustrative lighting, security, comfort and entertainment concepts with Automate_in.', videos: 'Explore home theatre and intelligent living experiences with Automate_in.', contact: 'Contact Automate_in in Jabalpur to discuss your home or office automation project.' };
export async function generateMetadata({ params }: {
    params: Promise<{
        section: string;
    }>;
}) { const { section } = await params; return { title: titles[section] || 'Page not found', description: descriptions[section], alternates: { canonical: '/' + section }, openGraph: { title: titles[section], description: descriptions[section], url: '/' + section }, twitter: { title: titles[section], description: descriptions[section] } }; }
export default async function Page({ params }: {
    params: Promise<{
        section: string;
    }>;
}) { const { section } = await params; if (!titles[section])
    notFound(); return <Experience page={section}/>; }
