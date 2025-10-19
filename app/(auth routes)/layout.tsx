"use client";

import { useEffect, useState } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [router]);

  return <div>{loading ? <Loading /> : children}</div>;
}
