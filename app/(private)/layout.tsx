import SessionProvider from "@/components/session-provider";
import { auth } from "@/db/auth";
import { connection } from "next/server";
import { ReactNode, Suspense } from "react";

async function AuthenticatedShell({ children }: { children: ReactNode }) {
  await connection();
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div>{children}</div>
    </SessionProvider>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AuthenticatedShell>{children}</AuthenticatedShell>
    </Suspense>
  );
}
