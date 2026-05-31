# Performance & accessibility checklist

Run through this before considering an animated component done. If the Motion AI Kit
is installed, run the **`/motion` MotionScore audit** as well — it profiles
render-pipeline cost and gives concrete fixes.

## Performance

- [ ] Animates only `transform` (`x`/`y`/`scale`/`rotate`) and `opacity` in hot paths.
- [ ] No per-frame animation of `width`, `height`, `top`, `left`, `margin`,
      `padding`, or `box-shadow` — use `layout`, `scale`, or pre-rendered shadows.
- [ ] Layout shifts use the `layout` prop (FLIP), not animated box-model props.
- [ ] No animation work running while the element is offscreen or unmounted.
- [ ] Heavy/optional features use `LazyMotion` + `domAnimation`/`domMax` so the
      published registry component doesn't force the full Motion bundle on consumers.
- [ ] `will-change` is left to Motion to manage — don't hand-set it broadly.
- [ ] WebGL effects (`ogl`, e.g. LiquidChrome/EvilEye) clean up their RAF loop and
      GL context on unmount.

## Accessibility

- [ ] `useReducedMotion()` or `<MotionConfig reducedMotion="user">` honored — no
      essential feedback conveyed by motion alone.
- [ ] Interactive elements remain real buttons/links (focusable, keyboard-operable);
      animation wrappers don't strip semantics or focus.
- [ ] Visible focus state that doesn't depend on hover/motion.
- [ ] No rapid flashing or large-area motion that could trigger vestibular issues.

## Bundle / distribution

- [ ] Imports from `motion/react`, not the deprecated `framer-motion`.
- [ ] No unused Motion features pulled in; transitions defined inline, not via
      large shared config objects when avoidable.
