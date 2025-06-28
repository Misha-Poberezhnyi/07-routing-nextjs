import cssStyles from './NoteList.module.css';
import type { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import { deleteNote } from '@/lib/api';
import QueryStatus from '../QueryStatus/QueryStatus'; 
import { useState } from 'react';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const [deletingNoteId, setDeletingNoteId] = useState<Note['id'] | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: Note['id']) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setDeletingNoteId(null); 
    },
    onError: () => {
      setDeletingNoteId(null); 
    },
  });

  const { status, isError, error } = mutation;
  const isEmpty = notes.length === 0; 

  const handleDelete = (id: number) => {
    setDeletingNoteId(id); 
    mutation.mutate(id); 
  };

  return (
    <>
      <QueryStatus
        isLoading={status === 'pending'}  
        isError={isError}
        error={error}
        isEmpty={isEmpty}
        emptyMessage="No notes available." 
      />

      <ul className={cssStyles.list}>
        {notes.map(note => (
          <li key={note.id} className={cssStyles.listItem}>
            <h2 className={cssStyles.title}>{note.title}</h2>
            <p className={cssStyles.content}>{note.content}</p>
            <div className={cssStyles.footer}>
              <span className={cssStyles.tag}>{note.tag}</span>
              <Link className={cssStyles.detailsLink} href={`/notes/${note.id}`}>
                View details
              </Link>
              <button
                className={cssStyles.button}
                onClick={() => handleDelete(note.id)} 
                disabled={deletingNoteId === note.id} 
              >
                {deletingNoteId !== note.id ? 'Delete' : 'In progress'}
                {deletingNoteId === note.id && (
                  <span className={cssStyles.loader}>...</span> 
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
