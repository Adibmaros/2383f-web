"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function DarkMode() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative overflow-hidden rounded-full w-10 h-10 
            bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
            hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
            dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400
            hover:shadow-lg hover:scale-110 transition-all duration-300"
        >
          <Sun
            className="absolute h-5 w-5 text-white rotate-0 scale-100 transition-all duration-500
            dark:-rotate-90 dark:scale-0"
          />
          <Moon
            className="absolute h-5 w-5 text-white rotate-90 scale-0 transition-all duration-500
            dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-40 backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 
          border border-gray-200 dark:border-gray-700"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 cursor-pointer
            hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50
            dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30
            transition-all duration-300"
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 cursor-pointer
            hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50
            dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30
            transition-all duration-300"
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 cursor-pointer
            hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50
            dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30
            transition-all duration-300"
        >
          <Laptop className="h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
