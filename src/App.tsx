import { useEffect, useMemo, useState } from "react";
import ExperiencePanel, { articles } from "./Experiences";
import CinematicEntrance from "./CinematicEntrance";
import { bottlePhotos, bottleDetails, campaignPhotos, fashionPhotos, editorialPhotos, craftPhoto, imageSrcSet } from "./photography";
import AutomaticVisual, { useAutomaticSequence } from "./AutomaticVisual";

type Product = {
  id: string;
  name: string;
  numeral: string;
  concept: string;
  family: string;
  price: string;
  tone: string;
  image: string;
  top: string[];
  heart: string[];
  base: string[];
};

const products: Product[] = [
  {
    id: "velvet",
    numeral: "I",
    name: "VELVET REVERIE",
    concept: "A fragrance suspended between waking and dreaming.",
    family: "Floral · Amber · Woods",
    price: "₹18,500",
    tone: "velvet",
    image: campaignPhotos.velvet,
    top: ["Blackcurrant", "Pink Pepper", "Bergamot"],
    heart: ["Iris", "Velvet Rose", "Jasmine"],
    base: ["Vanilla", "Sandalwood", "Amber", "Soft Musk"],
  },
  {
    id: "lunar",
    numeral: "II",
    name: "LUNAR BLOSSOM",
    concept: "A nocturnal bloom illuminated by moonlight.",
    family: "White Floral · Musk",
    price: "₹17,800",
    tone: "lunar",
    image: campaignPhotos.lunar,
    top: ["Pear", "Bergamot", "Pink Pepper"],
    heart: ["Moonflower", "Jasmine", "Orange Blossom"],
    base: ["White Musk", "Sandalwood", "Vanilla"],
  },
  {
    id: "adua",
    numeral: "III",
    name: "ADUA AETHE",
    concept: "A breath of the light.",
    family: "Citrus · White Floral · Woods",
    price: "₹16,900",
    tone: "adua",
    image: campaignPhotos.adua,
    top: ["Bergamot", "Neroli", "Cardamom"],
    heart: ["Orange Blossom", "Tuberose", "Orris"],
    base: ["Cedar", "Ambrette", "White Musk"],
  },
];
const priceForSize = (product: Product, size: string) => size === "30 ML" ? "₹11,800" : size === "100 ML" ? "₹27,500" : product.price;
const fragranceFrames = (product: Product) => [
  { image: bottlePhotos[product.tone], alt: product.name + ": real glass and natural light", caption: "NEVORA · " + product.name, fit: "contain" as const },
  { image: fashionPhotos[product.tone], alt: product.id === "velvet" ? "An adult model in a black satin evening dress in a warmly lit interior" : product.id === "lunar" ? "An adult model in refined tailoring, photographed with a composed expression" : "An adult model in an ivory silk evening gown and long gloves", caption: product.name + (product.id === "velvet" ? " · THE WARMTH OF EVENING" : product.id === "lunar" ? " · A QUIET CONFIDENCE" : " · THE LIGHT YOU CARRY") },
];

const noteDescriptions: Record<string, string> = {
  Blackcurrant: "Dark fruit with a green, electric edge.",
  "Pink Pepper": "A bright spark of rosy spice.",
  Bergamot: "Luminous citrus, elegant and softly bitter.",
  Iris: "Powdered petals with a cool, suede-like texture.",
  "Velvet Rose": "A deep rose wrapped in warm shadow.",
  Jasmine: "Radiant white petals after dusk.",
  Vanilla: "A soft, enveloping sweetness.",
  Sandalwood: "Creamy woods with meditative warmth.",
  Amber: "Resinous light, glowing close to the skin.",
  "Soft Musk": "A clean, intimate second skin.",
  Pear: "Crystalline fruit with a cool, aqueous glow.",
  Moonflower: "An imagined blossom opening only at night.",
  "Orange Blossom": "Sunlit white petals with a honeyed edge.",
  "White Musk": "Sheer, quiet and skin-like.",
  Neroli: "Bitter orange blossom, green and radiant.",
  Cardamom: "Cool spice with an airy warmth.",
  Tuberose: "Creamy white petals, opulent yet weightless.",
  Orris: "Silken, mineral and delicately powdered.",
  Cedar: "Clean, dry wood with quiet structure.",
  Ambrette: "A warm botanical musk with pear-like facets.",
};

function Icon({ name }: { name: "menu" | "bag" | "search" | "close" | "arrow" | "plus" }) {
  const paths = {
    menu: <><path d="M3 7h18M3 17h18" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    close: <><path d="M5 5l14 14M19 5 5 19" /></>,
    arrow: <><path d="M4 12h16M15 7l5 5-5 5" /></>,
    plus: <><path d="M12 4v16M4 12h16" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">{paths[name]}</svg>;
}

function Action({ children, onClick, light = false, icon = true, className = "" }: {
  children: React.ReactNode; onClick?: () => void; light?: boolean; icon?: boolean; className?: string;
}) {
  return (
    <button className={`action ${light ? "action-light" : ""} ${className}`} onClick={onClick}>
      <span>{children}</span>{icon && <Icon name="arrow" />}
    </button>
  );
}

function Bottle({ tone = "velvet", mini = false, label = "NEVORA" }: { tone?: string; mini?: boolean; label?: string }) {
  return (
    <figure className={`bottle-wrap photographic-bottle ${tone} ${mini ? "mini" : ""}`}>
      <img src={bottlePhotos[tone] || bottlePhotos.velvet} alt={`${label}: photographic study of ${tone === "velvet" ? "a rounded amber-glass atomizer on silk in sunlight" : tone === "lunar" ? "a faceted glass atomizer with a polished metal cap on linen" : "a cylindrical clear-glass atomizer on natural stone"}`} loading={mini ? "lazy" : "eager"} decoding="async" />
      <figcaption>{!mini && <strong>NEVORA</strong>}<span>{label}</span></figcaption>
    </figure>
  );
}

function Intro({ onEnter, onHandoff }: { onEnter: (target?: string) => void; onHandoff: () => void }) {
  return <CinematicEntrance onEnter={onEnter} onHandoff={onHandoff} />;
}

function Nav({ bagCount, openBag, openPanel }: { bagCount: number; openBag: () => void; openPanel: (kind: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (!mobileOpen) return;
    const menu = document.querySelector<HTMLElement>(".mobile-menu");
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const siblings = Array.from(document.querySelector(".app")!.children).filter(element => element !== menu) as HTMLElement[];
    siblings.forEach(element => { element.inert = true; });
    const buttons = Array.from(menu!.querySelectorAll<HTMLButtonElement>("button"));
    buttons[0]?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
      if (event.key === "Tab" && event.shiftKey && document.activeElement === buttons[0]) { event.preventDefault(); buttons[buttons.length - 1]?.focus(); }
      if (event.key === "Tab" && !event.shiftKey && document.activeElement === buttons[buttons.length - 1]) { event.preventDefault(); buttons[0]?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = overflow; siblings.forEach(element => { element.inert = false; }); previous?.focus({ preventScroll: true }); };
  }, [mobileOpen]);
  const navigate = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id === "discover" ? "discovery" : id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <header className="nav">
        <button className="nav-icon mobile-only" aria-label="Open menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}><Icon name="menu" /></button>
        <button className="wordmark" onClick={() => navigate("home")}>NEVORA</button>
        <nav className="desktop-links" aria-label="Main navigation">
          {["collection", "story", "craft", "discover"].map((item) => (
            <button key={item} onClick={() => navigate(item)}>{item === "story" ? "THE HOUSE" : item.toUpperCase()}</button>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="desktop-action" aria-label="Search" onClick={() => openPanel("search")}><Icon name="search" /> <span>SEARCH</span></button>
          <button className="desktop-action account" onClick={() => openPanel("account")}>ACCOUNT</button>
          <button className="desktop-action" aria-label={`Bag with ${bagCount} items`} onClick={openBag}><Icon name="bag" /><span>BAG {bagCount || ""}</span></button>
        </div>
      </header>
      {mobileOpen && <div className="mobile-menu open" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <button className="menu-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}><Icon name="close" /></button>
        <p className="eyebrow">NAVIGATION</p>
        <button onClick={() => { setMobileOpen(false); openPanel("search"); }}>SEARCH</button>
        <button onClick={() => { setMobileOpen(false); openPanel("account"); }}>ACCOUNT</button>
        {["collection", "story", "craft", "discover"].map((item, i) => (
          <button key={item} onClick={() => navigate(item)}><span>0{i + 1}</span>{item === "story" ? "THE HOUSE" : item.toUpperCase()}</button>
        ))}
      </div>}
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-image"><img src={editorialPhotos.hero} srcSet={imageSrcSet(editorialPhotos.hero)} sizes="(max-width: 640px) 1500px, 100vw" alt="An adult woman in an evening dress, photographed in a softly lit architectural interior" fetchPriority="high" loading="eager" decoding="async" /></div>
      <div className="hero-wash" />
      <div className="hero-content">
        <p className="hero-house-wordmark">NEVORA</p>
        <p className="eyebrow">THE FIRST COLLECTION · 2025</p>
        <h1>SCENTS THAT<br /><em>BECOME MEMORIES.</em></h1>
        <p className="hero-copy">Three intimate compositions. A quiet confidence. Fragrance for the evenings that become memories.</p>
        <div className="hero-actions">
          <Action light onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}>EXPLORE COLLECTION</Action>
        </div>
      </div>
    </section>
  );
}

function ScentNotes({ product }: { product: Product }) {
  const [active, setActive] = useState(product.heart[0]);
  const levels = [["TOP", product.top], ["HEART", product.heart], ["BASE", product.base]] as const;
  return (
    <div className={`scent-pyramid atmosphere-${active.toLowerCase().replaceAll(" ", "-")}`}>
      <div className="notes">
        {levels.map(([level, notes], index) => (
          <div className="note-level" key={level}>
            <div className="level-label"><span>0{index + 1}</span><b>{level} NOTES</b></div>
            <div className="note-list">
              {notes.map((note) => (
                <button
                  aria-pressed={active === note}
                  className={active === note ? "active" : ""}
                  key={note}
                  onMouseEnter={() => setActive(note)}
                  onFocus={() => setActive(note)}
                  onClick={() => setActive(note)}
                >
                  <span>{note}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="note-description" aria-live="polite"><span>{active}</span><p>{noteDescriptions[active] || "A quiet facet woven into the composition."}</p></div>
      </div>
    </div>
  );
}

function FragranceAnatomy() {
  const sequence = useAutomaticSequence(products.length, 5500);
  const product = products[sequence.active];
  const frames = products.map(fragrance => ({
    image: fragrance.image,
    alt: fragrance.id === "velvet" ? "Fashion portrait in a black dress" : fragrance.id === "lunar" ? "An editorial silhouette and dark silk beside the sea" : "Warm sunlight crossing refined stone architecture",
  }));
  return (
    <div className={`pyramid-feature fragrance-anatomy anatomy-${product.tone}`} ref={sequence.root}>
      <div className="pyramid-intro">
        <p className="eyebrow">ANATOMY OF A FRAGRANCE</p>
        <h2>{product.name}</h2>
        <p>{product.concept} Explore the notes that give this fragrance its character.</p>
        <div className="anatomy-campaign">
          <AutomaticVisual frames={frames} index={sequence.active} paused={sequence.paused} onToggle={sequence.toggle} />
        </div>
      </div>
      <div className="anatomy-information">
        <div className="anatomy-fragrances" aria-label="Choose a fragrance">
          {products.map((fragrance, index) => <button key={fragrance.id} aria-pressed={sequence.active === index} onClick={() => sequence.select(index)}>{fragrance.name}</button>)}
        </div>
        <div onPointerDown={() => sequence.select(sequence.active)} onFocusCapture={() => sequence.select(sequence.active)}>
          <ScentNotes key={product.id} product={product} />
        </div>
      </div>
    </div>
  );
}

function Collection({ discover }: { discover: (product: Product) => void }) {
  return (
    <section className="collection" id="collection">
      <div className="section-heading">
        <p className="eyebrow">CHAPTER 01 · THE COLLECTION</p>
        <h2>THREE WORLDS.<br /><em>ONE HOUSE.</em></h2>
        <p>Compositions created not to announce their presence, but to leave a trace.</p>
      </div>
      <div className="product-worlds campaign-chapters">
        {products.map((product) => (
          <article className={`product-world campaign-chapter ${product.tone}`} key={product.id}>
            <div className="campaign-photography"><AutomaticVisual frames={fragranceFrames(product)} interval={6200} /></div>
            <div className="world-copy">
              <p className="eyebrow">CHAPTER {product.numeral}</p>
              <h3>{product.name}</h3>
              <p className="eyebrow">{product.family}</p>
              <p>{product.concept}</p>
              <p className="world-notes">{product.top[0]} · {product.heart[0]} · {product.base[0]}</p>
              <div className="world-shop"><span>EAU DE PARFUM · 50 ML</span><span>{product.price}</span></div>
              <Action light onClick={() => discover(product)}>DISCOVER FRAGRANCE</Action>
            </div>
          </article>
        ))}
      </div>
      <FragranceAnatomy />
    </section>
  );
}

function ScentJourney({ product = products[0], compact = false }: { product?: Product; compact?: boolean }) {
  const sequence = useAutomaticSequence(3, 4200);
  const active = sequence.active;
  const moments = [
    { time: "0—15 MIN", title: "TOP NOTES", detail: `${product.top.join(" · ")} — the bright, fleeting opening.` },
    { time: "15 MIN—4 HR", title: "HEART NOTES", detail: `${product.heart.join(" · ")} — the composition opens close to skin.` },
    { time: "4—12 HR", title: "BASE NOTES", detail: `${product.base.join(" · ")} — the quiet trace that remains.` },
  ];
  return (
    <section className={`journey journey-${active} ${compact ? "journey-compact" : ""}`} id={compact ? "product-journey" : "journey"}>
      <div className="section-heading light">
        <p className="eyebrow">CHAPTER 02 · ON SKIN</p>
        <h2>THE SCENT <em>JOURNEY.</em></h2>
        <p>Fragrance is never still. Discover how a composition evolves on the warmth of skin.</p>
      </div>
      <div className="journey-editorial" ref={sequence.root}>
        <AutomaticVisual frames={[{ image: bottleDetails[product.tone], alt: `${product.name}: a close photographic study of glass, fragrance and warm reflections`, caption: `${product.name} · ${moments[active].title} · ${moments[active].time}` }]} index={0} paused={sequence.paused} onToggle={sequence.toggle} />
      <div className="journey-grid">
        {moments.map((moment, i) => (
          <button aria-pressed={active === i} className={active === i ? "active" : ""} key={moment.title} onClick={() => sequence.select(i)}>
            <span className="moment-index">0{i + 1}</span>
            <span className="moment-time">{moment.time}</span>
            <strong>{moment.title}</strong>
            <p>{moment.detail}</p>
          </button>
        ))}
      </div>
      </div>
    </section>
  );
}

function Discovery({ addSet, discover }: { addSet: () => void; discover: () => void }) {
  return (
    <section className="discovery" id="discovery">
      <div className="discovery-copy">
        <p className="eyebrow">CHAPTER 05 · THE FIRST THREE</p>
        <h2>THREE WORLDS.<br /><em>ONE HOUSE.</em></h2>
        <p>Meet every NEVORA composition in miniature. Three 7.5 ml eaux de parfum presented in our signature archive box.</p>
        <div className="set-meta"><span>3 × 7.5 ML</span><span>₹6,800</span></div>
        <Action onClick={addSet}>ADD THE SET TO BAG</Action>
        <button className="discovery-secondary" onClick={discover}>DISCOVER THE THREE</button>
      </div>
      <figure className="set-visual discovery-composition">
        <img src={editorialPhotos.discovery} srcSet={imageSrcSet(editorialPhotos.discovery)} sizes="(max-width: 700px) 100vw, 50vw" alt="Three distinct glass fragrance bottles photographed together in warm light, a reference composition for Velvet Reverie, Lunar Blossom and Adua Aethe" loading="lazy" decoding="async" />
        <figcaption>{products.map(product => <span key={product.id}><small>{product.numeral}</small>{product.name}</span>)}</figcaption>
      </figure>
    </section>
  );
}

function Story() {
  return (
    <section className="story" id="story">
      <div className="story-image"><img src={editorialPhotos.house} srcSet={imageSrcSet(editorialPhotos.house)} sizes="(max-width: 700px) 100vw, 50vw" alt="An adult woman in elegant black tailoring in a warmly lit lounge, an evening lifestyle editorial" loading="lazy" decoding="async" /></div>
      <div className="story-copy">
        <p className="eyebrow">CHAPTER 04 · THE HOUSE</p>
        <h2>IT BEGAN<br />WITH A <em>MEMORY.</em></h2>
        <p className="house-origin">The hush before an evening. Silk against the skin. A trace that stays long after you leave.</p>
        <p>NEVORA is an imagined modern fragrance house built around memory, material and the art of composition. We create scents for the moments a photograph cannot keep.</p>
        <span className="eyebrow">WHERE SCENT BECOMES MEMORY.</span>
      </div>
    </section>
  );
}

function Craft() {
  const sequence = useAutomaticSequence(6, 6000);
  const active = sequence.active;
  const steps = ["THE FRAGRANCE", "FORMULATION", "MATURATION", "EVALUATION", "BOTTLING", "FINAL FINISH"];
  const descriptions = ["Every composition begins with an atmosphere. Texture, warmth and the memory of a place.", "A measured pour, a patient adjustment. The formula finds its balance.", "Time softens the edges. The composition rests until its facets become one.", "A quiet trial, revisited on skin. We listen for the trace that remains.", "The finished fragrance meets its vessel. Clarity, weight and light.", "Folded paper. Champagne ribbon. A final gesture, considered by hand."];
  return (
    <section className="craft" id="craft">
      <div className="craft-heading">
        <p className="eyebrow">CHAPTER 03 · COMPOSITION</p>
        <h2>THE ART OF<br /><em>THE HOUSE.</em></h2>
        <p>Quiet gestures. Patient hands. A composition shaped to become a memory.</p>
      </div>
      <div className={`craft-image craft-state-${active}`} id="craft-process-visual" ref={sequence.root}><AutomaticVisual frames={[{ image: craftPhoto, alt: "Champagne ribbon, folded presentation paper and soft fabric: an editorial study of hand finishing" }]} index={0} paused={sequence.paused} onToggle={sequence.toggle} /><div className="craft-image-caption" key={active}><span>THE ATELIER · 0{active + 1}</span><h3>{steps[active]}</h3><p>{descriptions[active]}</p></div></div>
      <div className="craft-steps">
        {steps.map((step, i) => (
          <button aria-pressed={active === i} aria-controls="craft-process-visual" onClick={() => sequence.select(i)} key={step}><span>0{i + 1}</span><strong>{step}</strong><span>{active === i ? "−" : "+"}</span></button>
        ))}
      </div>
    </section>
  );
}

function Journal({ openPanel }: { openPanel: (kind: string) => void }) {
  return (
    <section className="journal" id="journal">
      <div className="journal-head"><div><p className="eyebrow">CHAPTER 06 · JOURNAL</p><h2>NOTES FROM<br /><em>THE HOUSE.</em></h2></div><Action onClick={() => openPanel("journal")}>VIEW THE JOURNAL</Action></div>
      <div className="journal-editorial">
        <figure><img src={editorialPhotos.journal} srcSet={imageSrcSet(editorialPhotos.journal)} sizes="(max-width: 700px) 100vw, 50vw" alt="Warm sunlight across dark wood and a refined European salon interior" loading="lazy" decoding="async" /><figcaption>THE PRIVATE ARCHIVE · WORDS, TRACES, MEMORIES</figcaption></figure>
        <div className="journal-notes"><p className="journal-introduction">A few words on what remains. Fragrance, memory and the gestures that make a house.</p>{articles.map((article, index) => <details key={article.title}><summary><small>0{index + 1} · {article.category}</small><span>{article.title}</span></summary><p>{article.text}</p></details>)}</div>
      </div>
    </section>
  );
}

function Stores() {
  const [filter, setFilter] = useState("NEAR ME");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const locations = [
    { name: "NEVORA FLAGSHIP", city: "Aurelia", country: "Lumeria", address: "18 Atelier Lane, Sample District", distance: "2.4 KM", kind: "FLAGSHIP · PRIVATE CONSULTATION" },
    { name: "NEVORA DISCOVERY BAR", city: "Vesper", country: "Lumeria", address: "7 Moon Court, Imaginary Quarter", distance: "8.1 KM", kind: "DISCOVERY BAR · FRAGRANCE LIBRARY" },
    { name: "NEVORA PRIVATE SALON", city: "Solenne", country: "Auralis", address: "3 Glass Walk, Fictional Ward", distance: "12.6 KM", kind: "PRIVATE CONSULTATION · FRAGRANCE LIBRARY" },
  ];
  const results = locations.filter(location => (filter === "CITY" ? location.city : filter === "COUNTRY" ? location.country : `${location.city} ${location.country} ${location.address}`).toLowerCase().includes(search.toLowerCase()));
  return (
    <section className="stores" id="stores">
      <div className="store-image" role="img" aria-label="Marble and brass boutique interior, an architectural reference for fictional NEVORA stores" />
      <div className="store-panel">
        <p className="eyebrow">THE NEVORA EXPERIENCE</p>
        <h2>ENTER<br /><em>THE HOUSE.</em></h2>
        <p>Explore the collection through a private consultation, our discovery bar and fragrance library.</p>
        <Action light onClick={() => document.getElementById("store-search")?.focus()}>VISIT NEVORA</Action>
        <div className="filters">
          {["NEAR ME", "CITY", "COUNTRY"].map(f => <button aria-pressed={filter === f} className={filter === f ? "active" : ""} onClick={() => { setFilter(f); setQuery(""); setSearch(""); setMessage(""); }} key={f}>{f}</button>)}
        </div>
        <form className="search-field" onSubmit={event => { event.preventDefault(); setSearch(query.trim()); setMessage(""); }}><Icon name="search" /><input id="store-search" aria-label="Search fictional store locations" value={query} onChange={event => setQuery(event.target.value)} placeholder={filter === "COUNTRY" ? "LUMERIA OR AURALIS" : "AURELIA, VESPER OR SOLENNE"} /><button>SEARCH</button></form>
        {results.map(location => <div className="store-result" key={location.name}>
          <span>FICTIONAL LOCATION · {location.distance} (SIMULATED)</span>
          <h3>{location.name}</h3><small>{location.kind}</small>
          <p>{location.address}<br />{location.city}, {location.country}<br />Mon—Sat 10:00—19:00</p>
          <div><button onClick={() => setMessage(`Demo directions to ${location.name}: from ${location.city} central square, follow the atelier passage to ${location.address}. No real map or route exists.`)}>GET DIRECTIONS</button><button onClick={() => setMessage(`Visit ${location.name}: discover all three fragrances at the ${location.kind.toLowerCase()}. Mon–Sat, 10:00–19:00. Demonstration only; no real visit or reservation is arranged.`)}>VISIT STORE</button><button onClick={() => setMessage(`Demo call to ${location.name}. A fictional fragrance advisor would help you arrange a consultation. No phone call is placed.`)}>CALL STORE</button></div>
        </div>)}
        {!results.length && <p>No fictional boutiques match. Try Aurelia, Vesper, Solenne or Lumeria.</p>}
        {message && <p className="store-feedback" role="status">{message}</p>}
        <small className="fictional-note">Prototype only. Cities, countries, locations and distances are fictional. No real location is requested.</small>
      </div>
    </section>
  );
}

function Footer({ openPanel }: { openPanel: (kind: string) => void }) {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer>
      <div className="footer-top"><div><p className="eyebrow">PRIVATE CORRESPONDENCE</p><h2>LET THE STORY <em>CONTINUE.</em></h2><p className="footer-story-line">An evening fades. A fragrance remembers.</p></div><form onSubmit={event => { event.preventDefault(); setSubscribed(true); }}><label><input type="email" required aria-label="Email address" placeholder="YOUR EMAIL ADDRESS" /><button>SUBSCRIBE <Icon name="arrow" /></button></label><p role="status">{subscribed ? "Thank you. Demo subscription saved for this visit; no email is sent." : "A fictional correspondence. Please use a demo email."}</p></form></div>
      <div className="footer-wordmark">NEVORA</div>
      <div className="footer-bottom"><span>© 2025 NEVORA · FICTIONAL BRAND PROTOTYPE</span><div>{["privacy", "terms", "photography", "instagram"].map(kind => <button key={kind} onClick={() => openPanel(kind)}>{kind.toUpperCase()}</button>)}</div><span>INDIA / EN</span></div>
    </footer>
  );
}

function ProductDetail({ product, close, add, buyNow, findStore, discoverSet }: { product: Product; close: () => void; add: (size: string) => void; buyNow: (size: string) => void; findStore: () => void; discoverSet: () => void }) {
  const [size, setSize] = useState("50 ML");
  return (
    <div className={`detail ${product.tone}`} role="dialog" aria-modal="true" aria-label={`${product.name} product detail`}>
      <button className="detail-close" aria-label="Close product detail" onClick={close}><Icon name="close" /></button>
      <div className="detail-visual">
        <AutomaticVisual frames={fragranceFrames(product)} interval={4200} className={`product-campaign ${product.tone}`} />
      </div>
      <div className="detail-info">
        <p className="eyebrow">EAU DE PARFUM · {product.family}</p>
        <h2>{product.name}</h2>
        <p className="detail-concept">{product.concept}</p>
        <div className="size-row"><span>SELECT SIZE</span>{["30 ML", "50 ML", "100 ML"].map(s => <button aria-pressed={size === s} className={size === s ? "active" : ""} onClick={() => setSize(s)} key={s}>{s}</button>)}</div>
        <div className="price-row"><span>{size}</span><strong>{priceForSize(product, size)}</strong></div>
        <button className="add-button product-add" onClick={() => add(size)}>ADD TO BAG <span className="mobile-purchase-price">{size} · {priceForSize(product, size)}</span><Icon name="arrow" /></button>
        <Action onClick={() => buyNow(size)}>BUY NOW</Action>
        <div className="detail-secondary"><button onClick={findStore}>BUY IN STORE ↗</button><button onClick={() => document.getElementById("detail-scent")?.scrollIntoView({ behavior: "smooth" })}>DISCOVER THE SCENT ↓</button></div>
        <p className="availability-note">STORE AVAILABILITY · All three compositions are shown at our fictional boutiques. <button onClick={findStore}>FIND A STORE ↗</button></p>
        <div id="detail-scent"><ScentNotes product={product} /></div>
        <ScentJourney product={product} compact />
        <Action onClick={discoverSet}>DISCOVER THE SET</Action>
      </div>
    </div>
  );
}

type BagItem = { name: string; size: string; price: string; tone: string; qty: number };
const itemKey = (item: BagItem) => `${item.name}-${item.size}`;
const itemValue = (item: BagItem) => Number(item.price.replace(/[₹,]/g, "")) * item.qty;
const rupees = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

function Bag({ items, close, checkout, remove, changeQty }: { items: BagItem[]; close: () => void; checkout: () => void; remove: (key: string) => void; changeQty: (key: string, delta: number) => void }) {
  const total = items.reduce((sum, item) => sum + Number(item.price.replace(/[₹,]/g, "")) * item.qty, 0);
  return (
    <div className="bag-backdrop" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button className="bag-dismiss" aria-label="Close bag background" onClick={close} />
      <aside className="bag">
        <div className="bag-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>THE BAG <sup>{items.length}</sup></h2></div><button aria-label="Close bag" onClick={close}><Icon name="close" /></button></div>
        <div className="bag-items">
          {items.length === 0 ? <div className="empty-bag"><Bottle mini tone="adua" label="NEVORA" /><p>Your bag is waiting for a memory.</p></div> : items.map(item => (
            <div className="bag-item" key={itemKey(item)}>
              <Bottle mini tone={item.tone} label={item.name} />
              <div><small>EAU DE PARFUM · {item.size}</small><strong>{item.name}</strong><div className="quantity-control"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => changeQty(itemKey(item), -1)}>−</button><span>QTY {item.qty}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => changeQty(itemKey(item), 1)}>+</button></div><button onClick={() => remove(itemKey(item))}>REMOVE</button></div>
              <b>{rupees(itemValue(item))}</b>
            </div>
          ))}
        </div>
        {items.length > 0 && <div className="bag-summary"><div><span>DELIVERY</span><span>COMPLIMENTARY</span></div><div className="total"><span>TOTAL</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><button className="add-button" onClick={checkout}>PROCEED TO CHECKOUT <Icon name="arrow" /></button><small>Taxes included. This prototype does not process real payments.</small></div>}
      </aside>
    </div>
  );
}

function Checkout({ items, close, complete }: { items: BagItem[]; close: () => void; complete: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <div className="checkout" role="dialog" aria-modal="true">
      <header><button className="wordmark" onClick={close}>NEVORA</button><button onClick={close}>CLOSE <Icon name="close" /></button></header>
      {done ? <div className="confirmation"><p className="eyebrow">ORDER SIMULATION COMPLETE</p><h2>THANK YOU.<br /><em>A MEMORY AWAITS.</em></h2><p>No payment was processed. This is a fictional checkout prototype.</p><Action onClick={close}>RETURN TO THE HOUSE</Action></div> :
      <div className="checkout-grid">
        <main><form onSubmit={event => { event.preventDefault(); setDone(true); complete(); }}>
          <p className="eyebrow">SECURE PROTOTYPE CHECKOUT</p><h2>YOUR DETAILS</h2>
          {["01 · CONTACT", "02 · DELIVERY"].map((title, index) => <div className="checkout-block" key={title}><h3>{title}</h3><div className="field-grid"><label><span>{index === 0 ? "EMAIL ADDRESS" : "FULL NAME"}</span><input required type={index === 0 ? "email" : "text"} placeholder={index === 0 ? "name@example.com" : "Demo guest"} /></label><label><span>{index === 0 ? "PHONE (OPTIONAL)" : "FICTIONAL DELIVERY ADDRESS"}</span><input required={index === 1} type={index === 0 ? "tel" : "text"} placeholder={index === 0 ? "+91" : "18 Sample Lane, Imaginary City"} /></label></div></div>)}
          <div className="checkout-block"><h3>03 · PAYMENT SIMULATION</h3><p>Demo payment · No card details required. Please use fictional contact and delivery information. No payment or shipment will occur.</p><label><input type="checkbox" required /> I understand this is a fictional order.</label></div>
          <button className="add-button">PLACE PROTOTYPE ORDER <Icon name="arrow" /></button>
        </form></main>
        <aside><p className="eyebrow">ORDER SUMMARY</p>{items.map(item => <div className="checkout-item" key={itemKey(item)}><Bottle mini tone={item.tone} label={item.name} /><div><strong>{item.name}</strong><span>{item.size} · QTY {item.qty}</span></div><b>{rupees(itemValue(item))}</b></div>)}<div className="order-total"><span>DELIVERY · COMPLIMENTARY</span><strong>TOTAL {rupees(items.reduce((sum, item) => sum + itemValue(item), 0))}</strong><span>Taxes included · simulated purchase</span></div></aside>
      </div>}
    </div>
  );
}

export default function App() {
  const [intro, setIntro] = useState(true);
  const [handoff, setHandoff] = useState(false);
  const [navigationReady, setNavigationReady] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [bag, setBag] = useState<BagItem[]>([]);
  const [panel, setPanel] = useState<string | null>(null);
  const bagCount = useMemo(() => bag.reduce((sum, i) => sum + i.qty, 0), [bag]);

  useEffect(() => {
    if (intro) return;
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 650;
    const timer = window.setTimeout(() => setNavigationReady(true), delay);
    return () => window.clearTimeout(timer);
  }, [intro]);

  useEffect(() => {
    if (!intro && !selected && !bagOpen && !checkout && !panel) return;
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
    if (!dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const container = dialog.closest(".experience-backdrop") || dialog;
    const siblings = Array.from(document.querySelector(".app")!.children).filter(element => element !== container) as HTMLElement[];
    siblings.forEach(element => { element.inert = true; });
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>('button, input, select, a[href], [tabindex="0"]')).filter(element => !element.hasAttribute("disabled") && element.getClientRects().length && getComputedStyle(element).visibility !== "hidden");
    const timer = window.setTimeout(() => focusable()[0]?.focus(), 50);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (intro) { document.querySelector<HTMLButtonElement>(".opening-film-skip")?.click(); return; }
        setSelected(null); setBagOpen(false); setCheckout(false); setPanel(null);
      }
      if (event.key === "Tab") {
        const elements = focusable();
        const first = elements[0]; const last = elements[elements.length - 1];
        if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => { window.clearTimeout(timer); document.removeEventListener("keydown", handleKey); document.body.style.overflow = overflow; siblings.forEach(element => { element.inert = false; }); if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, [intro, selected, bagOpen, checkout, panel]);

  const enter = (target?: string) => {
    setIntro(false);
    if (target) window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" }), 80);
  };
  const addProduct = (product: Product, size: string, buyNow = false) => {
    setBag(prev => {
      const exists = prev.find(item => item.name === product.name && item.size === size);
      return exists ? prev.map(item => item === exists ? { ...item, qty: item.qty + 1 } : item) : [...prev, { name: product.name, size, price: priceForSize(product, size), tone: product.tone, qty: 1 }];
    });
    setSelected(null);
    if (buyNow) { setBagOpen(false); setCheckout(true); } else setBagOpen(true);
  };
  const addSet = () => {
    setBag(prev => prev.some(item => item.name === "THE FIRST THREE") ? prev.map(item => item.name === "THE FIRST THREE" ? { ...item, qty: item.qty + 1 } : item) : [...prev, { name: "THE FIRST THREE", size: "3 × 7.5 ML", price: "₹6,800", tone: "adua", qty: 1 }]);
    setPanel(null);
    setBagOpen(true);
  };

  return (
    <div className={`app ${intro ? "intro-active" : "homepage-arriving"}${handoff ? " film-handoff" : ""}`}>
      {intro && <Intro onEnter={enter} onHandoff={() => setHandoff(true)} />}
      {!intro && navigationReady && <Nav bagCount={bagCount} openBag={() => setBagOpen(true)} openPanel={setPanel} />}
      <Hero />
      <Collection discover={setSelected} />
      <ScentJourney />
      <Craft />
      <Story />
      <Discovery addSet={addSet} discover={() => setPanel("discovery")} />
      <Journal openPanel={setPanel} />
      <Stores />
      <Footer openPanel={setPanel} />
      {selected && <ProductDetail key={selected.id} product={selected} close={() => setSelected(null)} add={size => addProduct(selected, size)} buyNow={size => addProduct(selected, size, true)} discoverSet={() => { setSelected(null); setPanel("discovery"); }} findStore={() => { setSelected(null); window.setTimeout(() => document.getElementById("stores")?.scrollIntoView({ behavior: "smooth" }), 50); }} />}
      {bagOpen && <Bag items={bag} close={() => setBagOpen(false)} remove={key => setBag(previous => previous.filter(item => itemKey(item) !== key))} changeQty={(key, delta) => setBag(previous => previous.map(item => itemKey(item) === key ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0))} checkout={() => { setBagOpen(false); setCheckout(true); }} />}
      {checkout && <Checkout items={bag} close={() => setCheckout(false)} complete={() => setBag([])} />}
      {panel && <ExperiencePanel key={panel} kind={panel} close={() => setPanel(null)} discover={index => { setPanel(null); setSelected(products[index]); }} addSet={addSet} scentIndex={products.map(product => [product.family, ...product.top, ...product.heart, ...product.base].join(" "))} />}
    </div>
  );
}
