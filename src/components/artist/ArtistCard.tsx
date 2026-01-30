'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Instagram, ExternalLink } from 'lucide-react';
import { Artist } from '@/lib/types';

interface ArtistCardProps {
    artist: Artist;
    index?: number;
}

export function ArtistCard({ artist, index = 0 }: ArtistCardProps) {
    const t = useTranslations();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative"
        >
            <Link href={`/artist/${artist.id}`}>
                <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:border-primary/50 hover:glow-purple"
                >
                    {/* Featured Badge */}
                    {artist.isFeatured && (
                        <div className="absolute top-4 left-4 z-20">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/90 text-primary-foreground animate-pulse-glow">
                                {t('common.featured')}
                            </span>
                        </div>
                    )}

                    {/* Portfolio Preview - Main Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />

                        {/* Main image with grayscale to color effect */}
                        <Image
                            src={artist.portfolio[0]?.url || '/images/placeholder.jpg'}
                            alt={artist.name}
                            fill
                            className="object-cover image-hover-color"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />

                        {/* Portfolio grid preview on hover */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 z-10 grid grid-cols-2 grid-rows-2 gap-1 p-1 opacity-0 group-hover:opacity-100"
                        >
                            {artist.portfolio.slice(0, 4).map((img, idx) => (
                                <div key={img.id} className="relative overflow-hidden rounded-lg">
                                    <Image
                                        src={img.url}
                                        alt={img.alt}
                                        fill
                                        className="object-cover"
                                        sizes="25vw"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Artist Info */}
                    <div className="relative z-20 p-5 -mt-16">
                        {/* Avatar */}
                        <div className="relative w-16 h-16 mb-4 rounded-full overflow-hidden border-4 border-background group-hover:border-primary/50 transition-colors duration-300">
                            <Image
                                src={artist.avatarUrl}
                                alt={artist.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                            />
                        </div>

                        {/* Name & Studio */}
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {artist.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                            {artist.studioName}
                        </p>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                            <MapPin size={14} className="text-primary" />
                            <span>{artist.location.city}, {artist.location.stateProvince}</span>
                        </div>

                        {/* Style Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {artist.styles.slice(0, 3).map((style) => (
                                <span
                                    key={style}
                                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-300"
                                >
                                    {t(`styles.${style}`)}
                                </span>
                            ))}
                            {artist.styles.length > 3 && (
                                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                                    +{artist.styles.length - 3}
                                </span>
                            )}
                        </div>

                        {/* Quick Links */}
                        <div className="flex items-center gap-3 pt-3 border-t border-border/30">
                            {artist.contact.instagram && (
                                <motion.div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.open(`https://instagram.com/${artist.contact.instagram?.replace('@', '')}`, '_blank');
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    className="p-2 rounded-lg bg-muted hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
                                >
                                    <Instagram size={16} />
                                </motion.div>
                            )}
                            {artist.contact.website && (
                                <motion.div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.open(artist.contact.website, '_blank');
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    className="p-2 rounded-lg bg-muted hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
                                >
                                    <ExternalLink size={16} />
                                </motion.div>
                            )}
                            <span className="ml-auto text-xs text-muted-foreground group-hover:text-primary transition-colors">
                                {t('common.viewProfile')} →
                            </span>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}

// Compact version for grids
interface ArtistCardCompactProps {
    artist: Artist;
    index?: number;
}

export function ArtistCardCompact({ artist, index = 0 }: ArtistCardCompactProps) {
    const t = useTranslations();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
        >
            <Link href={`/artist/${artist.id}`}>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group relative overflow-hidden rounded-xl border border-border/50 bg-card hover:border-primary/50 transition-all duration-300"
                >
                    <div className="flex items-center gap-4 p-4">
                        {/* Avatar */}
                        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-border group-hover:border-primary/50 transition-colors">
                            <Image
                                src={artist.avatarUrl}
                                alt={artist.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                {artist.name}
                            </h4>
                            <p className="text-sm text-muted-foreground truncate">
                                {artist.location.city}
                            </p>
                            <div className="flex gap-1 mt-1.5">
                                {artist.styles.slice(0, 2).map((style) => (
                                    <span
                                        key={style}
                                        className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-muted text-muted-foreground"
                                    >
                                        {t(`styles.${style}`)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}
