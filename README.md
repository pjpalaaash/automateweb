# Automate_in — home and office automation website

Complete editable website updated from the supplied Automate_in brief. The lighting simulator is retained. The old Primezen product catalogue, testimonials, pinned hero, before/after comparison and extra device simulators have been removed.

## Run locally

Requires Node.js 22.13 or newer. Open this folder in VS Code and run:

```sh
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:5173. For a production preview, run `pnpm build` then `pnpm start` and open the address printed by the terminal. Standard commands work through Node on Windows, macOS and Linux; the optional install:ci script requires Bash.

Stack: React, TypeScript, Tailwind and Vinext with Cloudflare Worker output. This is not a static HTML file; it needs the development server or a compatible deployment.

## Customisation map

- `app/content.ts`: central brand, contact links, service copy, product categories, gallery, films and enquiry settings.
- `app/experience.tsx`: site sections, navigation, gallery/video dialogs, filters and enquiry form.
- `app/lighting.tsx`: preserved lighting simulator; edit the `moods` array to change presets.
- `app/globals.css`: shared theme, layout, fonts, motion and responsive breakpoints.
- `app/layout.tsx`: site-wide metadata and favicon.
- `app/[section]/page.tsx`: Services, Products, Gallery, Videos and Contact landing pages.
- `app/services/[slug]/page.tsx`: service detail pages.
- `app/products/[category]/page.tsx`: category detail pages.
- `app/api/enquiry/route.ts`: server-side validation and configurable delivery adapter.
- `app/sitemap.ts`: sitemap. Update `site.origin` when moving to another domain.
- `public/media/`: locally hosted illustrative interior images.
- `public/fonts/`: local Manrope and Cormorant Garamond fonts and OFL licences.

## Content scope

Six service categories and nine product categories are based on the supplied brief. These are quotation categories, not a claim about stocked models. No fabricated prices, project counts, savings percentages, warranties or testimonials are included.

The three generated interior images are illustrative concepts, not completed client installations. The gallery uses different views and captions of these concepts. Replace these with approved project photographs and accurate captions when available.

## Enquiry delivery — currently disabled

No live enquiry destination or business-approved privacy/terms text was supplied. The website therefore displays an unavailable state and direct phone/email/WhatsApp links. The form does not send entries, and no submission is reported as delivered. Entries are kept only in the current page, not local storage.

To activate:

1. Publish business-approved privacy content and set `site.privacyUrl` in `app/content.ts`; add `site.termsUrl` if supplied.
2. Set the server environment variable `ENQUIRY_ENDPOINT` to your business-approved HTTPS delivery endpoint. Optional `ENQUIRY_TOKEN` is sent as a Bearer header. Never put tokens in client code.
3. The endpoint accepts JSON fields name, email, phone, city, projectType, interest and message. It must return a 2xx response with `{ "delivered": true }` only after confirmed delivery. A queue acceptance alone should not return this receipt. Adapt the server adapter if your provider uses a different API.
4. Add production rate limiting/spam filtering at the delivery endpoint or gateway. This code includes a honeypot, origin checks, field limits and server validation, but not durable rate limiting. Confirm data handling with the business.
5. Set `site.enquiriesEnabled` to true and rebuild. Test validation, duplicate-click protection, confirmed delivery and failures against your configured service before public launch.

Do not enable enquiries without the endpoint and privacy content. The API returns 503 while disabled. Failure preserves the visitor's entries; success resets the form only after a positive delivery receipt.

## Videos — awaiting approved assets

The Videos page contains the two themes from the brief: Immersive Theatre Experience and Intelligent Home Living. Since no approved video files were provided, it shows “Film coming soon”, with no fake play button and no reused customer footage.

Add an approved MP4 or WebM under `public/media/` and set its URL in `videos[].src` in `app/content.ts`, for example `/media/home-living.mp4`. Add an optional WebVTT caption URL in `videos[].captions`. The native video dialog then becomes available; media is loaded on request and unmounted on close. HLS/third-party embeds are not configured in this build; adapt the player if your approved assets require those formats.

## Contact and launch checks

Contact details are copied from the supplied brief. Verify the destination WhatsApp account, service coverage, approved policies and any future business claims before launch. No free site-visit, response-time or nationwide-installation promises are made.

The original Sites URL contains the previous project slug but the page branding and titles are Automate_in. Existing `.openai/hosting.json` retains that Site identity; do not reuse it as a new project's identity. Editing a downloaded copy does not automatically change the hosted website.

## Asset credits

- `living.webp`, `entrance.webp`, `theatre.webp`: newly generated illustrative interior concepts for this project; no third-party customer photographs or videos.
- Cormorant Garamond and Manrope: Google Fonts project, SIL Open Font License. Included licence files accompany the local fonts.
- Interface icons: lucide-react, under its package licence.

All content remains readable without JavaScript. Interactive controls, filters, dialogs and simulator require JavaScript. Reduced-motion preferences disable decorative animation and smooth scrolling.
