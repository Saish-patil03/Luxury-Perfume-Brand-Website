import { useEffect, useRef, useState } from "react";
import { imageSrcSet } from "./photography";

export type VisualFrame = { image: string; alt: string; caption?: string; fit?: "contain" | "cover" };

function validFrameIndex(index: number, count: number) {
  return count > 0 && Number.isInteger(index) && index >= 0 && index < count ? index : 0;
}

export function useAutomaticSequence(count: number, interval = 1800, enabled = true) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setActive(previous => validFrameIndex(previous, count));
  }, [count]);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update(); preference.addEventListener("change", update);
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { threshold: .15 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); preference.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    if (!enabled || paused || !visible || reducedMotion || count < 2) return;
    const timer = window.setInterval(() => { if (!document.hidden) setActive(previous => (previous + 1) % count); }, interval);
    return () => window.clearInterval(timer);
  }, [count, interval, enabled, paused, visible, reducedMotion]);
  return { active: validFrameIndex(active, count), paused: paused || reducedMotion || !visible, reducedMotion, root, select: (index: number) => { setActive(validFrameIndex(index, count)); setPaused(true); }, toggle: () => setPaused(previous => !previous) };
}

export default function AutomaticVisual({ frames, className = "", interval = 2800, index, paused, onToggle, controls = true }: { frames: VisualFrame[]; className?: string; interval?: number; index?: number; paused?: boolean; onToggle?: () => void; controls?: boolean }) {
  const sequence = useAutomaticSequence(frames.length, interval, index === undefined);
  const active = validFrameIndex(index ?? sequence.active, frames.length);
  const activeFrame = frames[active];
  const stopped = paused ?? sequence.paused;
  return <div className={`automatic-visual ${className}`} ref={sequence.root} data-paused={stopped}>
    {frames.map((frame, frameIndex) => <div key={`${frame.image}-${frameIndex}`} className={`visual-frame ${frame.fit === "contain" ? "product-photograph" : ""} ${frameIndex === active ? "is-active" : ""}`} aria-hidden={frameIndex !== active}>
      <img src={frame.image} srcSet={imageSrcSet(frame.image)} sizes="(max-width: 700px) 100vw, 60vw" alt={frame.alt} loading="lazy" decoding="async" />
    </div>)}
    {activeFrame?.caption && <span className="visual-caption" key={`caption-${active}`}>{activeFrame.caption}</span>}
    {controls && activeFrame && (frames.length > 1 || onToggle) && !sequence.reducedMotion && <button className="campaign-motion-access" aria-pressed={!stopped} onClick={onToggle ?? sequence.toggle}>AUTOMATIC IMAGE TRANSITIONS {stopped ? "OFF" : "ON"}</button>}
  </div>;
}
