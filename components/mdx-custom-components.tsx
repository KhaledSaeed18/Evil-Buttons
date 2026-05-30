import { CliBlock } from "@/components/cli-block";
import { CodeBlock } from "@/components/code-block";
import { ClickPowerUp } from "@/components/evil-buttons/click-powerup";
import MinimalButton from "@/components/evil-buttons/minimal";
import StickyButton from "@/components/evil-buttons/sticky";
import { PreviewCard } from "@/components/preview-card";
import type { MDXComponents } from "mdx/types";
import { isValidElement, type ReactNode } from "react";
import MoviePassButton from "./evil-buttons/movie-pass";
import ShinyButton from "./evil-buttons/shiny-button";
import GridButton from "./evil-buttons/grid-button";
import DitherButton from "./evil-buttons/dither-button";
import EvilEyeButton from "./evil-buttons/evil-eye-button";
import TrollButton from "./evil-buttons/troll-button";
import ChromeButton from "./evil-buttons/chrome-button";
import { BrutalButton } from "./evil-buttons/brutal-button";
import { AquaButton } from "./evil-buttons/aqua-button";
import { FrameButton } from "./evil-buttons/frame-button";
import { HighlightButton } from "./evil-buttons/highlight-button";
import { CopyButton } from "./evil-buttons/copy-button";
import { LoadingButton } from "./evil-buttons/loading-button";
import { HoldToConfirmButton } from "./evil-buttons/hold-to-confirm";
import { CountdownButton } from "./evil-buttons/countdown-button";
import { SwipeToConfirmButton } from "./evil-buttons/swipe-to-confirm";
import { ShatterButton } from "./evil-buttons/shatter-button";
import { UndoButton } from "./evil-buttons/undo-button";
import { TwoStepButton } from "./evil-buttons/two-step-button";
import { ProgressButton } from "./evil-buttons/progress-button";
import { CommandButton } from "./evil-buttons/command-button";
import { RevealButton } from "./evil-buttons/reveal-button";
import { RateLimitButton } from "./evil-buttons/rate-limit-button";
import { SmartPasteButton } from "./evil-buttons/smart-paste-button";
import { SplitActionButton } from "./evil-buttons/split-action-button";
import { CheckoutButton } from "./evil-buttons/checkout-button";
import { ReactionButton } from "./evil-buttons/reaction-button";
import { DownloadButton } from "./evil-buttons/download-button";
import { PeekButton } from "./evil-buttons/peek-button";
import { ScrambleButton } from "./evil-buttons/scramble-button";
import { BreatheButton } from "./evil-buttons/breathe-button";
import { GravityButton } from "./evil-buttons/gravity-button";
import { FluxButton } from "./evil-buttons/flux-button";
import {
  LoadingButtonSuccessDemo,
  LoadingButtonFailureDemo,
  HoldToConfirmDemo,
  HoldToConfirmPublishDemo,
  CountdownCustomFormatDemo,
  ProgressButtonDemo,
  CommandButtonDemo,
  UndoButtonDemo,
  TwoStepButtonDemo,
  TwoStepButtonDestructiveDemo,
  RateLimitButtonDemo,
  SmartPasteButtonDemo,
  SplitActionButtonDemo,
  CheckoutButtonDemo,
  CheckoutButtonFailureDemo,
  ReactionButtonDemo,
  DownloadButtonDemo,
  PeekButtonDemo,
  ScrambleButtonDemo,
  ScrambleButtonCustomDemo,
  BreatheButtonDemo,
  BreatheButtonSlowDemo,
  GravityButtonDemo,
  FluxButtonDemo,
  FluxButtonCustomDemo,
} from "./evil-buttons-demos";


type CmdProps = {
  children: ReactNode;
};

type LinkProps = {
  children: ReactNode;
  href: string;
  _blank?: boolean;
};

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => extractText(child)).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }

  return "";
}

function Cmd({ children }: CmdProps) {
  const commands = extractText(children)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return <CliBlock commands={commands} />;
}

function Link({ children, href, _blank }: LinkProps) {
  if (_blank) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
    >
      {children}
    </a>
  );
}

export function getCustomMDXComponents(): MDXComponents {
  return {
    PreviewCard,
    Cmd,
    CodeBlock,
    ClickPowerUp,
    StickyButton,
    ShinyButton,
    MoviePassButton,
    MinimalButton,
    EvilButton: ClickPowerUp,
    GridButton,
    DitherButton,
    EvilEyeButton,
    Link,
    TrollButton,
    ChromeButton,
    BrutalButton,
    AquaButton,
    FrameButton,
    HighlightButton,
    CopyButton,
    LoadingButton,
    HoldToConfirmButton,
    CountdownButton,
    SwipeToConfirmButton,
    ShatterButton,
    UndoButton,
    TwoStepButton,
    ProgressButton,
    CommandButton,
    RevealButton,
    RateLimitButton,
    SmartPasteButton,
    SplitActionButton,
    CheckoutButton,
    ReactionButton,
    DownloadButton,
    PeekButton,
    ScrambleButton,
    BreatheButton,
    GravityButton,
    FluxButton,
    LoadingButtonSuccessDemo,
    LoadingButtonFailureDemo,
    HoldToConfirmDemo,
    HoldToConfirmPublishDemo,
    CountdownCustomFormatDemo,
    ProgressButtonDemo,
    CommandButtonDemo,
    UndoButtonDemo,
    TwoStepButtonDemo,
    TwoStepButtonDestructiveDemo,
    RateLimitButtonDemo,
    SmartPasteButtonDemo,
    SplitActionButtonDemo,
    CheckoutButtonDemo,
    CheckoutButtonFailureDemo,
    ReactionButtonDemo,
    DownloadButtonDemo,
    PeekButtonDemo,
    ScrambleButtonDemo,
    ScrambleButtonCustomDemo,
    BreatheButtonDemo,
    BreatheButtonSlowDemo,
    GravityButtonDemo,
    FluxButtonDemo,
    FluxButtonCustomDemo,
  };
}
