'use client';
import { useState, useEffect, useRef, type ComponentProps } from 'react';
import LiveCamera from './live-camera';
import { Slider } from '@/components/ui/slider';
import { Moon, Film, Sun, Lightbulb, Music } from 'lucide-react';
const img = (s: string) => '/media/' + s;
const moods = [{ name: 'Sleep', h: 18, b: 22, desc: 'A softer end to the day', icon: Moon }, { name: 'Movie', h: 275, b: 45, desc: 'Your own private screening', icon: Film }, { name: 'Dinner', h: 32, b: 72, desc: 'Warm light. Good company.', icon: Sun }, { name: 'Focus', h: 205, b: 100, desc: 'A little clarity for your day', icon: Lightbulb }, { name: 'Party', h: 320, b: 88, desc: 'Make the evening yours', icon: Music }];
function Eyebrow({ children }: {
    children: React.ReactNode;
}) { return <div className="eyebrow">{children}</div>; }
function Range(props: ComponentProps<typeof Slider>) { const ref = useRef<HTMLSpanElement>(null); useEffect(() => { ref.current?.querySelectorAll('[role=slider]').forEach(e => e.setAttribute('aria-label', props['aria-label'] || 'Adjust value')); }, [props['aria-label']]); return <span ref={ref} style={{ display: 'contents' }}><Slider {...props}/></span>; }
export default function Lighting() { const [live, setLive] = useState(false); const [mood, setMood] = useState('Dinner'), [hue, setHue] = useState(32), [bright, setBright] = useState(72); function select(name: string) { const m = moods.find(x => x.name === name); if (m) {
    setMood(m.name);
    setHue(m.h);
    setBright(m.b);
} } useEffect(() => { const context = (document as any).modelContext; if (!context?.registerTool)
    return; const life = new AbortController(); try {
    Promise.resolve(context.registerTool({ name: 'set_lighting_scene', description: 'Choose a lighting preset in the visible simulator. Does not control physical devices.', inputSchema: { type: 'object', properties: { scene: { type: 'string', enum: moods.map(m => m.name) } }, required: ['scene'], additionalProperties: false }, annotations: { readOnlyHint: false }, execute: async (input: {
            scene: string;
        }) => { if (!moods.some(m => m.name === input.scene))
            throw new Error('Unknown lighting scene'); select(input.scene); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); return { scene: input.scene, brightness: moods.find(m => m.name === input.scene)!.b }; } }, { signal: life.signal })).catch(() => { });
}
catch { } return () => life.abort(); }, []); const controls = <div className="lighting-controls glass"><div className="control-row"><label>COLOUR</label><Range aria-label="Light colour" className="hue-slider" min={0} max={360} value={[hue]} onValueChange={v => { setHue(v[0]); setMood('Custom'); }}/><i className="colour-dot" style={{ background: `hsl(${hue},90%,65%)` }}/></div><div className="control-row"><label>BRIGHTNESS</label><Range aria-label="Light brightness" value={[bright]} onValueChange={v => { setBright(v[0]); setMood('Custom'); }}/><output>{bright}%</output></div><div className="mood-buttons">{moods.map(m => <button key={m.name} aria-pressed={mood === m.name} onClick={() => select(m.name)}><m.icon size={14}/>{m.name}</button>)}</div><p>Illustrative lighting preview. Actual effects depend on your fixtures.</p></div>; return <div id="lighting"><div className="lighting-mode-bar"><span>The lighting studio</span><div className="lighting-mode-buttons" role="group" aria-label="Lighting preview mode"><button aria-pressed={!live} onClick={() => setLive(false)}>Studio</button><button aria-pressed={live} onClick={() => setLive(true)}>Live Camera</button></div></div>{live ? <LiveCamera hue={hue} bright={bright} mood={mood}>{controls}</LiveCamera> : <section className="lighting"><div className="lighting-photo" style={{ backgroundImage: `url(${img('living.webp')})`, filter: `brightness(${.35 + bright * .008})` }}/><div className="lighting-wash" style={{ background: `hsla(${hue},90%,52%,.36)` }}/><div className="lighting-shade"/><div className="lighting-copy"><Eyebrow>THE LIGHTING STUDIO</Eyebrow><h2>A little light.<br />A different <span>feeling.</span></h2><p>Explore a scene, then make it your own.</p><div className="now-playing"><i style={{ background: `hsl(${hue},100%,65%)` }}/><div><small>YOUR SCENE</small><b>{mood}</b><span>{moods.find(m => m.name === mood)?.desc || 'Perfectly tuned to you'}</span></div></div></div>{controls}</section>}</div>; }
