export const photo = (id: string) => `/images/photo-${id}.webp`;

export const imageSrcSet = (image: string) => image.startsWith("/images/") && image.endsWith(".webp")
  ? `${image.replace(".webp", "-small.webp")} 640w, ${image} ${image.includes("hero-evening-campaign") ? 1600 : 1280}w`
  : undefined;

export const bottlePhotos: Record<string, string> = {
  velvet: "/images/velvet-photograph.webp",
  lunar: "/images/lunar-product-portrait.webp",
  adua: "/images/adua-photograph.webp",
};

export const bottleDetails: Record<string, string> = {
  velvet: "/images/velvet-glass-detail.webp",
  lunar: "/images/lunar-glass-detail.webp",
  adua: "/images/adua-glass-detail.webp",
};

export const campaignPhotos: Record<string, string> = {
  velvet: "/images/campaign-evening.webp",
  lunar: "/images/campaign-coast.webp",
  adua: "/images/campaign-stone.webp",
};

export const fashionPhotos: Record<string, string> = {
  velvet: "/images/velvet-evening-editorial.webp",
  lunar: "/images/lunar-tailored-editorial.webp",
  adua: "/images/adua-silk-editorial.webp",
};

export const editorialPhotos = {
  hero: "/images/hero-evening-campaign.webp",
  journey: "/images/hero-fashion-editorial.webp",
  house: "/images/house-evening-salon.webp",
  discovery: "/images/discovery-three-composition.webp",
  journal: "/images/house-sunlit-interior.webp",
};

export const ingredientPhotos: Record<string, { image: string; caption: string }> = {
  Blackcurrant: { image: photo("1649966434631-7f8b680560d2"), caption: "Blackcurrant · botanical study" },
  "Pink Pepper": { image: photo("1775807554589-72b699e566b1"), caption: "Red berries · rosy-spice reference" },
  Bergamot: { image: photo("1617658946770-f1050c097e70"), caption: "Citrus and linen · olfactory reference" },
  Iris: { image: photo("1540163502599-a3284e17072d"), caption: "Iris · botanical study" },
  "Velvet Rose": { image: photo("1559563362-c667ba5f5480"), caption: "Rose · botanical study" },
  Jasmine: { image: photo("1612380635121-411eda9ecbb9"), caption: "Jasmine · botanical study" },
  Vanilla: { image: photo("1592788174877-3f99727fd23d"), caption: "Vanilla · material study" },
  Sandalwood: { image: photo("1470342495351-a5f90c5011cd"), caption: "Wood shavings · woody-texture reference" },
  Amber: { image: bottlePhotos.velvet, caption: "Amber liquid · accord reference, not a botanical" },
  "Soft Musk": { image: photo("1682421938316-4b186e25174c"), caption: "Soft linen · musk accord reference" },
  Pear: { image: photo("1615484477778-ca3b77940c25"), caption: "Pear · fruit study" },
  Moonflower: { image: photo("1712502662382-a7fbbd39f0df"), caption: "White flowers · imagined moonflower accord" },
  "Orange Blossom": { image: photo("1612380635121-411eda9ecbb9"), caption: "White petals · floral reference" },
  "White Musk": { image: photo("1682421938316-4b186e25174c"), caption: "Air and linen · musk accord reference" },
  Neroli: { image: photo("1612380635121-411eda9ecbb9"), caption: "White petals · neroli reference" },
  Cardamom: { image: photo("1642255521852-7e7c742ac58f"), caption: "Cardamom · botanical study" },
  Tuberose: { image: photo("1712502662382-a7fbbd39f0df"), caption: "White flowers · creamy-floral reference" },
  Orris: { image: photo("1540163502599-a3284e17072d"), caption: "Iris · orris is derived from its rhizome" },
  Cedar: { image: photo("1470342495351-a5f90c5011cd"), caption: "Wood shavings · dry-wood reference" },
  Ambrette: { image: photo("1682421938316-4b186e25174c"), caption: "Warm light · botanical-musk reference" },
};

export const craftPhoto = "/images/discovery-archive-box.webp";

export const photographyCredits = [
  ["FOTOGRAFÍA EDITORIAL", "https://unsplash.com/@fotografiaeditorial", "Black satin evening portrait · Velvet editorial"],
  ["Alina Bordunova", "https://unsplash.com/@bordunova", "Tailored ivory fashion portrait · Lunar editorial"],
  ["Lauro Rodríguez", "https://unsplash.com/@lgrt", "Silk evening fashion · Adua editorial"],
  ["Nathan Ayoola", "https://unsplash.com/@nathanayoola", "Evening lounge portrait · House editorial"],
  ["Jadon Johnson", "https://unsplash.com/@jadonjohnson", "Evening fashion editorial · hero campaign"],
  ["Mia Golic", "https://unsplash.com/@miagolic", "Ribbon and paper · Discovery packaging reference"],
  ["Kevin Woblick", "https://unsplash.com/@kovah", "Writing room · journal editorial"],
  ["Lifetime Leather", "https://unsplash.com/@lifetime_leather", "Hand finishing · material craftsmanship reference"],
  ["Sadikali PM", "https://unsplash.com/@sadikaliputhucode", "Antique glass vessels · Discovery photographic reference"],
  ["Doon _MUC", "https://unsplash.com/@doon_muc", "Marble and brass boutique · architectural reference"],
  ["Timothy L Brock", "https://unsplash.com/@timothylbrock", "Crystal perfume vessel on dark fabric · hero campaign"],
  ["Ellie Eshaghi", "https://unsplash.com/@eliiesh", "Fragrance cap and glass shoulder · Journey detail"],
  ["Lera Ginzburg", "https://unsplash.com/@ginzburg_l", "Three-bottle composition · Discovery reference"],
  ["Peter Herrmann", "https://unsplash.com/@tama66", "Sunlight and wood · House interior"],
  ["Katrin Hauf", "https://unsplash.com/@trine", "Sealed amber glass · resting-vessel study"],
  ["Aaron Burden", "https://unsplash.com/@aaronburden", "Handwritten notes · evaluation study"],
  ["William Bout", "https://unsplash.com/@williambout", "Cut crystal · finishing study"],
  ["Anni Peng", "https://unsplash.com/@aplab", "Tailored-suit editorial portrait"],
  ["Siora Photography", "https://unsplash.com/@siora18", "Faceted fragrance glass on linen"],
  ["Aiony Haust", "https://unsplash.com/@aiony", "Black-dress editorial portrait"],
  ["Darius Bashar", "https://unsplash.com/@dariusbashar", "Silk and silhouette by the sea"],
  ["Patrick Baum", "https://unsplash.com/@gecko81de", "Sunlight and stone architecture"],
  ["Simply Mersah", "https://unsplash.com/@simplymersah", "Amber atomizer on silk"],
  ["Camille Paralisan", "https://unsplash.com/@30mshooter", "Glass bottle with flowers"],
  ["Content Pixie", "https://unsplash.com/@contentpixie", "Glass bottle on stone"],
  ["Fulvio Ciccolo / Scentspiracy", "https://unsplash.com/@scentspiracy", "Perfumery workshop studies"],
  ["Pawel Czerwinski", "https://unsplash.com/@pawel_czerwinski", "Iris study"],
  ["Tanya Nedelcheva", "https://unsplash.com/@taan4eto", "White floral study"],
  ["Edward Howell", "https://unsplash.com/@edwardhowellphotography", "Rose study"],
  ["Mathilde Langevin", "https://unsplash.com/@mathildelangevin", "Citrus and linen"],
  ["Anton", "https://unsplash.com/@doctor_mabuse", "Blackcurrant study"],
  ["Jocelyn Morales", "https://unsplash.com/@molnj", "Vanilla study"],
  ["Clem Onojeghuo", "https://unsplash.com/@clemono", "Wood shavings"],
  ["Saad Ahmad", "https://unsplash.com/@saadahmad_umn", "Light and linen"],
  ["Mockup Graphics", "https://unsplash.com/@mockupgraphics", "Pear study"],
  ["Karyna Panchenko", "https://unsplash.com/@karyna_panchenko", "Cardamom study"],
  ["Marian Florinel Condruz", "https://unsplash.com/@gottapics", "Red berry study"],
  ["Thuy Duong Nguyen", "https://unsplash.com/@duonguyen", "White flowers on stone"],
];
