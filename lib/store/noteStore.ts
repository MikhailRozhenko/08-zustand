import type { CreateNotePayload } from '@/lib/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const initialDraft: CreateNotePayload = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteStore = {
  draft: CreateNotePayload;
  setDraft: (note: CreateNotePayload) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) => set({ draft: note }),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    },
  ),
);
