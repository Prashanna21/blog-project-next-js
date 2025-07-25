"use client";

import React from "react";
import { useAuthGuard } from "@/utility/useAuthGuard";

function page() {
  const { loading, email } = useAuthGuard({ adminOnly: true });

  if (loading) return <div>Loading...</div>;

  return <div>admin</div>;
}

export default page;
