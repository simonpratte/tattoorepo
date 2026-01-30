import { HeroSection } from '@/components/home/HeroSection';
import { ArtistCard } from '@/components/artist/ArtistCard';
import { getRandomFeaturedArtists, mockArtists } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const t = await getTranslations();
  const featuredArtists = getRandomFeaturedArtists(5);
  const recentArtists = mockArtists.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection featuredArtists={featuredArtists} />

      {/* Featured Artists Section */}
      <section className="py-24 bg-background relative">
        {/* Gradient divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="container mx-auto px-6">
          <FadeInView>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {t('common.featured')} Artists
                </h2>
                <p className="text-muted-foreground">
                  {t('hero.subtitle')}
                </p>
              </div>
              <Link
                href="/browse"
                className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {t('nav.browse')}
                </span>
                <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeInView>

          {/* Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArtists.map((artist, index) => (
              <FadeInView key={artist.id} delay={index * 0.1}>
                <ArtistCard artist={artist} index={index} />
              </FadeInView>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-12 text-center md:hidden">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold"
            >
              {t('hero.cta')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Styles Showcase Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <FadeInView>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Explore {t('common.styles')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From traditional to contemporary, find artists who specialize in your preferred style.
              </p>
            </div>
          </FadeInView>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { style: 'traditional', color: 'from-red-500 to-orange-500' },
              { style: 'realism', color: 'from-slate-500 to-zinc-700' },
              { style: 'neo-traditional', color: 'from-purple-500 to-pink-500' },
              { style: 'japanese', color: 'from-red-600 to-rose-400' },
              { style: 'blackwork', color: 'from-zinc-800 to-black' },
              { style: 'watercolor', color: 'from-cyan-400 to-blue-500' },
            ].map((item, idx) => (
              <FadeInView key={item.style} delay={idx * 0.05}>
                <Link href={`/browse?style=${item.style}`}>
                  <div className={`relative aspect-square rounded-2xl overflow-hidden group cursor-pointer`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg group-hover:scale-110 transition-transform">
                        {t(`styles.${item.style}`)}
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-50" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeInView>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Ready to Find Your <span className="text-primary text-glow-purple">Next Artist?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Browse our curated directory of talented tattoo artists and book your next session.
              </p>
              <Link href="/browse">
                <button className="px-10 py-5 rounded-xl bg-gradient-to-r from-primary via-accent to-[var(--neon-cyan)] text-primary-foreground font-bold text-xl animate-pulse-glow hover:animate-none transition-all hover:scale-105">
                  {t('hero.cta')}
                </button>
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
