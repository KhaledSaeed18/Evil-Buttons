# Design Review — Evil Buttons

**Date**: 2026-05-24
**Target**: Landing page (`/`) — full page, server-rendered, inspected live at `localhost:3333`
**Score**: 28/50

---

## Gut Reaction

The page has a clear identity in its components but not in its frame. The button grid is the star — WebGL eyes, fleeing buttons, dither patterns, liquid chrome — and each individual component knows exactly what it wants to be. The surrounding shell (header, footer, page frame, separators) is a restrained, professional shadcn site that doesn't match the intensity or personality of what it contains. The name "Evil Buttons" promises mischief; the monochrome frame delivers a design-toolkit landing page. The components are doing all the heavy lifting while the container coasts.

---

## The Experience Walk

1. **Arrival** — The user sees the diagonal-line pattern separator, then the framed header with logo + nav + solid "Get Started" button. The monochrome palette reads as clean but neutral. No immediate "evil" signal.

2. **Hero promise** — The badge ("shadcn/ui registry · Motion powered") sets context. The heading "Animated buttons with your taste" is straightforward but doesn't commit to a specific personality. The description tells what the product is; it doesn't sell why it matters.

3. **First scroll** — Another pattern separator, then the button grid. This is where the experience wakes up. The grid heading "Every button, live in the grid" sets expectations, and the row of interactive cards delivers. The EvilEyeButton is the visual anchor — orange fire glow against the monochrome grid.

4. **Interaction discovery** — Users discover interactions through play: the TrollButton flees, the StickyButton follows, the EvilEye tracks the cursor. This is the product's strongest moment. But the cards themselves have no hover state — the discovery feels accidental rather than guided.

5. **Footer landing** — A separator, footer links, attribution, then the "EVIL BUTTONS" fluid gradient text. The fluid text is the most brand-forward visual on the page, but it's buried at the bottom. A user needs to scroll through the entire page to find the strongest brand moment.

**Where the story breaks**: The frame and the components tell different stories. The frame says "clean developer toolkit"; the components say "playful, interactive, dark personality."

---

## Lens Scores

| Lens | Score | Notes |
|---|---|---|
| First impression | 6/10 | Strong components, weak frame. The "evil" brand isn't visible until the grid. |
| Hierarchy | 7/10 | Clear three-section structure. Header CTA competes with hero CTAs. Grid cells have equal weight. |
| Color voice | 4/10 | Achromatic design tokens (chroma 0 everywhere). No accent color in the system. The vibrant button colors are disconnected from the shell. |
| Type voice | 6/10 | Solid scaling and tracking. Inter is a generic sans choice. Helvetica hardcoded in the SVG component instead of using the design token. |
| Interaction feel | 5/10 | Buttons are excellent. Surrounding chrome has minimal hover states, no focus indicators on nav, no page-level animation, no card hover states. |
| **Total** | **28/50** | The components carry the experience. The frame needs attention. |

---

## Smell Analysis

### Present

- **The shadcn blank-slate palette**: All 30+ CSS custom properties use `oklch(X 0 0)` — zero chroma. This is the default shadcn init output, not a designed palette. The product has "evil" in its name but uses the same grayscale tokens as a SaaS dashboard, a blog, or any other shadcn project.

- **The Inter/Geist default**: Inter is loaded as the primary sans font, Geist Sans is loaded but not actively used for the sans role. This is the Next.js `create-next-app` font cocktail, not a deliberate typographic choice for an "evil" button library.

- **The centered-hero-with-pill-badge pattern**: The hero follows the exact template of a hundred shadcn/Next.js landing pages: mono badge → centered heading → centered paragraph → two CTAs. This composition doesn't belong to Evil Buttons — it belongs to the template.

### Absent

- No gradient-background hero (positive — avoids another common tell)
- No generic blue-purple CTA gradient
- No floating 3D device mockup
- No AI-generated illustration placeholder

---

## Top Issues (ordered by impact)

1. **Achromatic design tokens** — 30+ CSS variables, all chroma 0. This is the biggest accessibility of the "evil" brand. An accent color needs to enter the token system and tint the neutral surfaces. A warm desaturated orange or deep red-violet would bridge the shell to the component palette. **Mode**: recolor

2. **Card grid has no hover/selection feedback** — The grid cards are the main interaction surface but have zero hover state on the card itself. Only the title link changes color. The cards should feel alive — a subtle border glow, background shift, or shadow lift on hover would guide discovery. **Mode**: interaction

3. **Nav links lack visible focus rings** — Header and footer links use only `transition-colors`. No `focus-visible:ring` or `focus-visible:outline` on any nav link. Keyboard users cannot see where they are. **Mode**: interaction

4. **"EVIL BUTTONS" fluid text is buried in the footer** — The most brand-forward visual is at the bottom of the page. Consider pulling a smaller version into the hero or using a reduced variant as a section background behind the grid heading. **Mode**: relayout

5. **No section transition or scroll narrative** — The page is a static stack of sections divided by pattern separators. There's no reveal animation, no parallax, no sticky positioning, no scroll-driven behavior. The buttons inside the grid are interactive, but the page itself doesn't move. **Mode**: motion

6. **Body copy doesn't sell** — "A shadcn/ui registry of animated buttons built With an Evil Touch. Live previews, copy-paste docs, and one-command CLI installs." This describes the product factually but doesn't create desire. It reads like a README paragraph, not a landing page promise. **Mode**: writing (not a design mode — flag for content)

7. **"Get Started" header CTA is solid black on white, inverted in dark mode** — It uses `bg-foreground text-background` which makes it the highest-contrast element on the page. It visually competes with the hero heading. In an "evil" product, the primary CTA should have personality — not be a utility button. **Mode**: recolor or redesign

8. **No theme indicator in the header** — The 'd' key toggles theme, and the footer tells you to press it, but there's no visual indicator of the current theme state in the header. A sun/moon icon or subtle indicator would close the loop. **Mode**: interaction

9. **Nine buttons say "Deploy Doom"** — Only EvilEye ("I SEE YOU") and Troll ("Catch Me") have unique labels. The remaining 8 buttons share the same text, which flattens their distinct personalities. Each button should have a label that matches its character. **Mode**: content (not purely design)

10. **GridButton has an unnecessary loading indicator** — The `DotmSquare11` component uses `role="status"` and `aria-live="polite"` with `aria-label="Loading"`. This is a decorative element inside a button showcase, not an actual loading state. The ARIA attributes mislead screen readers. **Mode**: surface (accessibility fix)

---

## What's Working Well

- **Button interaction quality**: The EvilEye WebGL shader, the Troll flee behavior, the ClickPowerUp three-state system, and the Dither canvas animation are genuinely excellent. Each button has a distinct interaction model.
- **Pattern separator**: The diagonal line pattern creates a consistent visual rhythm and a distinctive page signature. The masking variant in the grid section is a nice refinement.
- **Footer fluid text**: The mouse-reactive gradient on "EVIL BUTTONS" is the strongest brand moment on the page.
- **Theme toggle with 'd' key**: Clean implementation with proper edit-field detection.
- **SEO infrastructure**: Comprehensive JSON-LD, OpenGraph, Twitter cards, and canonical URLs.
- **`prefers-reduced-motion` handling**: EvilEyeButton provides a static CSS fallback. DitherButton checks for reduced motion. Good accessibility hygiene in the components.
- **Code quality**: Clean component patterns, consistent use of `cn()`, proper TypeScript typing, well-structured exports.
- **CLI integration**: The "one-command install" promise is a genuine value proposition for shadcn users.

---

## Recommendations

1. **Run `/design recolor`** — Break the achromatic shell. Introduce a warm desaturated accent (orange-red, deep amber, or crimson) into the CSS tokens. Tint the neutral grays. Chroma 0 across 30+ variables is the single biggest visual issue.

2. **Run `/design interaction`** — Add hover states to the grid cards, focus rings to all nav links, a theme indicator to the header, and fix the GridButton ARIA misuse.

3. **Run `/design motion`** — Add scroll-triggered reveals for the grid section, a subtle parallax or sticky effect for the hero, and entrance animations for section transitions.

4. **Run `/design voice`** — Reconsider the hero copy. "Animated buttons with your taste" is functional but generic. The "With an Evil Touch" line from the description has more personality — lean into that voice throughout.

5. **Consider relayout** — Pull the fluid gradient text treatment into the hero or as a background element. The strongest visual shouldn't live exclusively in the footer.

6. **Give each button a unique label** — "Deploy Doom" on 8 of 10 buttons flattens their individuality. Match labels to components: ShinyButton → "Blinding", StickyButton → "Follow Me", ChromeButton → "Liquid Metal", etc.
