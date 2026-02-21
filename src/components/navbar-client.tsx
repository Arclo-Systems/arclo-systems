"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";

type NavLink = {
  label: string;
  href: string;
};

type NavbarClientProps = {
  links: NavLink[];
  contactLabel: string;
};

export function NavbarClient({ links, contactLabel }: NavbarClientProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleButtonRef.current?.focus();
      }
    },
    [open],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      const firstFocusable = menuRef.current?.querySelector<HTMLElement>(
        "a, button",
      );
      firstFocusable?.focus();
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  return (
    <>
      <div className="hidden items-center gap-8 lg:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        <LanguageSwitcher />
        <Link
          href="/#contact"
          className="inline-flex h-9 items-center rounded-full bg-neutral-900 px-5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#2563EB]"
        >
          {contactLabel}
        </Link>
      </div>

      <button
        ref={toggleButtonRef}
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100 lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted && open
        ? createPortal(
          <div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex flex-col bg-white lg:hidden overscroll-contain"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Link href="/" onClick={() => setOpen(false)} className="font-outfit text-2xl font-bold text-neutral-900">
                arclo<span className="text-[#2563EB]">·</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-50"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-7">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-neutral-400 transition-colors hover:text-neutral-900"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-10 items-center rounded-full bg-neutral-900 px-6 text-sm font-medium text-white transition-all duration-200 hover:bg-[#2563EB]"
              >
                {contactLabel}
              </Link>
            </div>

            <div className="flex items-center justify-center pb-10">
              <LanguageSwitcher />
            </div>
          </div>,
          document.body,
        )
        : null}
    </>
  );
}
