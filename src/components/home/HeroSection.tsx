'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Artist } from '@/lib/types';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

interface HeroSectionProps {
    featuredArtists: Artist[];
}

export function HeroSection({ featuredArtists }: HeroSectionProps) {
    const t = useTranslations();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 80, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-[var(--neon-cyan)]/5 blur-3xl"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Text Content */}
                    <div className="text-center lg:text-left">
                        <FadeIn delay={0.2}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                                <Sparkles size={16} className="text-primary" />
                                <span className="text-sm font-medium text-primary">
                                    {t('hero.featuredArtist')}
                                </span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
                                <span className="text-foreground">{t('hero.title')}</span>
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-[var(--neon-cyan)] text-glow-purple">
                                    {t('hero.titleHighlight')}
                                </span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10">
                                {t('hero.subtitle')}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.5}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link href="/browse">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-lg animate-pulse-glow hover:animate-none transition-all"
                                    >
                                        {t('hero.cta')}
                                    </motion.button>
                                </Link>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right - Featured Artists Showcase */}
                    <FadeIn delay={0.6} direction="left">
                        <div className="relative">
                            {/* Main featured artist card */}
                            {featuredArtists[0] && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.6 }}
                                    className="relative z-20"
                                >
                                    <Link href={`/artist/${featuredArtists[0].id}`}>
                                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 glow-purple">
                                            <Image
                                                src={featuredArtists[0].portfolio[0]?.url || '/images/placeholder.jpg'}
                                                alt={featuredArtists[0].name}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                                            {/* Artist info overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <div className="flex items-end gap-4">
                                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-background">
                                                        <Image
                                                            src={featuredArtists[0].avatarUrl}
                                                            alt={featuredArtists[0].name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-foreground">
                                                            {featuredArtists[0].name}
                                                        </h3>
                                                        <p className="text-muted-foreground">
                                                            {featuredArtists[0].studioName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )}

                            {/* Secondary featured cards */}
                            <div className="absolute -right-8 top-1/4 z-10 hidden lg:block">
                                <StaggerContainer staggerDelay={0.15}>
                                    {featuredArtists.slice(1, 3).map((artist, idx) => (
                                        <StaggerItem key={artist.id}>
                                            <motion.div
                                                whileHover={{ scale: 1.05, x: -10 }}
                                                className="mb-4"
                                            >
                                                <Link href={`/artist/${artist.id}`}>
                                                    <div className="relative w-32 h-40 rounded-xl overflow-hidden border border-border/50 bg-card hover:border-primary/50 transition-colors">
                                                        <Image
                                                            src={artist.portfolio[0]?.url || '/images/placeholder.jpg'}
                                                            alt={artist.name}
                                                            fill
                                                            className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                                                        <div className="absolute bottom-2 left-2 right-2">
                                                            <p className="text-xs font-medium text-foreground truncate">
                                                                {artist.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        </StaggerItem>
                                    ))}
                                </StaggerContainer>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-muted-foreground">{t('common.scrollToExplore')}</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ChevronDown size={24} className="text-muted-foreground" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Marquee of portfolio images */}
            <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden opacity-30">
                <div className="flex animate-marquee">
                    {[...featuredArtists, ...featuredArtists].flatMap(artist =>
                        artist.portfolio.slice(0, 2)
                    ).map((img, idx) => (
                        <div
                            key={`${img.id}-${idx}`}
                            className="flex-shrink-0 w-32 h-24 mx-1"
                        >
                            <Image
                                src={img.url}
                                alt={img.alt}
                                width={128}
                                height={96}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
