"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEffect } from "react";

export function DropdownMenuComponent({ open, setOpen }) {

  const closeDropdown = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        closeDropdown();
      }
    };

    if (open) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [open]);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px] p-2 mx-4 mt-8">
        <DropdownMenuItem className="font-semibold text-lg hover:bg-zinc-100 pt-3">
          <Link href="/resume" >
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="font-semibold text-lg hover:cursor-pointer hover:bg-zinc-100">
          Logout
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
