import { useEffect, useRef, useState } from "react";

export default function CinematicEntrance({ onEnter, onHandoff }: { onEnter: (target?: string) => void; onHandoff: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [failed, setFailed] = useState(false);
  const [campaign, setCampaign] = useState(false);
  const [wordmark, setWordmark] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const enterRef = useRef(onEnter);
  const handoffRef = useRef(onHandoff);
  enterRef.current = onEnter;
  handoffRef.current = onHandoff;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    if (!leaving) return;
    handoffRef.current();
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 300 : 1200;
    const timer = window.setTimeout(() => enterRef.current(), delay);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  return (
    <section className={`opening-film${leaving ? " is-leaving" : ""}${campaign ? " is-campaign" : ""}`} role="dialog" aria-modal="true" aria-label="NEVORA opening fragrance film">
      <div className="opening-campaign-curtain" aria-hidden="true" />
      <video
        ref={videoRef}
        className="opening-film-media"
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        loop={false}
        disablePictureInPicture
        aria-label="NEVORA cinematic perfume campaign"
        onPlaying={() => setFailed(false)}
        onTimeUpdate={({ currentTarget }) => {
          if (currentTarget.currentTime >= 5) setCampaign(true);
          if (currentTarget.currentTime >= 8) setWordmark(true);
          if (currentTarget.currentTime >= 10) setLeaving(true);
        }}
        onEnded={() => { setCampaign(true); setLeaving(true); }}
        onError={() => setFailed(true)}
      >
        <source media="(max-aspect-ratio: 3/4)" src="/videos/nevora-editorial-opening-portrait.mp4" type="video/mp4" />
        <source src="/videos/nevora-editorial-opening.mp4" type="video/mp4" />
      </video>
      <p className={`opening-wordmark${wordmark ? " is-visible" : ""}`} aria-hidden="true">NEVORA</p>
      {failed && <p className="opening-film-error" role="status">The opening film could not play in this browser. You can continue to NEVORA below.</p>}
      <button className="opening-film-skip" onClick={() => { setCampaign(true); setWordmark(false); setLeaving(true); }} disabled={leaving}>SKIP INTRO</button>
    </section>
  );
}
