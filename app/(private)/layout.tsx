import SessionProvider from "@/components/session-provider";
import { auth } from "@/db/auth";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ReactNode, Suspense } from "react";
import LoadingPage from "../loading";
import AppShell from "@/components/app-shell";

async function AuthenticatedShell({ children }: { children: ReactNode }) {
  await connection();
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <SessionProvider session={session}>
      <AppShell>{children}</AppShell>
    </SessionProvider>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AuthenticatedShell>{children}</AuthenticatedShell>
    </Suspense>
  );
}
