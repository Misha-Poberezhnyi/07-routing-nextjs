import axios from 'axios';
import { Note } from '@/types/note';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!API_KEY) {
  throw new Error('NEXT_PUBLIC_NOTEHUB_TOKEN is not defined');
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteValues {
  title: string;
  content?: string;
  tag: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';
}

interface SearchParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

export async function fetchNotes(search: string, page: number, tag?: string): Promise<NotesResponse> {
  const perPage = 12; 
  const params: SearchParams = { page, perPage };

  if (search) params.search = search;
  if (tag) params.tag = tag;

  try {
    const res = await axios.get<NotesResponse>('/notes', {
      params,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error('Failed to fetch notes');
  }
}

export async function createNote({ title, content, tag }: CreateNoteValues): Promise<Note> {
  const res = await axios.post<Note>('/notes', {
    title,
    content,
    tag,
  });
  return res.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const res = await axios.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
}
