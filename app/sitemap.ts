import { site, services, products } from './content';
export default function sitemap() { return ['', '/services', '/products', '/gallery', '/videos', '/contact', ...services.map(s => '/services/' + s.id), ...products.map(p => '/products/' + p.id)].map(path => ({ url: site.origin + path })); }
