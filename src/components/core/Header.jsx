import { useState } from 'react';
import Link from 'next/link';

export default function Header({ 
  title = "My Website", 
  navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ],
  logoText = "LOGO",
  variant = "default" // default, transparent, colored
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const variants = {
    default: "bg-white text-gray-800 shadow-md",
    transparent: "bg-transparent text-white",
    colored: "bg-indigo-600 text-white"
  };
  
  return (
    <header className={`${variants[variant]} fixed w-full top-0 z-40`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">{logoText}</Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="hover:underline">{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-gray-800 shadow-lg">
          <ul className="px-4 py-2">
            {navItems.map((item, index) => (
              <li key={index} className="py-2">
                <Link href={item.href} onClick={() => setIsMenuOpen(false)} className="block hover:underline">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
