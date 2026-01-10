"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navList } from "./data/navList";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/shared/assets/navbar/site-logo.webp";

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setIsScrolled(currentScrollY > 10);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-transform duration-300",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav
          className={cn(
            "w-full px-4 md:px-6 lg:px-8 transition-all duration-300",
            isScrolled
              ? "bg-brand-primary-scrolled backdrop-blur-sm"
              : "bg-brand-primary"
          )}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src={logo}
                alt="logo"
                width={100}
                height={100}
                className="brightness-0 invert"
                draggable={false}
                loading="lazy"
              />
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {navList.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "text-white font-normal text-sm md:text-base relative pb-1.5 transition-colors hover:text-white/90",
                      active && "text-active"
                    )}
                  >
                    {item.title}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-1 bg-white" />
                    )}
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={cn(
          "lg:hidden fixed top-16 md:top-20 right-0 z-40 w-64 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-brand-primary transition-transform duration-300 shadow-xl",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col p-6 space-y-4">
          {navList.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "text-white font-medium text-base py-3 px-4 rounded-md transition-colors relative",
                  active
                    ? "bg-white/20 text-white"
                    : "hover:bg-white/10 text-white/90"
                )}
              >
                {item.title}
                {active && (
                  <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-r" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Header;
