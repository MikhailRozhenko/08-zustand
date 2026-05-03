import NoteForm from '@/components/NoteForm/NoteForm';
import type { Metadata } from 'next';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create a new note and organize your ideas in NoteHub.',
  openGraph: {
    title: 'Create Note | NoteHub',
    description: 'Create a new note and organize your ideas in NoteHub.',
    url: 'https://notehub.com/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
