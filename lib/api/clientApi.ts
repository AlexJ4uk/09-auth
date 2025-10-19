import { User } from "@/types/user";
import type { Note, noteTag } from "../../types/note";
import { nextServer } from "./api";

export interface createNoteProps {
  title: string;
  content: string;
  tag: noteTag;
}

export interface fetchNoteProps {
  notes: Note[];
  totalPages: number;
}

export type userRegister = {
  email: string;
  password: string;
};

type checkSessionRequest = {
  success: boolean;
};

export type updateUserRequest = {
  username: string;
};

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string
): Promise<fetchNoteProps> {
  const request = await nextServer.get<fetchNoteProps>("/notes", {
    params: {
      search,
      page,
      perPage: 9,
      tag,
    },
  });

  return request.data;
}

export async function createNote(note: createNoteProps): Promise<Note> {
  const postRequest = await nextServer.post<Note>("/notes", note);

  return postRequest.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const deleteRequest = await nextServer.delete<Note>(`/notes/${id}`);
  return deleteRequest.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function register(data: userRegister) {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: userRegister) {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function checkSession() {
  const res = await nextServer.get<checkSessionRequest>("/auth/session");
  return res.data.success;
}

export async function getMe() {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

export const updateMe = async (payload: updateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
