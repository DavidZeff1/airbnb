// app/SessionToasts.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import SignInMessage from "./SignInMessage";
import SignOutMessage from "./SignOutMessage";

export default function SessionToasts() {
  const { status } = useSession(); // "loading" | "authenticated" | "unauthenticated"
  const prev = useRef(status);
  const [toast, setToast] = useState<"in" | "out" | null>(null);

  useEffect(() => {
    if (prev.current === "unauthenticated" && status === "authenticated") {
      setToast("in");
      setTimeout(() => setToast(null), 2000);
    }
    if (prev.current === "authenticated" && status === "unauthenticated") {
      setToast("out");
      setTimeout(() => setToast(null), 2000);
    }
    prev.current = status;
  }, [status]);

  return (
    <>
      {toast === "in" && <SignInMessage />}
      {toast === "out" && <SignOutMessage />}
    </>
  );
}
