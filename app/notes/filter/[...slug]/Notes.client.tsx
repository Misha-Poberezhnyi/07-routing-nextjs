'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
import { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import { Note } from '@/types/note';
import NoteForm from '@/components/NoteForm/NoteForm';

type NotesClientProps = {
  query: string;
  page: number;
  initialData: {
    notes: Note[];
    totalPages: number;
  };
  tag: string;
};

function NotesClient({ query, page, initialData, tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(page);
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);
  const [debouncedText] = useDebounce(searchQuery, 300); 

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ['notes', debouncedText, currentPage, tag],
    queryFn: () => fetchNotes(debouncedText, currentPage, tag),
    placeholderData: keepPreviousData, 
    initialData: debouncedText === query && currentPage === page ? initialData : undefined,
    refetchOnMount: false, 
  });

  if (isError) throw error;

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedText]);

  function handleSearchChange(value: string) {
    setSearchQuery(value);
  }

  function handlePageChange({ selected }: { selected: number }) {
    setCurrentPage(selected + 1); 
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            onPageChange={handlePageChange} 
            currentPage={currentPage}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
          />
        )}

        <button className={css.button} onClick={() => setIsOpenModal(true)}>
          Create note +
        </button>
      </header>

      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <NoteForm onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
