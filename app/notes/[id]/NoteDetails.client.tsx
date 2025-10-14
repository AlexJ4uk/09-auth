"use client";

import css from "./NoteDetails.module.css";
import style from "@/app/loading.module.css";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const NoteDetailsClient = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p className={style.text}>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
        <p className={css.tag}>{note.tag}</p>
        <button
          className={css.backBtn}
          type="button"
          onClick={() => router.back()}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
