'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Heart, Instagram, Twitter } from 'lucide-react';

export function Footer() {
    const t = useTranslations();
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { href: '/browse', label: t('nav.browse') },
        { href: '/about', label: t('nav.about') },
        { href: '/privacy', label: t('footer.privacy') },
        { href: '/terms', label: t('footer.terms') },
    ];

    const socialLinks = [
        { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
        { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
    ];

    return (
        <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-sm">
            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="inline-block mb-4">
                            <span className="font-display text-2xl font-bold text-foreground">
                                Ink
                            </span>
                            <span className="font-display text-2xl font-bold text-primary">
                                Finder
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            {t('common.tagline')}
                        </p>
                    </motion.div>

                    {/* Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col gap-3"
                    >
                        <h4 className="font-semibold text-foreground mb-2">Navigation</h4>
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-muted-foreground hover:text-primary transition-colors text-sm"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>

                    {/* Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                                >
                                    <social.icon
                                        size={20}
                                        className="text-muted-foreground group-hover:text-primary transition-colors"
                                    />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <p className="text-muted-foreground text-sm">
                        © {currentYear} InkFinder. {t('footer.rights')}
                    </p>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                        {t('footer.madeWith')} <Heart size={14} className="text-primary fill-primary" />
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
