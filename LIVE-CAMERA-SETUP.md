# Live Room Simulator

## Updating your existing site
Copy these three files into the matching `app` folder in your GitHub repository:

- `app/lighting.tsx` (replace)
- `app/live-camera.tsx` (new)
- `app/live-camera.css` (new)

Commit to your Vercel production branch and wait for deployment. No new packages,
API keys, backend, or environment variables are needed. The complete project is
also included in this ZIP. Existing content, Vercel settings and site URL are preserved.

## Use
Go to The Lighting Studio and choose Live Camera, then Open camera. Allow camera
access. Colour, brightness and the five presets are shared with Studio mode.
Show original toggles the unfiltered feed; Show lighting restores the effect.
Use Switch camera or the camera selector (when multiple cameras are available).
Close camera, switching to Studio, leaving the page or hiding the browser tab
stops the stream. Returning to the tab requires opening the camera again.

## Privacy and compatibility
Only video permission is requested. This feature neither records nor uploads
camera frames. All preview effects run locally in the browser. Use the published
HTTPS URL, or localhost for local development. A phone accessing an ordinary
HTTP LAN address cannot use the camera. In-app browsers and embedded previews
may restrict camera access: open the published URL directly in Safari or Chrome.
Camera selection depends on the hardware/browser; a single-camera device may
keep the same camera when Switch camera is pressed.

This is an illustrative full-image colour/brightness overlay, not AR wall
segmentation, a lux calculation or physical smart-light control. The camera's
automatic exposure and white balance affect the result.

## Customization
Preset names, hue and brightness: `app/lighting.tsx` (`moods`).
Camera lifecycle, messages and preview: `app/live-camera.tsx`.
Layout and colours: `app/live-camera.css`.
The default camera preference is rear/environment.

## Local check
Run `pnpm install --frozen-lockfile`, then `pnpm dev` and visit
http://localhost:5173. Use `pnpm build` for the production build.

Before launch, test on an actual iPhone/Android device: allow and deny permission,
switch cameras, compare original, change presets and brightness, close camera,
and change tabs. The camera indicator should turn off after closing the camera.
