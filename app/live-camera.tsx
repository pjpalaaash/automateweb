'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Camera, CameraOff, RefreshCw } from 'lucide-react';
import './live-camera.css';

type Props = { hue: number; bright: number; mood: string; children: ReactNode };

export default function LiveCamera({ hue, bright, mood, children }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const request = useRef(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'live'>('idle');
  const [message, setMessage] = useState('Open your camera to try lighting in your own room.');
  const [facing, setFacing] = useState<'user' | 'environment'>('environment');
  const [mirrored, setMirrored] = useState(false);
  const [original, setOriginal] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState('');

  const release = useCallback(() => {
    request.current += 1;
    stream.current?.getTracks().forEach(track => track.stop());
    stream.current = null;
    if (video.current) video.current.srcObject = null;
  }, []);

  const stop = useCallback(() => {
    release();
    setStatus('idle');
    setOriginal(false);
    setMessage('Camera is off. Open it again whenever you are ready.');
  }, [release]);

  useEffect(() => {
    const hide = () => { if (document.hidden) stop(); };
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('pagehide', stop);
    return () => {
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('pagehide', stop);
      release();
    };
  }, [release, stop]);

  async function start(nextFacing = facing, selectedId?: string) {
    release();
    const token = request.current;
    setOriginal(false);
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setStatus('idle');
      setMessage('Camera access needs HTTPS or localhost. Open the published site in Safari or Chrome.');
      return;
    }
    setStatus('loading');
    setMessage('Allow camera access in your browser. You can cancel below.');
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { ...(selectedId ? { deviceId: { exact: selectedId } } : { facingMode: { ideal: nextFacing } }), width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      if (request.current !== token) { media.getTracks().forEach(track => track.stop()); return; }
      stream.current = media;
      const track = media.getVideoTracks()[0];
      const settings = track.getSettings();
      setFacing(settings.facingMode === 'user' ? 'user' : settings.facingMode === 'environment' ? 'environment' : nextFacing);
      setMirrored(settings.facingMode === 'user');
      setDeviceId(settings.deviceId || '');
      track.addEventListener('ended', () => { if (request.current === token) { stop(); setMessage('Camera disconnected. Reconnect it and try again.'); } });
      if (!video.current) { release(); return; }
      video.current.srcObject = media;
      await video.current.play();
      if (request.current !== token) return;
      setStatus('live');
      setMessage('Camera is live. Choose a scene or adjust the controls.');
      try {
        const available = await navigator.mediaDevices.enumerateDevices();
        if (request.current === token) setDevices(available.filter(device => device.kind === 'videoinput'));
      } catch { /* Device enumeration is optional; the current camera still works. */ }
    } catch (error) {
      if (request.current !== token) return;
      release();
      setStatus('idle');
      const name = error instanceof Error ? error.name : '';
      setMessage(name === 'NotAllowedError' || name === 'SecurityError'
        ? 'Camera access was blocked. Allow Camera in your browser site settings, then try again. In an embedded preview, open the site in a new tab.'
        : name === 'NotFoundError' ? 'No camera was found. Connect a camera or return to Studio mode.'
        : name === 'NotReadableError' ? 'The camera is busy or unavailable. Close other camera apps and try again.'
        : name === 'OverconstrainedError' ? 'That camera is unavailable. Try Open camera to use the default camera.'
        : 'Could not start the camera. Check browser permissions and try again.');
    }
  }

  return <section className="live-room" aria-label="Live room lighting simulator">
    <header className="live-room-heading"><div><div className="eyebrow">YOUR ROOM, IN A NEW LIGHT</div><h2>Make the mood <em>yours.</em></h2></div><p>Try lighting on your live camera view. Video stays on your device; no audio is requested or video uploaded.</p></header>
    <div className="live-room-grid">
      <div>
        <div className="live-room-view">
          <video ref={video} autoPlay muted playsInline aria-label="Live camera preview" style={{ transform: mirrored ? 'scaleX(-1)' : undefined, filter: original ? 'none' : `brightness(${.35 + bright * .008})` }} />
          {status === 'live' && !original && <div className="live-room-wash" style={{ background: `hsla(${hue},90%,52%,.36)` }} />}
          {status !== 'live' && <div className="live-room-placeholder"><Camera size={42} aria-hidden="true"/><h3>{status === 'loading' ? 'Waiting for your camera' : 'A preview of your own space'}</h3><p>{message}</p><button className="button" onClick={() => status === 'loading' ? stop() : void start()}>{status === 'loading' ? 'Cancel' : 'Open camera'}</button></div>}
          {status === 'live' && <div className="live-room-badge"><span/>LIVE · {original ? 'Original view' : mood}</div>}
        </div>
        <p className="live-room-status" role="status" aria-live="polite">{message}</p>
        <div className="live-room-actions">
          <button disabled={status !== 'live'} onClick={() => void start(facing === 'environment' ? 'user' : 'environment')}><RefreshCw size={16}/>Switch camera</button>
          <button disabled={status !== 'live'} aria-pressed={original} onClick={() => setOriginal(!original)}>{original ? 'Show lighting' : 'Show original'}</button>
          <button disabled={status === 'idle'} onClick={stop}><CameraOff size={16}/>Close camera</button>
        </div>
        {devices.length > 1 && <label className="live-room-device">Camera<select value={deviceId} disabled={status !== 'live'} onChange={event => void start(facing, event.target.value)}>{devices.map((device, index) => <option key={device.deviceId} value={device.deviceId}>{device.label || `Camera ${index + 1}`}</option>)}</select></label>}
      </div>
      <div className="live-room-panel">{children}<p className="live-room-note">A colour and brightness preview, not a physical lighting measurement. The effect covers the whole image; it does not detect walls or control real lights.</p></div>
    </div>
  </section>;
}
