import { ModeToggle } from "@/components/mode-toggle";
import SignInBtn from "@/components/signin-btn";
import { Button } from "@/components/ui/button";
import { auth } from "@/db/auth";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";

import { Suspense } from "react";
import LoadingPage from "./loading";

async function AuthSection() {
  await connection();
  const session = await auth();

  if (session) {
    return (
      <Link href="/tasks">
        <Button>
          go to task page <ArrowRightIcon className="ml-2" />
        </Button>
      </Link>
    );
  }

  return (
    <>
      <SignInBtn /> <br />
    </>
  );
}

export default function Home() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="flex flex-col gap-5 text-center">
        <ModeToggle /> <br />
        <h1>Microsoft to do prototype</h1>
        <div>
          <Suspense fallback={<LoadingPage/>}>
            <AuthSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
