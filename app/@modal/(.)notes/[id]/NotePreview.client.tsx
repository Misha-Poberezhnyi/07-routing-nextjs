'use client';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import css from './NotePreview.module.css';
import QueryStatus from '@/components/QueryStatus/QueryStatus'; 

interface NotePreviewClientProps {
  id: number;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();
  const closeModal = () => router.back();

  const {
    data: note,
    isLoading,
    error,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={closeModal}>
      <QueryStatus
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={!note && !isLoading} 
        emptyMessage="Note not found"
      />

      {note && isSuccess && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <button className={css.backBtn} onClick={closeModal}>Back</button>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.tag}><strong>Tag:</strong> {note.tag}</p>
            <p className={css.date}>
              {note.updatedAt ? `Updated at: ${note.updatedAt}` : `Created at: ${note.createdAt}`}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
