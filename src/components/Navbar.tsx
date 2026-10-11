"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { Container, LinkButton } from "@/components/ui";
import { isNavItemActive, mainNav, SITE_NAME } from "@/lib/nav";

const FOCUSABLE = "a[href], button:not([disabled])";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
      ).filter((element) => element.getClientRects().length > 0);

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const query = window.matchMedia("(min-width: 48rem)");

    function onChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border/70 bg-bg/90 backdrop-blur"
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${SITE_NAME} home`}
          className="shrink-0 text-logo transition-colors hover:text-accent-hover"
        >
          <Logo className="h-5 w-auto" />
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((link) => {
              const active = isNavItemActive(pathname, link);

              return (
                <li key={link.href}>
                  {link.emphasis ? (
                    <LinkButton
                      href={link.href}
                      size="sm"
                      variant="secondary"
                      aria-current={active ? "page" : undefined}
                      className={active ? "border-accent bg-accent-dim" : undefined}
                    >
                      {link.label}
                    </LinkButton>
                  ) : (
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative inline-flex min-h-11 items-center rounded-[var(--radius-control)] px-3 text-metadata font-medium transition-colors ${
                        active
                          ? "bg-surface-2 text-text"
                          : "text-text-muted hover:bg-surface hover:text-text"
                      }`}
                    >
                      {link.label}
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3 -bottom-[1px] h-px bg-accent"
                        />
                      ) : null}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] text-text transition-colors hover:bg-surface md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            className="h-6 w-6"
          >
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-bg md:hidden"
        >
          <Container>
            <nav aria-label="Mobile navigation" className="py-3">
              <ul className="flex flex-col gap-1">
                {mainNav.map((link) => {
                  const active = isNavItemActive(pathname, link);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-11 items-center rounded-[var(--radius-control)] border px-3 text-body-secondary font-medium transition-colors ${
                          active
                            ? "border-accent bg-accent-dim text-text"
                            : link.emphasis
                              ? "border-border bg-surface text-text hover:border-accent"
                              : "border-transparent text-text-muted hover:bg-surface hover:text-text"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
