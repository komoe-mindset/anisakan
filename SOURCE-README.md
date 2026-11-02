# Anisakan Coffee & Tea Garden Resort

A buildless single-page resort experience. The site lives in `dist/` and uses HTML, locally bundled Tailwind CSS, custom CSS and vanilla JavaScript. All fonts, images and UI code are local files. The language selector supports English, Myanmar and Simplified Chinese and translates the interactive content as well as the navigation and forms. Every fresh page load starts in English.

## Offline customer presentations

The delivered ZIP contains a ready-to-open copy of the site and the optimized project PDF. Extract the entire ZIP, then open `index.html`. No server, install or internet connection is needed to explore the site or read the PDF. Keep `assets/` beside the HTML and JavaScript files. The ZIP includes a three-language `START-HERE.txt` guide.

The Project PDF section also offers a full-screen presentation control. The email form can prepare a draft offline, but sending requires an email app and network connection.

To rebuild an offline ZIP from the hosted source:

    python scripts/package-offline.py --output "Anisakan-Offline-Website.zip"

Both the hosted site and the offline package use the same optimized 10.2 MB PDF, with normal open and download links. The 13-page presentation retains its selectable text and vector content; large photographs have been recompressed. The supplied source PDF remains untouched. Packaging verifies the ZIP and the optimized PDF's SHA-256 checksum.

## Fonts and styling

The bundled fonts are Cormorant Garamond, DM Sans, Noto Sans Myanmar and Noto Sans SC from the official Google Fonts repository. Their SIL Open Font License files are under `dist/assets/fonts/`. Tailwind CSS 2.2.19 is distributed locally with its MIT license. There are no runtime font or CSS CDN requests.

## Important launch details

- The estate explorer is a schematic three-zone map, not a photographic 360° panorama. Replace it if an actual panorama and measured masterplan become available.
- All imagery is AI-generated conceptual imagery and is labeled as such in the page. Replace it with approved resort photographs before portraying facilities as real.
- The planner's prices and itineraries are examples, not official rates or confirmed availability. Update `trips` in `dist/app.js` after the resort sets its rates and operating plans.
- The enquiry form prepares a pre-addressed `mailto:` draft; it does not store leads, deliver email itself, process payments, or confirm bookings. A visitor must send the draft from an email app. Connect a consent-aware form backend for direct server-side lead capture.
- Contact and project details should be verified before public launch. The generated visuals, proposed experiences and agricultural production process should be checked against the operating resort.
- The website interface has three languages. The original presentation remains in its supplied Myanmar-language form.

## Images and generation prompts

The images were created with the built-in image generation tool and encoded as WebP for the site. The final project assets are:

- `dist/assets/hero.webp`
- `dist/assets/farm.webp`
- `dist/assets/factory.webp`
- `dist/assets/retreat.webp`

### Hero

Use case: photorealistic-natural. Asset type: luxury eco-resort website hero photograph. Create a very wide, cinematic editorial photograph of mist drifting through the lush green highlands near Pyin Oo Lwin in Myanmar at early morning, with rolling tea and coffee fields and layers of softly lit mountain ridges. Rich deep forest green foliage, warm muted light, natural atmosphere, refined premium travel magazine photography, no people, no buildings necessary. Composition with darker legible negative space on the left for white website text. No text, no logos, no watermark. This is conceptual destination imagery, not a documentary image.

### Farm

Use case: photorealistic-natural. Asset type: luxury agro-tourism website zone photograph. A close editorial landscape photograph of a lush highland Arabica coffee farm in Myanmar, elegant coffee branches in the foreground with ripe red cherries and glossy green leaves, terraced plants and gentle mist in the background, natural morning light, detailed botanical texture, sophisticated deep forest green and warm earth palette. No people, no text, no watermark. Conceptual imagery.

### Factory

Use case: photorealistic-natural. Asset type: luxury agro-tourism website zone photograph. A warm, beautifully lit small specialty coffee processing facility in the highlands of Myanmar, with orderly rows of coffee beans drying on raised mesh beds under a timber and translucent roof, subtle stainless processing equipment, artisanal and believable, earthy textures, natural daylight, sophisticated editorial resort photography. No people, no text, no watermark. Conceptual imagery.

### Retreat

Use case: photorealistic-natural. Asset type: luxury eco-resort website zone photograph. A serene open-air timber mountain veranda with a simple ceramic cup of coffee and a woven chair overlooking misty lush green highland hills near Pyin Oo Lwin, Myanmar, soft early morning light, restrained premium eco-resort atmosphere, natural teak and linen materials, rich green and warm neutral colors, elegant travel editorial photography. No people, no text, no logos, no watermark. Conceptual imagery.
