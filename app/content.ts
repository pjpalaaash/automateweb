export const site = {
    name: 'Automate_in',
    title: 'Automate_in | Home & Office Automation in Jabalpur',
    description: 'Explore smart lighting, security, climate control, home theatre, voice control and curtain automation with Automate_in in Jabalpur.',
    origin: 'https://primezen-experience.lewan55.chatgpt.site',
    phone: '+91 9424786074', phoneHref: 'tel:+919424786074',
    email: 'automatein79@gmail.com', whatsapp: 'https://wa.me/919424786074',
    instagram: 'https://www.instagram.com/automate_in',
    address: '71/A Rameshwaram Colony, in front of Croma Showroom, Ekta Chowk, Jabalpur, Madhya Pradesh 482002',
    // Enable only after configuring ENQUIRY_ENDPOINT and business-approved policies.
    enquiriesEnabled: false,
    privacyUrl: '', termsUrl: '',
};
export const services = [
    { id: 'smart-lighting', title: 'Smart Lighting', icon: 'lighting', image: 'living.webp', short: 'Set the mood with lighting scenes, dimming, colour tuning and schedules that follow your day.', detail: 'Create lighting that suits the moment, from an evening atmosphere to a scheduled morning routine. Bring compatible lights into scenes and use motion triggers where they add convenience.', uses: ['An evening living-room scene', 'Motion-triggered passage lighting', 'Sunrise and sunset schedules'], cta: 'Plan My Lighting', note: 'We’ll discuss your fixtures, electrical loads, wiring and the colour or dimming controls they support.' },
    { id: 'security-surveillance', title: 'Security & Surveillance', icon: 'security', image: 'entrance.webp', short: 'Connect smart locks, video doorbells and CCTV with mobile alerts and security routines.', detail: 'Build a connected approach to entry control and monitoring. Discuss suitable locks, cameras and doorbells, together with alerts and location-based routines supported by the selected system.', uses: ['Doorbell notifications', 'Supported camera feeds', 'Configured arming when leaving'], cta: 'Discuss Home Security', note: 'Recording, storage, access methods, backup power and any recurring fees depend on the selected equipment.' },
    { id: 'climate-energy', title: 'Climate & Energy', icon: 'climate', image: 'living.webp', short: 'Manage compatible ACs and fans by zone, with occupancy-aware routines for everyday comfort.', detail: 'Coordinate cooling and fan operation around the areas you use. A suitable configuration can help reduce unnecessary operation while keeping everyday controls convenient.', uses: ['Room-based AC and fan control', 'Occupancy-aware routines', 'Less unnecessary operation'], cta: 'Explore Climate Control', note: 'Compatibility and energy savings depend on your equipment, configuration and usage. Energy metering is discussed separately.' },
    { id: 'home-theatre', title: 'Home Theatre', icon: 'theatre', image: 'theatre.webp', short: 'Bring movie, music and gaming experiences together through one-touch entertainment scenes.', detail: 'Make entertainment easier to enjoy with coordinated control of compatible AV equipment, screens and audio zones. Discuss scenes that bring the right devices together for your preferred experience.', uses: ['Coordinated movie scenes', 'Music across configured rooms', 'Gaming and entertainment routines'], cta: 'Plan My Entertainment Space', note: 'Equipment supply, supported formats, speakers, screens and any acoustic work are confirmed in your proposal.' },
    { id: 'voice-app-control', title: 'Voice & App Control', icon: 'voice', image: 'living.webp', short: 'Manage compatible devices through Alexa, Google Home and an integrated app experience.', detail: 'Bring everyday controls together in a way your household can use. Activate supported routines by voice or manage connected systems through the selected app.', uses: ['A morning routine', 'A movie-night routine', 'Voice control for compatible lights'], cta: 'Simplify My Controls', note: 'The app, supported devices, cloud requirements, offline behaviour and any recurring fees depend on the selected system.' },
    { id: 'curtains-blinds', title: 'Curtain & Blind Automation', icon: 'curtains', image: 'living.webp', short: 'Open and close motorized curtains and blinds through convenient daily routines.', detail: 'Make natural light and privacy part of your routine. Discuss motorized window coverings and a configuration suited to your windows, curtains and daily schedule.', uses: ['Morning opening', 'Closing at dusk', 'Scheduled bedroom routines'], cta: 'Automate My Curtains', note: 'Motor, track size, curtain weight, power requirements and manual override are checked for your space.' },
];
export const products = [
    { id: 'lighting-controls', title: 'Lighting & dimming controls', service: 'smart-lighting', icon: 'lighting', image: 'living.webp', text: 'Set comfortable light levels and bring compatible fixtures into everyday scenes.' },
    { id: 'motion-occupancy', title: 'Motion & occupancy sensing', service: 'climate-energy', icon: 'sensor', image: 'living.webp', text: 'Use presence and movement to inform lighting and comfort routines.' },
    { id: 'smart-locks', title: 'Smart locks', service: 'security-surveillance', icon: 'lock', image: 'entrance.webp', text: 'Explore entry controls and access methods suited to your doors and household.' },
    { id: 'video-doorbells', title: 'Video doorbells', service: 'security-surveillance', icon: 'bell', image: 'entrance.webp', text: 'Discuss connected visitor notifications and supported entryway monitoring.' },
    { id: 'cctv', title: 'CCTV systems', service: 'security-surveillance', icon: 'camera', image: 'entrance.webp', text: 'Plan camera coverage, viewing and recording around your property.' },
    { id: 'ac-fan-controls', title: 'AC & fan controls', service: 'climate-energy', icon: 'climate', image: 'living.webp', text: 'Coordinate compatible cooling and fan equipment by room or zone.' },
    { id: 'av-audio', title: 'AV & multi-room audio', service: 'home-theatre', icon: 'theatre', image: 'theatre.webp', text: 'Connect compatible entertainment equipment, screens and audio zones.' },
    { id: 'voice-app', title: 'Voice & app control', service: 'voice-app-control', icon: 'voice', image: 'living.webp', text: 'Bring supported systems together through convenient voice and app controls.' },
    { id: 'motorized-curtains', title: 'Motorized curtains & blinds', service: 'curtains-blinds', icon: 'curtains', image: 'living.webp', text: 'Explore motors and track systems suited to your windows and daily routines.' },
];
export const gallery = [
    { title: 'An evening, beautifully lit', category: 'Smart Living', image: 'living.webp', position: 'center', caption: 'A warm living-room concept for scene-based lighting.' },
    { title: 'A more connected welcome', category: 'Security & Surveillance', image: 'entrance.webp', position: 'center', caption: 'An illustrative entrance with discreet connected access controls.' },
    { title: 'Comfort where you need it', category: 'Climate & Energy', image: 'living.webp', position: 'right', caption: 'A living-space concept for coordinated cooling and occupancy routines.' },
    { title: 'Everyday routines, simplified', category: 'Voice & App Control', image: 'living.webp', position: 'left', caption: 'An illustrative setting for compatible voice and app routines.' },
    { title: 'Make an evening of it', category: 'Home Theatre', image: 'theatre.webp', position: 'center', caption: 'A home-theatre concept with coordinated entertainment and lighting.' },
    { title: 'Let the morning in', category: 'Curtain & Blind Automation', image: 'living.webp', position: 'right', caption: 'A window-covering concept for scheduled light and privacy.' },
];
// Add business-approved MP4/WebM URLs here. No third-party customer footage is included.
export const videos: {
    title: string;
    description: string;
    poster: string;
    src: string;
    captions?: string;
}[] = [
    { title: 'Immersive Theatre Experience', description: 'Movie, music and lighting, brought together in one considered scene.', poster: 'theatre.webp', src: '' },
    { title: 'Intelligent Home Living', description: 'A look at the everyday possibilities of connected lighting and controls.', poster: 'living.webp', src: '' },
];
export const nav = [['Home', '/'], ['About', '/#about'], ['Services', '/services'], ['Products', '/products'], ['Gallery', '/gallery'], ['Videos', '/videos'], ['Contact', '/contact']];
export function enquiry(interest: string) { return '/contact?interest=' + encodeURIComponent(interest); }
