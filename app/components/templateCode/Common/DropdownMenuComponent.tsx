
"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export function DropdownMenuComponent({ open, setOpen }) {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px] p-2 mx-4 mt-8">
        <DropdownMenuItem className="font-semibold text-lg hover:bg-zinc-100 pt-3">
          <Link href="/dashboard" >
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem  onClick={() => {
                        signOut();
                      }} className="font-semibold text-lg hover:cursor-pointer hover:bg-zinc-100">
          Logout
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
