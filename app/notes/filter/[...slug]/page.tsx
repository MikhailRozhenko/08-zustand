import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import { Metadata } from 'next';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const selectedTag = slug[0];
  const tag = selectedTag === 'all' ? 'All notes' : selectedTag;

  const title = `Notes filtered by: ${tag} | NoteHub`;
  const description = `Browse notes filtered by "${tag}" category.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${selectedTag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

export default async function NotesFilterPage({ params }: Props) {
  const { slug } = await params;

  const selectedTag = slug[0];
  const tag = selectedTag === 'all' ? undefined : selectedTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
