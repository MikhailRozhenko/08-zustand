'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import Errorbox from '@/components/Errorbox/Errorbox';
import Loader from '@/components/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onEnd={() => router.back()}>
      {isLoading && <Loader />}
      {isError && <Errorbox />}

      {note && (
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p>{note.tag}</p>
          <p>{new Date(note.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </Modal>
  );
}
