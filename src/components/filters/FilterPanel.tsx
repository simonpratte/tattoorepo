'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronDown, Filter, SlidersHorizontal } from 'lucide-react';
import { ArtStyle, Region, ALL_STYLES, ALL_REGIONS } from '@/lib/types';

interface FilterPanelProps {
    selectedRegions: Region[];
    selectedStyles: ArtStyle[];
    onRegionsChange: (regions: Region[]) => void;
    onStylesChange: (styles: ArtStyle[]) => void;
    onClear: () => void;
    resultCount: number;
}

export function FilterPanel({
    selectedRegions,
    selectedStyles,
    onRegionsChange,
    onStylesChange,
    onClear,
    resultCount,
}: FilterPanelProps) {
    const t = useTranslations();
    const [expandedSection, setExpandedSection] = useState<'region' | 'style' | null>('style');

    const toggleRegion = useCallback((region: Region) => {
        if (selectedRegions.includes(region)) {
            onRegionsChange(selectedRegions.filter(r => r !== region));
        } else {
            onRegionsChange([...selectedRegions, region]);
        }
    }, [selectedRegions, onRegionsChange]);

    const toggleStyle = useCallback((style: ArtStyle) => {
        if (selectedStyles.includes(style)) {
            onStylesChange(selectedStyles.filter(s => s !== style));
        } else {
            onStylesChange([...selectedStyles, style]);
        }
    }, [selectedStyles, onStylesChange]);

    const hasActiveFilters = selectedRegions.length > 0 || selectedStyles.length > 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={20} className="text-primary" />
                    <h3 className="font-semibold text-foreground">{t('browse.filters')}</h3>
                </div>
                {hasActiveFilters && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={onClear}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                        {t('common.clearFilters')}
                    </motion.button>
                )}
            </div>

            {/* Active Filters */}
            <AnimatePresence>
                {hasActiveFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                    >
                        <p className="text-xs text-muted-foreground">{t('common.activeFilters')}</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedRegions.map((region) => (
                                <motion.button
                                    key={region}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => toggleRegion(region)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                                >
                                    {t(`regions.${region}`)}
                                    <X size={12} />
                                </motion.button>
                            ))}
                            {selectedStyles.map((style) => (
                                <motion.button
                                    key={style}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => toggleStyle(style)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
                                >
                                    {t(`styles.${style}`)}
                                    <X size={12} />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results count */}
            <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{resultCount}</span> {t('common.artistsFound')}
            </p>

            {/* Region Filter */}
            <FilterSection
                title={t('common.filterByRegion')}
                isExpanded={expandedSection === 'region'}
                onToggle={() => setExpandedSection(expandedSection === 'region' ? null : 'region')}
            >
                <div className="space-y-1">
                    {ALL_REGIONS.map((region) => (
                        <FilterCheckbox
                            key={region}
                            label={t(`regions.${region}`)}
                            checked={selectedRegions.includes(region)}
                            onChange={() => toggleRegion(region)}
                        />
                    ))}
                </div>
            </FilterSection>

            {/* Style Filter */}
            <FilterSection
                title={t('common.filterByStyle')}
                isExpanded={expandedSection === 'style'}
                onToggle={() => setExpandedSection(expandedSection === 'style' ? null : 'style')}
            >
                <div className="space-y-1">
                    {ALL_STYLES.map((style) => (
                        <FilterCheckbox
                            key={style}
                            label={t(`styles.${style}`)}
                            checked={selectedStyles.includes(style)}
                            onChange={() => toggleStyle(style)}
                        />
                    ))}
                </div>
            </FilterSection>
        </div>
    );
}

interface FilterSectionProps {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
    return (
        <div className="border border-border/50 rounded-xl overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
                <span className="text-sm font-medium text-foreground">{title}</span>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={16} className="text-muted-foreground" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 max-h-64 overflow-y-auto">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface FilterCheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
}

function FilterCheckbox({ label, checked, onChange }: FilterCheckboxProps) {
    return (
        <button
            onClick={onChange}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${checked ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}
        >
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${checked ? 'bg-primary border-primary' : 'border-muted-foreground'
                }`}>
                {checked && <Check size={10} className="text-primary-foreground" />}
            </div>
            <span className="text-sm">{label}</span>
        </button>
    );
}

// Mobile Filter Sheet
interface MobileFilterSheetProps extends FilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileFilterSheet({
    isOpen,
    onClose,
    ...filterProps
}: MobileFilterSheetProps) {
    const t = useTranslations();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background border-r border-border z-50 overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <Filter size={20} className="text-primary" />
                                    <h2 className="font-display text-xl">{t('browse.filters')}</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <FilterPanel {...filterProps} />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
