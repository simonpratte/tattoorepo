'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid3X3, LayoutList, X } from 'lucide-react';
import { ArtistCard, ArtistCardCompact } from '@/components/artist/ArtistCard';
import { FilterPanel, MobileFilterSheet } from '@/components/filters/FilterPanel';
import { FadeInView, PageTransition } from '@/components/animations';
import { mockArtists, filterArtists } from '@/lib/data';
import { useFilters } from '@/hooks/useFilters';

export default function BrowsePage() {
    const t = useTranslations();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const {
        selectedRegions,
        selectedStyles,
        setSelectedRegions,
        setSelectedStyles,
        clearFilters,
        hasActiveFilters,
    } = useFilters();

    const filteredArtists = useMemo(() => {
        return filterArtists(mockArtists, selectedRegions, selectedStyles);
    }, [selectedRegions, selectedStyles]);

    return (
        <PageTransition>
            <div className="min-h-screen pt-28 pb-16">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <FadeInView>
                        <div className="mb-12">
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                                {t('browse.title')}
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl">
                                {t('browse.subtitle')}
                            </p>
                        </div>
                    </FadeInView>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters - Desktop */}
                        <FadeInView direction="right" className="hidden lg:block w-80 flex-shrink-0">
                            <div className="sticky top-28 bg-card border border-border/50 rounded-2xl p-6">
                                <FilterPanel
                                    selectedRegions={selectedRegions}
                                    selectedStyles={selectedStyles}
                                    onRegionsChange={setSelectedRegions}
                                    onStylesChange={setSelectedStyles}
                                    onClear={clearFilters}
                                    resultCount={filteredArtists.length}
                                />
                            </div>
                        </FadeInView>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <FadeInView>
                                <div className="flex items-center justify-between mb-6 pb-6 border-b border-border/30">
                                    {/* Mobile Filter Button */}
                                    <button
                                        onClick={() => setIsMobileFilterOpen(true)}
                                        className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
                                    >
                                        <Filter size={18} className="text-primary" />
                                        <span>{t('browse.filters')}</span>
                                        {hasActiveFilters && (
                                            <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                                                {selectedRegions.length + selectedStyles.length}
                                            </span>
                                        )}
                                    </button>

                                    {/* Results Count - Desktop */}
                                    <p className="hidden lg:block text-muted-foreground">
                                        <span className="font-semibold text-foreground">{filteredArtists.length}</span>{' '}
                                        {t('common.artistsFound')}
                                    </p>

                                    {/* View Mode Toggle */}
                                    <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                        >
                                            <Grid3X3 size={18} />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                        >
                                            <LayoutList size={18} />
                                        </button>
                                    </div>
                                </div>
                            </FadeInView>

                            {/* Active Filters - Mobile */}
                            <AnimatePresence>
                                {hasActiveFilters && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="lg:hidden mb-6"
                                    >
                                        <div className="flex flex-wrap gap-2">
                                            {selectedRegions.map((region) => (
                                                <button
                                                    key={region}
                                                    onClick={() => setSelectedRegions(selectedRegions.filter(r => r !== region))}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/20 text-primary"
                                                >
                                                    {t(`regions.${region}`)}
                                                    <X size={12} />
                                                </button>
                                            ))}
                                            {selectedStyles.map((style) => (
                                                <button
                                                    key={style}
                                                    onClick={() => setSelectedStyles(selectedStyles.filter(s => s !== style))}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-accent/20 text-accent"
                                                >
                                                    {t(`styles.${style}`)}
                                                    <X size={12} />
                                                </button>
                                            ))}
                                            <button
                                                onClick={clearFilters}
                                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {t('common.clearFilters')}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Artists Grid/List */}
                            <AnimatePresence mode="wait">
                                {filteredArtists.length > 0 ? (
                                    <motion.div
                                        key={viewMode}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={
                                            viewMode === 'grid'
                                                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                                                : 'space-y-4'
                                        }
                                    >
                                        <AnimatePresence>
                                            {filteredArtists.map((artist, index) =>
                                                viewMode === 'grid' ? (
                                                    <ArtistCard key={artist.id} artist={artist} index={index} />
                                                ) : (
                                                    <ArtistCardCompact key={artist.id} artist={artist} index={index} />
                                                )
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-24"
                                    >
                                        <p className="text-xl text-muted-foreground mb-4">
                                            {t('common.noResults')}
                                        </p>
                                        <button
                                            onClick={clearFilters}
                                            className="px-6 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                        >
                                            {t('common.clearFilters')}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Sheet */}
                <MobileFilterSheet
                    isOpen={isMobileFilterOpen}
                    onClose={() => setIsMobileFilterOpen(false)}
                    selectedRegions={selectedRegions}
                    selectedStyles={selectedStyles}
                    onRegionsChange={setSelectedRegions}
                    onStylesChange={setSelectedStyles}
                    onClear={clearFilters}
                    resultCount={filteredArtists.length}
                />
            </div>
        </PageTransition>
    );
}
