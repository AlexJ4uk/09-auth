import type { Metadata } from "next";
import NotFound from "./not-found.client";

export const metadata: Metadata = {
  title: "Page Not Found - Note hub",
  description: "The page you are looking for does not exist.",
  openGraph: {
    title: "Page Not Found - Note hub",
    description: "The page you are looking for does not exist.",
    url: "https://09-auth-navy-nu.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note hub",
      },
    ],
  },
};

const NotFoundPage = () => {
  return <NotFound />;
};

export default NotFoundPage;
