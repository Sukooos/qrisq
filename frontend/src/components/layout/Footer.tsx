'use client';

import Link from 'next/link';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-tr from-quantum-500 to-purple-600 rounded text-white text-xs">
                                <Sparkles className="w-3 h-3" />
                            </div>
                            <span className="text-lg font-bold text-white">Q-RISQ</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Quantum-powered risk intelligence platform geared for the enterprise of tomorrow.
                        </p>
                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="text-gray-500 hover:text-quantum-400 transition-colors">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Columns */}
                    {[
                        { title: "Product", links: ["Features", "Security", "Enterprise", "Pricing"] },
                        { title: "Resources", links: ["Documentation", "API Reference", "Case Studies", "Status"] },
                        { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
                    ].map((col) => (
                        <div key={col.title}>
                            <h4 className="text-white font-semibold mb-4">{col.title}</h4>
                            <ul className="space-y-2">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-gray-500 hover:text-quantum-400 text-sm transition-colors">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                    <p>© 2025 PT Quantum Digital Indonesia. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-gray-400">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gray-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
