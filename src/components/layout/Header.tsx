'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';

export function Header() {
    const t = useTranslations();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentLocale, setCurrentLocale] = useState('en');

    const toggleLocale = () => {
        const newLocale = currentLocale === 'en' ? 'fr' : 'en';
        setCurrentLocale(newLocale);
        document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
        window.location.reload();
    };

    const navLinks = [
        { href: '/', label: t('nav.home') },
        { href: '/browse', label: t('nav.browse') },
        { href: '/about', label: t('nav.about') },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mx-4 mt-4 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl"
            >
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="group flex items-center gap-2">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative"
                            >
                                <span className="font-display text-2xl font-bold text-foreground group-hover:text-glow-purple transition-all duration-300">
                                    Ink
                                </span>
                                <span className="font-display text-2xl font-bold text-primary group-hover:text-glow-pink transition-all duration-300">
                                    Finder
                                </span>
                                <motion.div
                                    className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-accent"
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="relative text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                                    >
                                        {link.label}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Language Toggle */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                onClick={toggleLocale}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                            >
                                <Globe size={16} className="text-primary" />
                                <span className="text-sm font-medium uppercase">{currentLocale}</span>
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>

                    {/* Mobile Navigation */}
                    <motion.div
                        initial={false}
                        animate={{
                            height: isMenuOpen ? 'auto' : 0,
                            opacity: isMenuOpen ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden"
                    >
                        <div className="py-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <button
                                onClick={toggleLocale}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Globe size={16} />
                                <span>{currentLocale === 'en' ? 'Français' : 'English'}</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </motion.nav>
        </header>
    );
}
