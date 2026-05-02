import { Note } from '@/types/note';
import axios from 'axios';

interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
// Получение заметки

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<NotesResponse> => {
  const response = await axios.get('/notes', {
    params: {
      page,
      search,
      tag,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

// Создание заметки

export const createNote = async (newTask: CreateNotePayload) => {
  const response = await axios.post<Note>('/notes', newTask, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

// Удаление заметки
export const deleteNote = async (id: string) => {
  const response = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

// Отримання однієї нотатки
export const fetchNoteById = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return res.data;
};
