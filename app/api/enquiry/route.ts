import { site } from '../../content';
export async function POST(request: Request) {
    if (!site.enquiriesEnabled || !process.env.ENQUIRY_ENDPOINT || !site.privacyUrl)
        return Response.json({ error: 'Online enquiries are not available yet.' }, { status: 503 });
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin && origin !== site.origin)
        return Response.json({ error: 'Invalid origin' }, { status: 403 });
    const raw = await request.text();
    if (raw.length > 12000)
        return Response.json({ error: 'Request too large' }, { status: 413 });
    let body: Record<string, unknown>;
    try {
        body = JSON.parse(raw);
    }
    catch {
        return Response.json({ error: 'Invalid request' }, { status: 400 });
    }
    if (!body || typeof body !== 'object' || Array.isArray(body))
        return Response.json({ error: 'Invalid request' }, { status: 400 });
    if (body.website)
        return Response.json({ error: 'Request rejected' }, { status: 400 });
    const limits: Record<string, number> = { name: 120, email: 254, phone: 30, city: 120, projectType: 80, interest: 160, message: 4000 };
    const data: Record<string, string> = {};
    for (const [key, max] of Object.entries(limits)) {
        const v = body[key] ?? '';
        if (typeof v !== 'string' || v.length > max)
            return Response.json({ error: 'Invalid fields' }, { status: 400 });
        data[key] = v.trim();
    }
    if (!data.name || !/^\S+@\S+\.\S+$/.test(data.email) || data.message.length < 10 || !['Home Automation', 'Office Automation', 'Renovation/Retrofit', 'Consultation'].includes(data.projectType))
        return Response.json({ error: 'Please check required fields' }, { status: 400 });
    try {
        const endpoint = new URL(process.env.ENQUIRY_ENDPOINT);
        if (endpoint.protocol !== 'https:')
            throw new Error();
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(process.env.ENQUIRY_TOKEN ? { Authorization: 'Bearer ' + process.env.ENQUIRY_TOKEN } : {}) }, body: JSON.stringify(data), signal: AbortSignal.timeout(10000), redirect: 'error' });
        if (!response.ok)
            throw new Error();
        const receipt = await response.json() as {
            delivered?: boolean;
        };
        if (receipt.delivered !== true)
            throw new Error();
        return Response.json({ delivered: true });
    }
    catch {
        return Response.json({ error: 'Unable to send your enquiry. Please contact us by phone.' }, { status: 502 });
    }
}
