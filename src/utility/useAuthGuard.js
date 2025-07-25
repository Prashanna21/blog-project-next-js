"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useJWT } from "./useJWT";

export function useAuthGuard({ adminOnly = false } = {}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const userEmail = await useJWT.decodeToken();

      if (!userEmail) {
        router.replace("/login");
        return;
      }

      if (adminOnly && userEmail !== "admin@gmail.com") {
        router.replace("/unauthorized");
        return;
      }

      setEmail(userEmail);
      setLoading(false);
    }

    checkAuth();
  }, [router, adminOnly]);

  return { loading, email };
}
