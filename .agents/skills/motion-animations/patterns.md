# Motion patterns

Copy-ready patterns. Verify current API against the Motion AI Kit / docs if anything
looks off — these are starting points, not a substitute for the latest docs.

## Imports

```tsx
"use client";
import { motion, AnimatePresence, useReducedMotion, MotionConfig } from "motion/react";
```

## Hover + tap feedback

```tsx
<motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
  className="..."
>
  Click me
</motion.button>
```

## Reduced motion (required)

```tsx
function Btn() {
  const reduce = useReducedMotion();
  return (
    <motion.button
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
    >
      Click me
    </motion.button>
  );
}
```

Or, app/tree-wide:

```tsx
<MotionConfig reducedMotion="user">{children}</MotionConfig>
```

## Enter / exit

```tsx
<AnimatePresence>
  {open && (
    <motion.span
      key="label"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
    />
  )}
</AnimatePresence>
```

## Layout change without animating width/height

```tsx
<motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }} />
```

## Springs vs easing

- Physical/bouncy feel → `{ type: "spring", stiffness, damping, mass }`
- Precise UI timing → `{ duration, ease: [0.22, 1, 0.36, 1] }` (or a named ease)
- Need a CSS-only spring? Generate a `linear()` curve via the `/motion` skill
  (AI Kit) and apply it as plain CSS — no runtime needed.
