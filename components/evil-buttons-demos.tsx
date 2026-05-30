"use client";

import { LoadingButton } from "@/components/evil-buttons/loading-button";
import { HoldToConfirmButton } from "@/components/evil-buttons/hold-to-confirm";
import { CountdownButton } from "@/components/evil-buttons/countdown-button";
import { ProgressButton } from "@/components/evil-buttons/progress-button";
import { CommandButton } from "@/components/evil-buttons/command-button";
import { UndoButton } from "@/components/evil-buttons/undo-button";
import { TwoStepButton } from "@/components/evil-buttons/two-step-button";
import { RateLimitButton } from "@/components/evil-buttons/rate-limit-button";
import { SmartPasteButton } from "@/components/evil-buttons/smart-paste-button";
import { SplitActionButton } from "@/components/evil-buttons/split-action-button";
import { CheckoutButton } from "@/components/evil-buttons/checkout-button";
import { ReactionButton } from "@/components/evil-buttons/reaction-button";
import { DownloadButton } from "@/components/evil-buttons/download-button";
import { PeekButton } from "@/components/evil-buttons/peek-button";
import { ScrambleButton } from "@/components/evil-buttons/scramble-button";
import { BreatheButton } from "@/components/evil-buttons/breathe-button";
import { GravityButton } from "@/components/evil-buttons/gravity-button";
import { FluxButton } from "@/components/evil-buttons/flux-button";
import { useEffect, useRef, useState } from "react";

export function LoadingButtonSuccessDemo() {
  return (
    <LoadingButton
      idleLabel="Deploy"
      pendingLabel="Deploying..."
      successLabel="Deployed"
      onClick={() => new Promise((resolve) => setTimeout(resolve, 1600))}
    />
  );
}

export function LoadingButtonFailureDemo() {
  return (
    <LoadingButton
      idleLabel="Run Migration"
      pendingLabel="Migrating..."
      errorLabel="Reverted"
      onClick={() =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("boom")), 1400),
        )
      }
    />
  );
}

export function HoldToConfirmDemo() {
  return (
    <HoldToConfirmButton
      idleLabel="Hold to delete"
      holdingLabel="Keep holding..."
      confirmedLabel="Deleted"
      onConfirm={() => {}}
    />
  );
}

export function HoldToConfirmPublishDemo() {
  return (
    <HoldToConfirmButton
      destructive={false}
      holdDuration={900}
      idleLabel="Hold to publish"
      holdingLabel="Publishing..."
      confirmedLabel="Published"
      onConfirm={() => {}}
    />
  );
}

export function CountdownCustomFormatDemo() {
  return (
    <CountdownButton
      cooldownSeconds={5}
      idleLabel="Try again"
      formatCooldown={(s) => `Try again in ${s}s`}
    />
  );
}

export function ProgressButtonDemo() {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, []);

  const start = () => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    setProgress(8);
    intervalRef.current = window.setInterval(() => {
      setProgress((value) => {
        const next = Math.min(value + 13, 100);
        if (next >= 100 && intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return next;
      });
    }, 320);
  };

  return (
    <ProgressButton
      progress={progress}
      idleLabel="Export CSV"
      runningLabel="Exporting"
      completeLabel="Exported"
      onClick={start}
    />
  );
}

export function CommandButtonDemo() {
  const [count, setCount] = useState(0);

  return (
    <CommandButton
      shortcut="mod+k"
      onCommand={() => setCount((value) => value + 1)}
      onClick={() => setCount((value) => value + 1)}
    >
      Command {count ? `(${count})` : ""}
    </CommandButton>
  );
}

export function UndoButtonDemo() {
  return (
    <UndoButton
      idleLabel="Archive item"
      pendingLabel="Archived"
      undoWindow={4200}
      onCommit={() => {}}
      onUndo={() => {}}
    />
  );
}

export function TwoStepButtonDemo() {
  return (
    <TwoStepButton
      idleLabel="Deploy"
      armedLabel="Click again to deploy"
      confirmedLabel="Deployed"
      onConfirm={() => {}}
    />
  );
}

export function TwoStepButtonDestructiveDemo() {
  return (
    <TwoStepButton
      destructive
      idleLabel="Reset API key"
      armedLabel="Confirm reset"
      confirmedLabel="Reset"
      onConfirm={() => {}}
    />
  );
}

export function RateLimitButtonDemo() {
  return (
    <RateLimitButton
      maxUses={3}
      cooldownSeconds={8}
      idleLabel="Generate"
      cooldownLabel="Quota reset"
      readyLabel="Refilled"
      onTrigger={() => {}}
    />
  );
}

export function SmartPasteButtonDemo() {
  return (
    <SmartPasteButton
      idleLabel="Paste token"
      validLabel="Token accepted"
      invalidLabel="Wrong format"
      validate={(value) => /^sk_[a-z0-9_-]{8,}$/i.test(value)}
      onPaste={() => {}}
    />
  );
}

export function SplitActionButtonDemo() {
  return (
    <SplitActionButton
      label="Publish"
      onPrimary={() => {}}
      onSelect={() => {}}
      items={[
        { label: "Save draft", value: "draft", description: "Keep private" },
        { label: "Schedule", value: "schedule", description: "Pick a time" },
        { label: "Publish now", value: "publish", description: "Go live" },
      ]}
    />
  );
}

export function CheckoutButtonDemo() {
  return (
    <CheckoutButton
      amount="$24"
      idleLabel="Pay"
      processingLabel="Processing"
      approvedLabel="Paid"
      declinedLabel="Declined"
      onClick={() => new Promise((resolve) => setTimeout(resolve, 1400))}
    />
  );
}

export function CheckoutButtonFailureDemo() {
  return (
    <CheckoutButton
      amount="$99"
      idleLabel="Charge"
      processingLabel="Charging"
      declinedLabel="Declined"
      onClick={() =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("declined")), 1200),
        )
      }
    />
  );
}

export function ReactionButtonDemo() {
  return <ReactionButton defaultCount={128} label="Boost" icon="★" />;
}

export function DownloadButtonDemo() {
  return (
    <DownloadButton
      idleLabel="Export PDF"
      downloadingLabel="Exporting"
      completeLabel="Ready"
      onClick={() => new Promise((resolve) => setTimeout(resolve, 1500))}
    />
  );
}

export function PeekButtonDemo() {
  return <PeekButton peek="12 pending reviews">Open queue</PeekButton>;
}

export function ScrambleButtonDemo() {
  return (
    <ScrambleButton
      idleLabel="Generate"
      scrambledLabel="Ready!"
    />
  );
}

export function ScrambleButtonCustomDemo() {
  return (
    <ScrambleButton
      idleLabel="Decrypt"
      scrambledLabel="Unlocked"
      duration={1200}
      scrambleChars="░▒▓█▲▼◄►☺☻"
    />
  );
}

export function BreatheButtonDemo() {
  return <BreatheButton>Take a moment</BreatheButton>;
}

export function BreatheButtonSlowDemo() {
  return (
    <BreatheButton speed={6000} amplitude={1.04}>
      Deep breath
    </BreatheButton>
  );
}

export function GravityButtonDemo() {
  return <GravityButton>Move your mouse</GravityButton>;
}

export function FluxButtonDemo() {
  return <FluxButton>Flux</FluxButton>;
}

export function FluxButtonCustomDemo() {
  return (
    <FluxButton
      speed={4}
      colors={["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6b6b"]}
    >
      Sunset
    </FluxButton>
  );
}
