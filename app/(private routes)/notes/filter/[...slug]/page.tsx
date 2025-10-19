import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteClient from "./Notes.client";
import { Metadata } from "next";
import { fetchServerNotes } from "@/lib/api/serverApi";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

const debouncedSearch = "";
const page = 1;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const tag = !slug.length || slug[0] === "All" ? undefined : slug[0];
  return {
    title: tag
      ? `Notes tagged with "${tag}" - Note hub`
      : "All Notes - Note hub",
    description: tag
      ? `Browse notes tagged with "${tag}".`
      : "Browse all notes.",
    openGraph: {
      title: tag
        ? `Notes tagged with "${tag}" - Note hub`
        : "All Notes - Note hub",
      description: tag
        ? `Browse notes tagged with "${tag}".`
        : "Browse all notes.",
      url: `https://08-zustand-sand-tau.vercel.app/notes/filter/${slug[0]}`,
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
}

const NoteDetails = async ({ params }: Props) => {
  const queryClient = new QueryClient();

  const { slug = [] } = await params;
  const tag = !slug.length || slug[0] === "All" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => fetchServerNotes(debouncedSearch, page, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
