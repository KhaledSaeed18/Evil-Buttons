import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  alternates: {
    canonical: "/docs",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function HomePage() {
  permanentRedirect("/docs");
}
