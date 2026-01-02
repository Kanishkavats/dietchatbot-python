"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoDropdownOpen, setIsDemoDropdownOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDemoDropdownOpen && !event.target.closest(".demo-dropdown")) {
        setIsDemoDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDemoDropdownOpen]);

  return (
    <div className="border-b border-gray-100 bg-white">
      <header className="flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
        <Link
          href="/"
          className="flex items-center space-x-1.5 sm:space-x-2 cursor-pointer"
        >
          <Image
            src="/image 14.svg"
            alt="Logo"
            width={32}
            height={32}
            className="w-6 sm:w-7 md:w-8 h-auto"
          />
          <span className="text-lg sm:text-xl font-semibold text-gray-800">
            <span className="text-[#345773]">Corporate </span>
            <span>Gate</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-16">
          <Link
            href="/templates"
            className="text-black cursor-pointer transition-colors font-medium hover:text-[#345773] text-sm lg:text-base"
          >
            Resume
          </Link>
          <Link
            href="/job-matching"
            className="text-black cursor-pointer transition-colors font-medium hover:text-[#345773] text-sm lg:text-base"
          >
            Job Matching
          </Link>
          <Link
            href="/interview"
            className="text-black cursor-pointer transition-colors font-medium hover:text-[#345773] text-sm lg:text-base"
          >
            AI Interview
          </Link>
          <Link
            href="/skill-assessment"
            className="text-black cursor-pointer transition-colors font-medium hover:text-[#345773] text-sm lg:text-base"
          >
            Skill Assessment
          </Link>
          <Link
            href="/ai-linkedin-enhancer"
            className="text-black cursor-pointer transition-colors font-medium hover:text-[#345773] text-sm lg:text-base"
          >
            LinkedIn Enhancer
          </Link>

          {/* <div className="relative demo-dropdown">
            <button
              onClick={() => setIsDemoDropdownOpen(!isDemoDropdownOpen)}
              className="text-black cursor-pointer transition-colors font-medium hover:text-[#345773] text-sm lg:text-base flex items-center space-x-1"
            >
              <span>Demo</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  isDemoDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDemoDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link
                  href="/chit-chat"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#345773] transition-colors"
                  onClick={() => setIsDemoDropdownOpen(false)}
                >
                  Chit Chat
                </Link>
                <Link
                  href="/video-generation"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#345773] transition-colors"
                  onClick={() => setIsDemoDropdownOpen(false)}
                >
                  Video Generation
                </Link>
                <Link
                  href="/image-generation"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#345773] transition-colors"
                  onClick={() => setIsDemoDropdownOpen(false)}
                >
                  Image Generation
                </Link>
                <Link
                  href="/dictionary"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#345773] transition-colors"
                  onClick={() => setIsDemoDropdownOpen(false)}
                >
                  Dictionary
                </Link>
              </div>
            )}
          </div> */}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <button className="hidden md:inline-block px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-[#345773] transition-colors font-medium cursor-pointer hover:text-[#2a4560] text-sm lg:text-base">
            Login
          </button>
          <button className="hidden md:inline-block px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-[#345773] border border-[#345773] rounded-full transition-colors font-medium cursor-pointer hover:bg-[#345773] hover:text-white text-sm lg:text-base">
            Register
          </button>

          <button
            className="md:hidden inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 sm:h-6 w-5 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Image
              src="/image 14.svg"
              alt="Logo"
              width={24}
              height={24}
              className="w-5 sm:w-6 h-auto"
            />
            <span className="text-base sm:text-lg font-semibold text-gray-800">
              <span className="text-[#345773]">Corporate </span>
              <span>Gate</span>
            </span>
          </Link>
          <button
            onClick={closeMenu}
            className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 sm:h-6 w-5 sm:w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <Link
              href="/templates"
              className="block text-base sm:text-lg text-black font-medium hover:text-[#345773] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={closeMenu}
            >
              Resume
            </Link>
            <Link
              href="/job-matching"
              className="block text-base sm:text-lg text-black font-medium hover:text-[#345773] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={closeMenu}
            >
              Job Matching
            </Link>
            <Link
              href="/interview"
              className="block text-base sm:text-lg text-black font-medium hover:text-[#345773] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={closeMenu}
            >
              AI Interview
            </Link>
            <Link
              href="/skill-assessment"
              className="block text-base sm:text-lg text-black font-medium hover:text-[#345773] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={closeMenu}
            >
              Skill Assessment
            </Link>
            <Link
              href="/ai-linkedin-enhancer"
              className="block text-base sm:text-lg text-black font-medium hover:text-[#345773] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={closeMenu}
            >
              LinkedIn Enhancer
            </Link>

            {/* <div className="space-y-2 demo-dropdown"> 
              {/* <button
                onClick={() => setIsDemoDropdownOpen(!isDemoDropdownOpen)}
                className="w-full flex items-center justify-between text-base sm:text-lg text-black font-medium hover:text-[#345773] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              >
                <span>Demo</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform ${isDemoDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDemoDropdownOpen && (
                <div className="pl-4 space-y-2">
                  <Link
                    href="/chit-chat"
                    className="block text-sm sm:text-base text-gray-700 font-medium hover:text-[#345773] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                    onClick={closeMenu}
                  >
                    Chit Chat
                  </Link>
                  <Link
                    href="/video-generation"
                    className="block text-sm sm:text-base text-gray-700 font-medium hover:text-[#345773] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                    onClick={closeMenu}
                  >
                    Video Generation
                  </Link>
                  <Link
                    href="/image-generation"
                    className="block text-sm sm:text-base text-gray-700 font-medium hover:text-[#345773] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                    onClick={closeMenu}
                  >
                    Image Generation
                  </Link>
                  <Link
                    href="/dictionary"
                    className="block text-sm sm:text-base text-gray-700 font-medium hover:text-[#345773] transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                    onClick={closeMenu}
                  >
                    Dictionary
                  </Link>
                </div>
              )}
            </div> */}
          </div>

          <div className="pt-4 sm:pt-6 space-y-3">
            <button
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-[#345773] border border-[#345773] rounded-full font-medium hover:bg-[#345773] hover:text-white transition-all duration-200 text-sm sm:text-base"
              onClick={closeMenu}
            >
              Login
            </button>
            <button
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-[#345773] text-white rounded-full font-medium hover:bg-[#2a4560] transition-all duration-200 text-sm sm:text-base"
              onClick={closeMenu}
            >
              Register
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
