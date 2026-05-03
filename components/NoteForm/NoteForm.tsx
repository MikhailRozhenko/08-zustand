'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useId } from 'react';

import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const fieldId = useId();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  const handleCreateNote = (formData: FormData) => {
    const values = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as string,
    };

    mutation.mutate(values);
  };

  return (
    <form className={css.form} action={handleCreateNote}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          defaultValue={draft.title}
          onChange={(e) =>
            setDraft({
              ...draft,
              title: e.target.value,
            })
          }
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          maxLength={500}
          defaultValue={draft.content}
          onChange={(e) =>
            setDraft({
              ...draft,
              content: e.target.value,
            })
          }
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>

        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          required
          defaultValue={draft.tag}
          onChange={(e) =>
            setDraft({
              ...draft,
              tag: e.target.value,
            })
          }
        >
          <option value="" disabled>
            Select a tag
          </option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
