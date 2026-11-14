// A dotted 3D globe with a red marker on every client country. Drag to turn; still under reduced motion.
import createGlobe from 'https://cdn.jsdelivr.net/npm/cobe@0.6.3/+esm';

const LL = { us: [38, -97], ca: [56, -106], fr: [46.2, 2.2], au: [-25, 134], gb: [54, -2], my: [4.2, 102], qa: [25.3, 51.2], de: [51, 10],
  at: [47.5, 14.5], ae: [24, 54], in: [21, 78], pk: [30, 70], hk: [22.3, 114.2], pt: [39.5, -8], ma: [31.8, -7], eg: [26.8, 30.8],
  ps: [31.9, 35.2], zm: [-13, 27.8], th: [15.8, 101], sa: [23.9, 45], kr: [36.5, 128], no: [60.5, 8.5], sg: [1.35, 103.8] };

const canvas = document.getElementById('globe');
if (canvas) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const markers = (window.COUNTRY_COUNTS || []).filter(c => LL[c.cc]).map(c => ({ location: LL[c.cc], size: 0.035 + Math.min(c.n || 1, 22) * 0.0035 }));
  markers.push({ location: LL.pk, size: 0.1 });                     // home
  let phi = 1.2, drag = null, dragPhi = 0, vel = 0;
  const size = () => canvas.offsetWidth * 2;
  const globe = createGlobe(canvas, {
    devicePixelRatio: 2, width: size(), height: size(), phi, theta: 0.28,
    dark: 1, diffuse: 1.15, mapSamples: 16000, mapBrightness: 5.5, mapBaseBrightness: 0.02,
    baseColor: [0.32, 0.31, 0.3], markerColor: [1, 0.24, 0.18], glowColor: [0.28, 0.1, 0.08],
    markers,
    onRender(state) {
      if (drag === null) { phi += reduce ? 0 : 0.0028 + vel; vel *= 0.94; }
      state.phi = phi + dragPhi; state.width = size(); state.height = size();
    }
  });
  canvas.addEventListener('pointerdown', e => { drag = e.clientX; canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; });
  canvas.addEventListener('pointermove', e => { if (drag !== null) { const d = (e.clientX - drag) / 200; vel = d - dragPhi; dragPhi = d; } });
  const end = () => { if (drag !== null) { phi += dragPhi; dragPhi = 0; vel = Math.max(-0.05, Math.min(0.05, vel * 0.2)); drag = null; canvas.style.cursor = ''; } };
  canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
  requestAnimationFrame(() => canvas.style.opacity = 1);
  window.addEventListener('pagehide', () => globe.destroy());
}
