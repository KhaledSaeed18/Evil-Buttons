import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const registryDir = resolve(root, "public/r");

const clickPowerupSource = await readFile(
  resolve(root, "components/evil-buttons/click-powerup.tsx"),
  "utf8",
);
const stickySource = await readFile(
  resolve(root, "components/evil-buttons/sticky.tsx"),
  "utf8",
);
const shinySource = await readFile(
  resolve(root, "components/evil-buttons/shiny-button.tsx"),
  "utf8",
);
const moviePassSource = await readFile(
  resolve(root, "components/evil-buttons/movie-pass.tsx"),
  "utf8",
);
const minimalSource = await readFile(
  resolve(root, "components/evil-buttons/minimal.tsx"),
  "utf8",
);
const gridButtonSource = await readFile(
  resolve(root, "components/evil-buttons/grid-button.tsx"),
  "utf8",
);
const ditherButtonSource = await readFile(
  resolve(root, "components/evil-buttons/dither-button.tsx"),
  "utf8",
);
const evilEyeButtonSource = await readFile(
  resolve(root, "components/evil-buttons/evil-eye-button.tsx"),
  "utf8",
);
const trollButtonSource = await readFile(
  resolve(root, "components/evil-buttons/troll-button.tsx"),
  "utf8",
);
const chromeButtonSource = await readFile(
  resolve(root, "components/evil-buttons/chrome-button.tsx"),
  "utf8",
);
const brutalButtonSource = await readFile(
  resolve(root, "components/evil-buttons/brutal-button.tsx"),
  "utf8",
);
const aquaButtonSource = await readFile(
  resolve(root, "components/evil-buttons/aqua-button.tsx"),
  "utf8",
);
const frameButtonSource = await readFile(
  resolve(root, "components/evil-buttons/frame-button.tsx"),
  "utf8",
);
const highlightButtonSource = await readFile(
  resolve(root, "components/evil-buttons/highlight-button.tsx"),
  "utf8",
);
const copyButtonSource = await readFile(
  resolve(root, "components/evil-buttons/copy-button.tsx"),
  "utf8",
);
const loadingButtonSource = await readFile(
  resolve(root, "components/evil-buttons/loading-button.tsx"),
  "utf8",
);
const holdToConfirmSource = await readFile(
  resolve(root, "components/evil-buttons/hold-to-confirm.tsx"),
  "utf8",
);
const countdownButtonSource = await readFile(
  resolve(root, "components/evil-buttons/countdown-button.tsx"),
  "utf8",
);
const swipeToConfirmSource = await readFile(
  resolve(root, "components/evil-buttons/swipe-to-confirm.tsx"),
  "utf8",
);
const shatterButtonSource = await readFile(
  resolve(root, "components/evil-buttons/shatter-button.tsx"),
  "utf8",
);
const undoButtonSource = await readFile(
  resolve(root, "components/evil-buttons/undo-button.tsx"),
  "utf8",
);
const twoStepButtonSource = await readFile(
  resolve(root, "components/evil-buttons/two-step-button.tsx"),
  "utf8",
);
const progressButtonSource = await readFile(
  resolve(root, "components/evil-buttons/progress-button.tsx"),
  "utf8",
);
const commandButtonSource = await readFile(
  resolve(root, "components/evil-buttons/command-button.tsx"),
  "utf8",
);
const revealButtonSource = await readFile(
  resolve(root, "components/evil-buttons/reveal-button.tsx"),
  "utf8",
);
const rateLimitButtonSource = await readFile(
  resolve(root, "components/evil-buttons/rate-limit-button.tsx"),
  "utf8",
);
const smartPasteButtonSource = await readFile(
  resolve(root, "components/evil-buttons/smart-paste-button.tsx"),
  "utf8",
);
const splitActionButtonSource = await readFile(
  resolve(root, "components/evil-buttons/split-action-button.tsx"),
  "utf8",
);
const checkoutButtonSource = await readFile(
  resolve(root, "components/evil-buttons/checkout-button.tsx"),
  "utf8",
);
const reactionButtonSource = await readFile(
  resolve(root, "components/evil-buttons/reaction-button.tsx"),
  "utf8",
);
const downloadButtonSource = await readFile(
  resolve(root, "components/evil-buttons/download-button.tsx"),
  "utf8",
);
const scrambleButtonSource = await readFile(
  resolve(root, "components/evil-buttons/scramble-button.tsx"),
  "utf8",
);
const breatheButtonSource = await readFile(
  resolve(root, "components/evil-buttons/breathe-button.tsx"),
  "utf8",
);
const gravityButtonSource = await readFile(
  resolve(root, "components/evil-buttons/gravity-button.tsx"),
  "utf8",
);
const fluxButtonSource = await readFile(
  resolve(root, "components/evil-buttons/flux-button.tsx"),
  "utf8",
);
const peekButtonSource = await readFile(
  resolve(root, "components/evil-buttons/peek-button.tsx"),
  "utf8",
);

const clickPowerupItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "click-powerup",
  type: "registry:ui",
  title: "ClickPowerUp",
  description:
    "An animated button wrapper with corner brackets, patterned fill, and tap feedback.",
  files: [
    {
      path: "components/evil-buttons/click-powerup.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/click-powerup.tsx",
      content: clickPowerupSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const stickyItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "sticky",
  type: "registry:ui",
  title: "StickyButton",
  description:
    "A magnetic button that follows cursor movement with spring physics.",
  files: [
    {
      path: "components/evil-buttons/sticky.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/sticky.tsx",
      content: stickySource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const shinyItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "shiny-button",
  type: "registry:ui",
  title: "ShinyButton",
  description:
    "A glossy, gradient-styled button with a layered inner glow and press feedback.",
  files: [
    {
      path: "components/evil-buttons/shiny-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/shiny-button.tsx",
      content: shinySource,
    },
  ],
  dependencies: [],
};

const moviePassItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "movie-pass",
  type: "registry:ui",
  title: "MoviePassButton",
  description:
    "A ticket-style button like a cinema stub.",
  files: [
    {
      path: "components/evil-buttons/movie-pass.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/movie-pass.tsx",
      content: moviePassSource,
    },
  ],
  dependencies: [],
};

const minimalItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "minimal",
  type: "registry:ui",
  title: "MinimalButton",
  description:
    "A sleek, minimal button with a subtle repeating linear gradient pattern.",
  files: [
    {
      path: "components/evil-buttons/minimal.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/minimal.tsx",
      content: minimalSource,
    },
  ],
  registryDependencies: [
    "button"
  ],
  dependencies: ["clsx", "tailwind-merge"],
};

const gridButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "grid-button",
  type: "registry:ui",
  title: "GridButton",
  description:
    "A retro-styled button with a pixelated grid icon and tactile press feedback.",
  files: [
    {
      path: "components/evil-buttons/grid-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/grid-button.tsx",
      content: gridButtonSource,
    },
  ],
  registryDependencies: ["@dotmatrix/dotm-square-11"],
  dependencies: ["clsx", "tailwind-merge"],
};

const ditherButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "dither-button",
  type: "registry:ui",
  title: "DitherButton",
  description:
    "A button with an animated 4x4 ordered-dither wave background and a knockout label.",
  files: [
    {
      path: "components/evil-buttons/dither-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/dither-button.tsx",
      content: ditherButtonSource,
    },
  ],
  dependencies: ["clsx", "tailwind-merge"],
};

const evilEyeButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "evil-eye-button",
  type: "registry:ui",
  title: "EvilEyeButton",
  description:
    "A button with a React Bits evil eye shader background and a fiery readable label.",
  files: [
    {
      path: "components/evil-buttons/evil-eye-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/evil-eye-button.tsx",
      content: evilEyeButtonSource,
    },
  ],
  registryDependencies: ["@react-bits/EvilEye-TS-TW"],
  dependencies: ["clsx", "tailwind-merge"],
};

const trollButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "troll-button",
  type: "registry:ui",
  title: "TrollButton",
  description:
    "A button that flees from the user's cursor.",
  files: [
    {
      path: "components/evil-buttons/troll-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/troll-button.tsx",
      content: trollButtonSource,
    },
  ],
  registryDependencies: ["button"],
  dependencies: ["motion"],
};

const chromeButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "chrome-button",
  type: "registry:ui",
  title: "ChromeButton",
  description:
    "A button with an animated liquid chrome background.",
  files: [
    {
      path: "components/evil-buttons/chrome-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/chrome-button.tsx",
      content: chromeButtonSource,
    },
  ],
  registryDependencies: ["@react-bits/LiquidChrome-TS-TW"],
  dependencies: [],
};

const brutalButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "brutal-button",
  type: "registry:ui",
  title: "BrutalButton",
  description:
    "A NeoBrutalism style button with sharp shadows and stark borders.",
  files: [
    {
      path: "components/evil-buttons/brutal-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/brutal-button.tsx",
      content: brutalButtonSource,
    },
  ],
  dependencies: ["clsx", "tailwind-merge"],
};

const aquaButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "aqua-button",
  type: "registry:ui",
  title: "AquaButton",
  description:
    "A glossy pill button inspired by Apple's Aqua interface, with layered highlights and a soft inner glow.",
  files: [
    {
      path: "components/evil-buttons/aqua-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/aqua-button.tsx",
      content: aquaButtonSource,
    },
  ],
  dependencies: ["clsx", "tailwind-merge"],
};

const frameButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "frame-button",
  type: "registry:ui",
  title: "FrameButton",
  description:
    "A futuristic button with animated corner frames and tactile motion interactions.",
  files: [
    {
      path: "components/evil-buttons/frame-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/frame-button.tsx",
      content: frameButtonSource,
    },
  ],
  dependencies: ["clsx", "tailwind-merge", "motion"],
};

const highlightButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "highlight-button",
  type: "registry:ui",
  title: "HighlightButton",
  description:
    "A button with a mouse-following highlight that darkens light surfaces and expands on click.",
  files: [
    {
      path: "components/evil-buttons/highlight-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/highlight-button.tsx",
      content: highlightButtonSource,
    },
  ],
  registryDependencies: ["button"],
  dependencies: ["clsx", "tailwind-merge"],
};

const copyButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "copy-button",
  type: "registry:ui",
  title: "CopyButton",
  description:
    "A click-to-copy button with an animated clipboard → check icon morph and aria-live feedback.",
  files: [
    {
      path: "components/evil-buttons/copy-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/copy-button.tsx",
      content: copyButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const loadingButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "loading-button",
  type: "registry:ui",
  title: "LoadingButton",
  description:
    "A stateful submit button that animates through idle, loading, success, and error states.",
  files: [
    {
      path: "components/evil-buttons/loading-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/loading-button.tsx",
      content: loadingButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const holdToConfirmItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "hold-to-confirm",
  type: "registry:ui",
  title: "HoldToConfirmButton",
  description:
    "A button that requires a sustained hold to confirm destructive actions.",
  files: [
    {
      path: "components/evil-buttons/hold-to-confirm.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/hold-to-confirm.tsx",
      content: holdToConfirmSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const countdownButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "countdown-button",
  type: "registry:ui",
  title: "CountdownButton",
  description:
    "A button with a cooldown timer — fires once, then disables itself with a live countdown until re-enabled.",
  files: [
    {
      path: "components/evil-buttons/countdown-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/countdown-button.tsx",
      content: countdownButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const swipeToConfirmItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "swipe-to-confirm",
  type: "registry:ui",
  title: "SwipeToConfirmButton",
  description:
    "An iOS-style swipe-to-confirm slider — drag the handle across to commit, release early to cancel.",
  files: [
    {
      path: "components/evil-buttons/swipe-to-confirm.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/swipe-to-confirm.tsx",
      content: swipeToConfirmSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const shatterButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "shatter-button",
  type: "registry:ui",
  title: "ShatterButton",
  description:
    "A button that shatters into shards on click, scatters them outward, and reassembles itself.",
  files: [
    {
      path: "components/evil-buttons/shatter-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/shatter-button.tsx",
      content: shatterButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const undoButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "undo-button",
  type: "registry:ui",
  title: "UndoButton",
  description:
    "A reversible action button that gives users a short undo window before committing.",
  files: [
    {
      path: "components/evil-buttons/undo-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/undo-button.tsx",
      content: undoButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const twoStepButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "two-step-button",
  type: "registry:ui",
  title: "TwoStepButton",
  description:
    "A click-once-to-arm, click-again-to-confirm button for risky actions.",
  files: [
    {
      path: "components/evil-buttons/two-step-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/two-step-button.tsx",
      content: twoStepButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const progressButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "progress-button",
  type: "registry:ui",
  title: "ProgressButton",
  description:
    "A button that displays real task progress with idle, running, complete, and error states.",
  files: [
    {
      path: "components/evil-buttons/progress-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/progress-button.tsx",
      content: progressButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const commandButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "command-button",
  type: "registry:ui",
  title: "CommandButton",
  description:
    "A keyboard-shortcut button that visually presses itself when its shortcut is used.",
  files: [
    {
      path: "components/evil-buttons/command-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/command-button.tsx",
      content: commandButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const revealButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "reveal-button",
  type: "registry:ui",
  title: "RevealButton",
  description:
    "A privacy-focused button for temporarily revealing sensitive values.",
  files: [
    {
      path: "components/evil-buttons/reveal-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/reveal-button.tsx",
      content: revealButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const rateLimitButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "rate-limit-button",
  type: "registry:ui",
  title: "RateLimitButton",
  description:
    "A quota-aware action button with remaining-use pips and automatic cooldown refill.",
  files: [
    {
      path: "components/evil-buttons/rate-limit-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/rate-limit-button.tsx",
      content: rateLimitButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const smartPasteButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "smart-paste-button",
  type: "registry:ui",
  title: "SmartPasteButton",
  description:
    "A clipboard-aware paste button that validates pasted content and reports success or failure.",
  files: [
    {
      path: "components/evil-buttons/smart-paste-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/smart-paste-button.tsx",
      content: smartPasteButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const splitActionButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "split-action-button",
  type: "registry:ui",
  title: "SplitActionButton",
  description:
    "A primary action button with an animated menu for alternate actions.",
  files: [
    {
      path: "components/evil-buttons/split-action-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/split-action-button.tsx",
      content: splitActionButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const checkoutButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "checkout-button",
  type: "registry:ui",
  title: "CheckoutButton",
  description:
    "A payment-style button that animates through processing, approved, and declined states.",
  files: [
    {
      path: "components/evil-buttons/checkout-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/checkout-button.tsx",
      content: checkoutButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const reactionButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "reaction-button",
  type: "registry:ui",
  title: "ReactionButton",
  description:
    "A reaction button with count animation, pressed state, and a small particle burst.",
  files: [
    {
      path: "components/evil-buttons/reaction-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/reaction-button.tsx",
      content: reactionButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const downloadButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "download-button",
  type: "registry:ui",
  title: "DownloadButton",
  description:
    "A download/export button with animated progress, completion, and error feedback.",
  files: [
    {
      path: "components/evil-buttons/download-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/download-button.tsx",
      content: downloadButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const peekButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "peek-button",
  type: "registry:ui",
  title: "PeekButton",
  description:
    "A compact button that reveals small contextual detail on hover or focus.",
  files: [
    {
      path: "components/evil-buttons/peek-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/peek-button.tsx",
      content: peekButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const scrambleButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "scramble-button",
  type: "registry:ui",
  title: "ScrambleButton",
  description:
    "A button that cycles its label through random characters before revealing the final text — like a cypher decoding itself.",
  files: [
    {
      path: "components/evil-buttons/scramble-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/scramble-button.tsx",
      content: scrambleButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const breatheButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "breathe-button",
  type: "registry:ui",
  title: "BreatheButton",
  description:
    "A living button with a slow breathing pulse animation that makes the UI feel organic and calm.",
  files: [
    {
      path: "components/evil-buttons/breathe-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/breathe-button.tsx",
      content: breatheButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const gravityButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "gravity-button",
  type: "registry:ui",
  title: "GravityButton",
  description:
    "A playful button with floating particles that follow your cursor like they're affected by gravity, bursting on click.",
  files: [
    {
      path: "components/evil-buttons/gravity-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/gravity-button.tsx",
      content: gravityButtonSource,
    },
  ],
  dependencies: ["motion", "clsx", "tailwind-merge"],
};

const fluxButtonItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "flux-button",
  type: "registry:ui",
  title: "FluxButton",
  description:
    "A button with a flowing animated color field — colors drift across the surface like a lava lamp or aurora.",
  files: [
    {
      path: "components/evil-buttons/flux-button.tsx",
      type: "registry:ui",
      target: "components/evil-buttons/flux-button.tsx",
      content: fluxButtonSource,
    },
  ],
  dependencies: ["clsx", "tailwind-merge"],
};

const index = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "evil-buttons",
  homepage: "http://evilbuttons.radiumcoders.com/docs",
  items: [
    {
      name: "click-powerup",
      type: "registry:ui",
      title: "ClickPowerUp",
      description:
        "An animated button wrapper with corner brackets, patterned fill, and tap feedback.",
      files: ["components/evil-buttons/click-powerup.tsx"],
    },
    {
      name: "sticky",
      type: "registry:ui",
      title: "StickyButton",
      description:
        "A magnetic button that follows cursor movement with spring physics.",
      files: ["components/evil-buttons/sticky.tsx"],
    },
    {
      name: "shiny-button",
      type: "registry:ui",
      title: "ShinyButton",
      description:
        "A glossy, gradient-styled button with a layered inner glow and press feedback.",
      files: ["components/evil-buttons/shiny-button.tsx"],
    },
    {
      name: "movie-pass",
      type: "registry:ui",
      title: "MoviePassButton",
      description:
        "A ticket-style button like a cinema stub.",
      files: ["components/evil-buttons/movie-pass.tsx"],
    },
    {
      name: "minimal",
      type: "registry:ui",
      title: "MinimalButton",
      description:
        "A sleek, minimal button with a subtle repeating linear gradient pattern.",
      files: ["components/evil-buttons/minimal.tsx"],
    },
    {
      name: "grid-button",
      type: "registry:ui",
      title: "GridButton",
      description:
        "A retro-styled button with a pixelated grid icon and tactile press feedback.",
      files: ["components/evil-buttons/grid-button.tsx"],
    },
    {
      name: "dither-button",
      type: "registry:ui",
      title: "DitherButton",
      description:
        "A button with an animated 4x4 ordered-dither wave background and a knockout label.",
      files: ["components/evil-buttons/dither-button.tsx"],
    },
    {
      name: "evil-eye-button",
      type: "registry:ui",
      title: "EvilEyeButton",
      description:
        "A button with a React Bits evil eye shader background and a fiery readable label.",
      files: ["components/evil-buttons/evil-eye-button.tsx"],
    },
    {
      name: "troll-button",
      type: "registry:ui",
      title: "TrollButton",
      description:
        "A button that flees from the user's cursor.",
      files: ["components/evil-buttons/troll-button.tsx"],
    },
    {
      name: "chrome-button",
      type: "registry:ui",
      title: "ChromeButton",
      description:
        "A button with an animated liquid chrome background.",
      files: ["components/evil-buttons/chrome-button.tsx"],
    },
    {
      name: "brutal-button",
      type: "registry:ui",
      title: "BrutalButton",
      description:
        "A NeoBrutalism style button with sharp shadows and stark borders.",
      files: ["components/evil-buttons/brutal-button.tsx"],
    },
    {
      name: "aqua-button",
      type: "registry:ui",
      title: "AquaButton",
      description:
        "A glossy pill button inspired by Apple's Aqua interface, with layered highlights and a soft inner glow.",
      files: ["components/evil-buttons/aqua-button.tsx"],
    },
    {
      name: "frame-button",
      type: "registry:ui",
      title: "FrameButton",
      description:
        "A futuristic button with animated corner frames and tactile motion interactions.",
      files: ["components/evil-buttons/frame-button.tsx"],
    },
    {
      name: "highlight-button",
      type: "registry:ui",
      title: "HighlightButton",
      description:
        "A button with a mouse-following highlight that darkens light surfaces and expands on click.",
      files: ["components/evil-buttons/highlight-button.tsx"],
    },
    {
      name: "copy-button",
      type: "registry:ui",
      title: "CopyButton",
      description:
        "A click-to-copy button with an animated clipboard → check icon morph and aria-live feedback.",
      files: ["components/evil-buttons/copy-button.tsx"],
    },
    {
      name: "loading-button",
      type: "registry:ui",
      title: "LoadingButton",
      description:
        "A stateful submit button that animates through idle, loading, success, and error states.",
      files: ["components/evil-buttons/loading-button.tsx"],
    },
    {
      name: "hold-to-confirm",
      type: "registry:ui",
      title: "HoldToConfirmButton",
      description:
        "A button that requires a sustained hold to confirm destructive actions.",
      files: ["components/evil-buttons/hold-to-confirm.tsx"],
    },
    {
      name: "countdown-button",
      type: "registry:ui",
      title: "CountdownButton",
      description:
        "A button with a cooldown timer — fires once, then disables itself with a live countdown until re-enabled.",
      files: ["components/evil-buttons/countdown-button.tsx"],
    },
    {
      name: "swipe-to-confirm",
      type: "registry:ui",
      title: "SwipeToConfirmButton",
      description:
        "An iOS-style swipe-to-confirm slider — drag the handle across to commit, release early to cancel.",
      files: ["components/evil-buttons/swipe-to-confirm.tsx"],
    },
    {
      name: "shatter-button",
      type: "registry:ui",
      title: "ShatterButton",
      description:
        "A button that shatters into shards on click, scatters them outward, and reassembles itself.",
      files: ["components/evil-buttons/shatter-button.tsx"],
    },
    {
      name: "undo-button",
      type: "registry:ui",
      title: "UndoButton",
      description:
        "A reversible action button that gives users a short undo window before committing.",
      files: ["components/evil-buttons/undo-button.tsx"],
    },
    {
      name: "two-step-button",
      type: "registry:ui",
      title: "TwoStepButton",
      description:
        "A click-once-to-arm, click-again-to-confirm button for risky actions.",
      files: ["components/evil-buttons/two-step-button.tsx"],
    },
    {
      name: "progress-button",
      type: "registry:ui",
      title: "ProgressButton",
      description:
        "A button that displays real task progress with idle, running, complete, and error states.",
      files: ["components/evil-buttons/progress-button.tsx"],
    },
    {
      name: "command-button",
      type: "registry:ui",
      title: "CommandButton",
      description:
        "A keyboard-shortcut button that visually presses itself when its shortcut is used.",
      files: ["components/evil-buttons/command-button.tsx"],
    },
    {
      name: "reveal-button",
      type: "registry:ui",
      title: "RevealButton",
      description:
        "A privacy-focused button for temporarily revealing sensitive values.",
      files: ["components/evil-buttons/reveal-button.tsx"],
    },
    {
      name: "rate-limit-button",
      type: "registry:ui",
      title: "RateLimitButton",
      description:
        "A quota-aware action button with remaining-use pips and automatic cooldown refill.",
      files: ["components/evil-buttons/rate-limit-button.tsx"],
    },
    {
      name: "smart-paste-button",
      type: "registry:ui",
      title: "SmartPasteButton",
      description:
        "A clipboard-aware paste button that validates pasted content and reports success or failure.",
      files: ["components/evil-buttons/smart-paste-button.tsx"],
    },
    {
      name: "split-action-button",
      type: "registry:ui",
      title: "SplitActionButton",
      description:
        "A primary action button with an animated menu for alternate actions.",
      files: ["components/evil-buttons/split-action-button.tsx"],
    },
    {
      name: "checkout-button",
      type: "registry:ui",
      title: "CheckoutButton",
      description:
        "A payment-style button that animates through processing, approved, and declined states.",
      files: ["components/evil-buttons/checkout-button.tsx"],
    },
    {
      name: "reaction-button",
      type: "registry:ui",
      title: "ReactionButton",
      description:
        "A reaction button with count animation, pressed state, and a small particle burst.",
      files: ["components/evil-buttons/reaction-button.tsx"],
    },
    {
      name: "download-button",
      type: "registry:ui",
      title: "DownloadButton",
      description:
        "A download/export button with animated progress, completion, and error feedback.",
      files: ["components/evil-buttons/download-button.tsx"],
    },
    {
      name: "peek-button",
      type: "registry:ui",
      title: "PeekButton",
      description:
        "A compact button that reveals small contextual detail on hover or focus.",
      files: ["components/evil-buttons/peek-button.tsx"],
    },
    {
      name: "scramble-button",
      type: "registry:ui",
      title: "ScrambleButton",
      description:
        "A button that cycles its label through random characters before revealing the final text — like a cypher decoding itself.",
      files: ["components/evil-buttons/scramble-button.tsx"],
    },
    {
      name: "breathe-button",
      type: "registry:ui",
      title: "BreatheButton",
      description:
        "A living button with a slow breathing pulse animation that makes the UI feel organic and calm.",
      files: ["components/evil-buttons/breathe-button.tsx"],
    },
    {
      name: "gravity-button",
      type: "registry:ui",
      title: "GravityButton",
      description:
        "A playful button with floating particles that follow your cursor like they're affected by gravity, bursting on click.",
      files: ["components/evil-buttons/gravity-button.tsx"],
    },
    {
      name: "flux-button",
      type: "registry:ui",
      title: "FluxButton",
      description:
        "A button with a flowing animated color field — colors drift across the surface like a lava lamp or aurora.",
      files: ["components/evil-buttons/flux-button.tsx"],
    },
  ],
};

await mkdir(registryDir, { recursive: true });
await writeFile(
  resolve(registryDir, "click-powerup.json"),
  `${JSON.stringify(clickPowerupItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "sticky.json"),
  `${JSON.stringify(stickyItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "shiny-button.json"),
  `${JSON.stringify(shinyItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "movie-pass.json"),
  `${JSON.stringify(moviePassItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "minimal.json"),
  `${JSON.stringify(minimalItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "grid-button.json"),
  `${JSON.stringify(gridButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "dither-button.json"),
  `${JSON.stringify(ditherButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "evil-eye-button.json"),
  `${JSON.stringify(evilEyeButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "troll-button.json"),
  `${JSON.stringify(trollButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "chrome-button.json"),
  `${JSON.stringify(chromeButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "brutal-button.json"),
  `${JSON.stringify(brutalButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "aqua-button.json"),
  `${JSON.stringify(aquaButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "frame-button.json"),
  `${JSON.stringify(frameButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "highlight-button.json"),
  `${JSON.stringify(highlightButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "copy-button.json"),
  `${JSON.stringify(copyButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "loading-button.json"),
  `${JSON.stringify(loadingButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "hold-to-confirm.json"),
  `${JSON.stringify(holdToConfirmItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "countdown-button.json"),
  `${JSON.stringify(countdownButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "swipe-to-confirm.json"),
  `${JSON.stringify(swipeToConfirmItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "shatter-button.json"),
  `${JSON.stringify(shatterButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "undo-button.json"),
  `${JSON.stringify(undoButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "two-step-button.json"),
  `${JSON.stringify(twoStepButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "progress-button.json"),
  `${JSON.stringify(progressButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "command-button.json"),
  `${JSON.stringify(commandButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "reveal-button.json"),
  `${JSON.stringify(revealButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "rate-limit-button.json"),
  `${JSON.stringify(rateLimitButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "smart-paste-button.json"),
  `${JSON.stringify(smartPasteButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "split-action-button.json"),
  `${JSON.stringify(splitActionButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "checkout-button.json"),
  `${JSON.stringify(checkoutButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "reaction-button.json"),
  `${JSON.stringify(reactionButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "download-button.json"),
  `${JSON.stringify(downloadButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "peek-button.json"),
  `${JSON.stringify(peekButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "scramble-button.json"),
  `${JSON.stringify(scrambleButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "breathe-button.json"),
  `${JSON.stringify(breatheButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "gravity-button.json"),
  `${JSON.stringify(gravityButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "flux-button.json"),
  `${JSON.stringify(fluxButtonItem, null, 2)}\n`,
  "utf8",
);
await writeFile(
  resolve(registryDir, "index.json"),
  `${JSON.stringify(index, null, 2)}\n`,
  "utf8",
);

console.log("Registry built:");
console.log("- public/r/index.json");
console.log("- public/r/click-powerup.json");
console.log("- public/r/sticky.json");
console.log("- public/r/shiny-button.json");
console.log("- public/r/movie-pass.json");
console.log("- public/r/minimal.json");
console.log("- public/r/grid-button.json");
console.log("- public/r/dither-button.json");
console.log("- public/r/evil-eye-button.json");
console.log("- public/r/troll-button.json");
console.log("- public/r/chrome-button.json");
console.log("- public/r/brutal-button.json");
console.log("- public/r/aqua-button.json");
console.log("- public/r/frame-button.json");
console.log("- public/r/highlight-button.json");
console.log("- public/r/copy-button.json");
console.log("- public/r/loading-button.json");
console.log("- public/r/hold-to-confirm.json");
console.log("- public/r/countdown-button.json");
console.log("- public/r/swipe-to-confirm.json");
console.log("- public/r/shatter-button.json");
console.log("- public/r/undo-button.json");
console.log("- public/r/two-step-button.json");
console.log("- public/r/progress-button.json");
console.log("- public/r/command-button.json");
console.log("- public/r/reveal-button.json");
console.log("- public/r/rate-limit-button.json");
console.log("- public/r/smart-paste-button.json");
console.log("- public/r/split-action-button.json");
console.log("- public/r/checkout-button.json");
console.log("- public/r/reaction-button.json");
console.log("- public/r/download-button.json");
console.log("- public/r/peek-button.json");
console.log("- public/r/scramble-button.json");
console.log("- public/r/breathe-button.json");
console.log("- public/r/gravity-button.json");
console.log("- public/r/flux-button.json");
