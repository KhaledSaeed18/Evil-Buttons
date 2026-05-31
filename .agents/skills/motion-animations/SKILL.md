---
name: motion-animations
description: Build and review animations with Motion (motion package, formerly Framer Motion) in this Evil Buttons library. Use when creating or editing any component in components/evil-buttons/*.tsx, adding hover/tap/scroll/exit animations, tuning springs/easing, fixing janky or non-performant animations, or auditing animation accessibility. Animation is this library's core identity.
---

# Motion Animations

This is a library of **animated** button components. Animation quality, performance,
and accessibility are not polish — they are the product. Hold a high bar.

> **Don't guess at animation code.** AI tends to invent Motion APIs from outdated
> sources. Prefer the official Motion AI Kit and live docs over memory — see
> [Authoritative sources](#authoritative-sources) below. When unsure of an API,
> verify before writing.

## Project facts

- Package: **`motion`** (v12+), the successor to `framer-motion`.
- Import React bindings from **`motion/react`**:
  `import { motion, AnimatePresence, useReducedMotion } from "motion/react"`
- Motion components are **Client Components** — the file needs `"use client"`.
- Existing components in `components/evil-buttons/*.tsx` are the house style.
  Read a few before adding a new one and match their conventions.

## Non-negotiable rules

1. **Animate compositor-friendly properties.** Prefer `transform` (`x`, `y`,
   `scale`, `rotate`) and `opacity`. Avoid animating layout/paint properties
   (`width`, `height`, `top`, `left`, `margin`, `box-shadow`) in hot paths —
   they trigger layout/paint every frame. For size/position changes use the
   `layout` prop (FLIP, transform-based) instead of animating `width`/`height`.
2. **Respect reduced motion — always.** This is a hard requirement here. Use
   `useReducedMotion()` to drop/curtail non-essential motion, or wrap trees in
   `<MotionConfig reducedMotion="user">`. Never ship a button whose only
   feedback is motion that ignores the user's OS preference.
3. **Use spring/easing intentionally.** `transition={{ type: "spring", stiffness, damping }}`
   for physical feel; named/cubic-bezier easing for precise UI timing. Don't
   leave everything on defaults — pick values that fit the effect.
4. **Interaction gestures** belong on the element: `whileHover`, `whileTap`,
   `whileFocus`. Don't reimplement these with manual state + effects.
5. **Exit animations** require `<AnimatePresence>` around conditionally-rendered
   children with a stable `key`.
6. **Mind the bundle** — this is a distributed registry. Consider `LazyMotion`
   with `domAnimation`/`domMax` features for heavier components so consumers
   don't ship the full feature set. See [performance.md](./performance.md).

## Authoritative sources

Motion ships an **AI Kit** built by the Motion team specifically to stop agents
from guessing. Use it when available:

- **MCP / Context** — query the latest Motion docs and the source of 370+
  premium example patterns instead of relying on training data.
- **`/motion` MotionScore audit** — code analysis + runtime profiling that grades
  animations by render-pipeline cost and recommends fixes. Run this before
  declaring an animation "done" if the tooling is installed.
- **CSS spring / `linear()` generation** — generate spring easing curves as CSS
  `linear()` (e.g. a runtime-free bouncy spring) via the `/motion` skill.
- **Transition editor** — in-IDE real-time editing of springs/easing.

Docs: https://motion.dev/docs/ai-kit — start here:
https://motion.dev/docs/react-quick-start

If the AI Kit MCP/skill isn't installed in this environment, fall back to
fetching the relevant page under `https://motion.dev/docs/` before writing code.

## Workflow for a new animated button

1. Read 2–3 existing `components/evil-buttons/*.tsx` for conventions.
2. Decide the effect and which properties animate (keep them transform/opacity).
3. Implement with `motion.*`, gestures, and an intentional `transition`.
4. Add reduced-motion handling.
5. Audit performance (MotionScore if available, else check for layout/paint
   thrash and offscreen work).
6. Wire docs + registry via the **`evil-button-docs`** skill.

See [patterns.md](./patterns.md) for copy-ready snippets and
[performance.md](./performance.md) for the perf/accessibility checklist.
