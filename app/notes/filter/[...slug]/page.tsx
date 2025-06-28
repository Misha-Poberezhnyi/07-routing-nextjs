import { fetchNotes } from '@/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Note } from '@/types/note';


type NotesProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const initialQuery: string = '';
  const initialPage: number = 1;
  const tag: string = slug[0] === 'all' ? '' : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialQuery, initialPage, tag],
    queryFn: () => fetchNotes(initialQuery, initialPage, tag),
  });

  const initialData = queryClient.getQueryData(['notes', initialQuery, initialPage, tag]) as {
    notes: Note[];
    totalPages: number;
  };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient query={initialQuery} page={initialPage} initialData={initialData} tag={tag} />
    </HydrationBoundary>
  );
}

export const dynamic = 'force-dynamic';
