'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Docs', href: '#docs' },
        { name: 'Use Cases', href: '#use-cases' },
        { name: 'Pricing', href: '#pricing' },
    ];

    const scrollToDemo = () => {
        const element = document.getElementById('demo');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            // Offset for fixed header
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-gray-950/80 backdrop-blur-md border-quantum-900/50 py-3"
                    : "bg-transparent border-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-quantum-500 to-purple-600 rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-glow">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Q-RISQ
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-quantum-500 group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 hover:bg-gray-800"
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="glow"
                        size="sm"
                        onClick={scrollToDemo}
                    >
                        Try Demo
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-400 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 w-full bg-gray-950 border-b border-gray-800 p-4 flex flex-col gap-4 shadow-xl"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-quantum-400 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 mt-2">
                        <Button variant="outline" className="w-full justify-center">Sign In</Button>
                        <Button variant="glow" className="w-full justify-center" onClick={() => { scrollToDemo(); setMobileMenuOpen(false); }}>Try Demo</Button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};
