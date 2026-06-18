"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Homepage" },
    { href: "/days-ago", label: "Days Ago Calculator" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Clock className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">Time Tools</span>
        </Link>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-2 rounded-full border bg-muted/40 p-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                pathname === link.href
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Area */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile Menu (Hidden on Desktop) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="flex flex-col w-[300px] sm:w-[350px] p-0">
              {/* Sidebar Header */}
              <div className="p-6 border-b">
                <Link href="/" className="flex items-center gap-2">
                   <Clock className="h-6 w-6 text-primary" />
                   <span className="text-xl font-bold tracking-tight">Time Tools</span>
                </Link>
                <p className="mt-2 text-sm text-muted-foreground">
                  Simple tools for your daily calculations.
                </p>
              </div>

              {/* Sidebar Links */}
              <div className="flex flex-col gap-1 p-4">
                {links.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center w-full rounded-md px-4 py-3 text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              <div className="mt-auto border-t p-6">
                <p className="text-xs text-muted-foreground">
                  &copy; {new Date().getFullYear()} Time Tools. Built with Love By Kushyar.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
