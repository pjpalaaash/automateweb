import type { Metadata } from 'next';
import './globals.css';
import { site } from './content';
export const metadata: Metadata = { metadataBase: new URL(site.origin), title: { default: site.title, template: '%s | Automate_in' }, description: site.description, icons: { icon: '/favicon.svg' }, openGraph: { title: site.title, description: site.description, siteName: site.name, type: 'website' }, twitter: { card: 'summary', title: site.title, description: site.description } };
export default function Layout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en"><body>{children}</body></html>; }
