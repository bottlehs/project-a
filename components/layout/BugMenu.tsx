"use client";

import Link from "next/link";
import { useState } from "react";
import { cta, menus } from "@/data/site";

export default function BugMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        className="flex size-10 items-center justify-center text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main lg:hidden"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          {isOpen ? (
            <path
              d="m6 6 12 12M18 6 6 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <nav
          aria-label="모바일 메뉴"
          className="absolute inset-x-0 top-full z-50 border-b border-line bg-cream px-5 pb-6 pt-3 shadow-lg lg:hidden"
          id="mobile-menu"
        >
          <ul className="mx-auto flex w-full max-w-content flex-col">
            {menus.map((menu) => (
              <li className="border-b border-line last:border-b-0" key={menu.href}>
                <Link
                  className="block py-4 text-base font-medium text-ink focus-visible:outline-2 focus-visible:outline-main"
                  href={menu.href}
                  onClick={closeMenu}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
            <li className="pt-5">
              <Link
                className="inline-flex w-full items-center justify-center rounded-full border border-transparent bg-main px-7 py-3.5 text-btn font-bold text-white transition-colors hover:bg-main-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
                href={cta.href}
                onClick={closeMenu}
              >
                {cta.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
