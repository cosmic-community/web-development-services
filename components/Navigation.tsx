'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Team', href: '/team' },
  { label: 'Testimonials', href: '/testimonials' },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-primary-900' : 'text-white'
            }`}
          >
            <span className="text-accent-500">Web</span>Dev
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-accent-500'
                    : isScrolled
                    ? 'text-primary-700 hover:text-accent-500'
                    : 'text-white hover:text-accent-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/team"
              className="btn-primary text-sm py-2 px-5"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-primary-900 hover:bg-primary-100'
                : 'text-white hover:bg-white hover:bg-opacity-10'
            }`}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-xl shadow-xl border border-primary-100 overflow-hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-6 py-4 font-medium border-b border-primary-50 transition-colors ${
                  pathname === link.href
                    ? 'text-accent-600 bg-accent-50'
                    : 'text-primary-700 hover:bg-primary-50 hover:text-accent-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="p-4">
              <Link href="/team" className="btn-primary w-full text-center">
                Get In Touch
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}