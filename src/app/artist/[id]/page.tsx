import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, MapPin, Instagram, Globe, Calendar, ArrowUpRight } from 'lucide-react';
import { getArtistById, mockArtists } from '@/lib/data';
import { FadeInView, PageTransition } from '@/components/animations';
import { PortfolioGrid } from '@/components/ui/Lightbox';

interface ArtistPageProps {
    params: Promise<{ id: string }>;
}

// Generate static params for all artists
export async function generateStaticParams() {
    return mockArtists.map((artist) => ({
        id: artist.id,
    }));
}

export default async function ArtistPage({ params }: ArtistPageProps) {
    const { id } = await params;
    const t = await getTranslations();
    const artist = getArtistById(id);

    if (!artist) {
        notFound();
    }

    return (
        <PageTransition>
            <div className="min-h-screen pt-24 pb-16">
                {/* Hero Section */}
                <section className="relative">
                    {/* Background gradient */}
                    <div className="absolute inset-0 h-96 gradient-bg opacity-50" />

                    <div className="container mx-auto px-6 relative z-10">
                        {/* Back Button */}
                        <FadeInView>
                            <Link
                                href="/browse"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 backdrop-blur-sm hover:bg-muted transition-colors mb-8"
                            >
                                <ArrowLeft size={18} />
                                <span>{t('nav.browse')}</span>
                            </Link>
                        </FadeInView>

                        {/* Artist Header */}
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* Avatar */}
                            <FadeInView direction="right">
                                <div className="relative w-40 h-40 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border-4 border-background glow-purple flex-shrink-0">
                                    <Image
                                        src={artist.avatarUrl}
                                        alt={artist.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </FadeInView>

                            {/* Info */}
                            <FadeInView delay={0.1}>
                                <div className="flex-1">
                                    {/* Featured Badge */}
                                    {artist.isFeatured && (
                                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary mb-4">
                                            {t('common.featured')}
                                        </span>
                                    )}

                                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
                                        {artist.name}
                                    </h1>
                                    <p className="text-xl text-muted-foreground mb-6">
                                        {artist.studioName}
                                    </p>

                                    {/* Location */}
                                    <div className="flex items-center gap-2 text-muted-foreground mb-6">
                                        <MapPin size={18} className="text-primary" />
                                        <span>
                                            {t('artist.basedIn')} {artist.location.city}, {artist.location.stateProvince}, {artist.location.country}
                                        </span>
                                    </div>

                                    {/* Style Tags */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {artist.styles.map((style) => (
                                            <Link
                                                key={style}
                                                href={`/browse?style=${style}`}
                                                className="px-4 py-2 text-sm font-medium rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-colors"
                                            >
                                                {t(`styles.${style}`)}
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Contact Buttons */}
                                    <div className="flex flex-wrap gap-4">
                                        {artist.contact.bookingUrl && (
                                            <a
                                                href={artist.contact.bookingUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                                            >
                                                <Calendar size={18} />
                                                {t('artist.booking')}
                                            </a>
                                        )}
                                        {artist.contact.instagram && (
                                            <a
                                                href={`https://instagram.com/${artist.contact.instagram.replace('@', '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                                            >
                                                <Instagram size={18} className="text-primary" />
                                                Instagram
                                            </a>
                                        )}
                                        {artist.contact.website && (
                                            <a
                                                href={artist.contact.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                                            >
                                                <Globe size={18} className="text-primary" />
                                                {t('artist.website')}
                                                <ArrowUpRight size={14} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </FadeInView>
                        </div>
                    </div>
                </section>

                {/* Bio Section */}
                <section className="py-16 border-t border-border/30">
                    <div className="container mx-auto px-6">
                        <FadeInView>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                                {t('artist.bio')}
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                                {artist.bio}
                            </p>
                        </FadeInView>
                    </div>
                </section>

                {/* Portfolio Section */}
                <section className="py-16 bg-muted/20">
                    <div className="container mx-auto px-6">
                        <FadeInView>
                            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                                {t('common.portfolio')}
                            </h2>
                        </FadeInView>

                        <PortfolioGrid images={artist.portfolio} />
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <FadeInView>
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 border border-border/50 p-12 text-center">
                                <div className="relative z-10">
                                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                                        Ready to get inked by {artist.name}?
                                    </h3>
                                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                                        Book your consultation today and start planning your next masterpiece.
                                    </p>
                                    {artist.contact.bookingUrl ? (
                                        <a
                                            href={artist.contact.bookingUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-lg hover:scale-105 transition-transform"
                                        >
                                            <Calendar size={20} />
                                            {t('artist.booking')}
                                        </a>
                                    ) : artist.contact.instagram && (
                                        <a
                                            href={`https://instagram.com/${artist.contact.instagram.replace('@', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-lg hover:scale-105 transition-transform"
                                        >
                                            <Instagram size={20} />
                                            Contact via Instagram
                                        </a>
                                    )}
                                </div>
                            </div>
                        </FadeInView>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
