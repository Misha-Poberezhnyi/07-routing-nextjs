import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: NoteDetailsProps) {
  const queryClient = new QueryClient();

  const { id } = await params;
  const parsedId = Number(id);


  await queryClient.prefetchQuery({
    queryKey: ["note", parsedId],
    queryFn: () => fetchNoteById(parsedId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
