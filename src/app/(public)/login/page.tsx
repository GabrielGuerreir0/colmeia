"use client";

import dynamic from "next/dynamic";
import React from "react";

const AuthForm = dynamic(
  () => import("@/components/auth/AuthForm").then((mod) => mod.AuthForm),
  {
    ssr: false,
  }
);

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <AuthForm />
    </div>
  );
}
