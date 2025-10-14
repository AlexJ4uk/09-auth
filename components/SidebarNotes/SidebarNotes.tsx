import { tags } from "@/types/note";
import css from "./SidebarNotes.module.css";
import Link from "next/link";

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => {
        const tagUrl =
          tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`;
        return (
          <li className={css.menuItem} key={tag}>
            <Link href={tagUrl} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNotes;
