'use client';

type NotesClientProps = {
  tag?: string;
};

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';

import Errorbox from '@/components/Errorbox/Errorbox';
import Loader from '@/components/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from '../../../page.module.css';

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalOpen = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [page, setPage] = useState(1);

  const handleChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),

    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!isLoading && data && data.notes.length === 0 && search) {
      toast.error('На жаль, не вдалося завантажити нотатки😢.');
    }
  }, [data, isLoading, search]);

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={search} onSearch={handleChange} />

          {isSuccess && totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
          <button className={css.button} onClick={modalOpen}>
            Create note +
          </button>
        </header>

        {isLoading && <Loader />}
        {isError && <Errorbox />}

        <Toaster position="top-center" reverseOrder={false} />
        {data && data.notes.length > 0 && !isLoading && (
          <NoteList notes={data.notes} />
        )}

        {isModalOpen && (
          <Modal onEnd={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
