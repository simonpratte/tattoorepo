'use client';

import { useState, useCallback } from 'react';
import { ArtStyle, Region } from '@/lib/types';

export interface UseFiltersReturn {
    selectedRegions: Region[];
    selectedStyles: ArtStyle[];
    setSelectedRegions: (regions: Region[]) => void;
    setSelectedStyles: (styles: ArtStyle[]) => void;
    toggleRegion: (region: Region) => void;
    toggleStyle: (style: ArtStyle) => void;
    clearFilters: () => void;
    hasActiveFilters: boolean;
}

export function useFilters(): UseFiltersReturn {
    const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
    const [selectedStyles, setSelectedStyles] = useState<ArtStyle[]>([]);

    const toggleRegion = useCallback((region: Region) => {
        setSelectedRegions(prev =>
            prev.includes(region)
                ? prev.filter(r => r !== region)
                : [...prev, region]
        );
    }, []);

    const toggleStyle = useCallback((style: ArtStyle) => {
        setSelectedStyles(prev =>
            prev.includes(style)
                ? prev.filter(s => s !== style)
                : [...prev, style]
        );
    }, []);

    const clearFilters = useCallback(() => {
        setSelectedRegions([]);
        setSelectedStyles([]);
    }, []);

    const hasActiveFilters = selectedRegions.length > 0 || selectedStyles.length > 0;

    return {
        selectedRegions,
        selectedStyles,
        setSelectedRegions,
        setSelectedStyles,
        toggleRegion,
        toggleStyle,
        clearFilters,
        hasActiveFilters,
    };
}
