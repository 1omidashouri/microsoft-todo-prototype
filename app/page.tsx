import { ModeToggle } from "@/components/mode-toggle";
import SignInBtn from "@/components/signin-btn";
import { auth } from "@/db/auth";
import { ArrowRightIcon } from "lucide-react";
import { connection } from "next/server";
import { Suspense } from "react";

async function AuthSection() {
  await connection();
  const session = await auth();

  if (session) {
    return (
      <>
        home page <ArrowRightIcon className="ml-2" /> <br />
      </>
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
          <Suspense fallback={null}>
            <AuthSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
