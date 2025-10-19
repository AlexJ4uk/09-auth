"use client";

import { useEffect, useState } from "react";
import css from "./page.module.css";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import toast, { Toaster } from "react-hot-toast";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

const NoteClient = ({ tag }: { tag?: string }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 400);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.notes.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [data]);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <Toaster />
        <SearchBox
          value={search}
          onChange={(value: string) => {
            setSearch(value);
            setPage(1);
          }}
        />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages ?? 0}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <Link href="/notes/action/create">
          <button className={css.button}>Create note +</button>
        </Link>
      </div>
      {isSuccess && data?.notes.length > 0 && <NoteList notes={data?.notes} />}
    </div>
  );
};

export default NoteClient;
