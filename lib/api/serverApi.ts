import { User } from "@/types/user";
import { Note } from "@/types/note";
import { cookies } from "next/headers";
import { nextServer } from "./api";
import { fetchNoteProps } from "./clientApi";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export async function fetchServerNotes(
  search: string,
  page: number,
  tag?: string
): Promise<fetchNoteProps> {
  const cookieStore = await cookies();
  const request = await nextServer.get<fetchNoteProps>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return request.data;
}

export async function fetchServerNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}
