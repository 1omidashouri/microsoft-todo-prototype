import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import AvatarMenu from "./avatar-menu";

export default function Header() {
  return (
    <div className="flex justify-between p-5 border-b-2">
      <Link href="/">
        <Check className="h-8 w-8" />
      </Link>
      <div className="flex gap-5">
        <ModeToggle />
        <AvatarMenu />
      </div>
    </div>
  );
}
