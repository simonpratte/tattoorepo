'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { PortfolioImage } from '@/lib/types';

interface LightboxProps {
    images: PortfolioImage[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
}

export function Lightbox({ images, initialIndex = 0, isOpen, onClose }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'Escape') onClose();
    }, [goNext, goPrev, onClose]);

    if (!isOpen || images.length === 0) return null;

    const currentImage = images[currentIndex];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors"
                    >
                        <X size={24} className="text-foreground" />
                    </button>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors"
                            >
                                <ChevronLeft size={28} className="text-foreground" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); goNext(); }}
                                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors"
                            >
                                <ChevronRight size={28} className="text-foreground" />
                            </button>
                        </>
                    )}

                    {/* Image */}
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-[90vw] max-h-[85vh]"
                    >
                        <Image
                            src={currentImage.url}
                            alt={currentImage.alt}
                            width={currentImage.width}
                            height={currentImage.height}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg"
                            priority
                        />
                    </motion.div>

                    {/* Image Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl bg-muted/50 backdrop-blur-sm">
                            {images.map((img, idx) => (
                                <button
                                    key={img.id}
                                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                    className={`relative w-12 h-12 rounded-lg overflow-hidden transition-all ${idx === currentIndex ? 'ring-2 ring-primary' : 'opacity-50 hover:opacity-100'
                                        }`}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.alt}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Portfolio grid with masonry layout
interface PortfolioGridProps {
    images: PortfolioImage[];
}

export function PortfolioGrid({ images }: PortfolioGridProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {images.map((image, index) => (
                    <motion.div
                        key={image.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="break-inside-avoid group cursor-pointer"
                        onClick={() => openLightbox(index)}
                    >
                        <div className="relative overflow-hidden rounded-xl border border-border/50 hover:border-primary/50 transition-all">
                            <Image
                                src={image.url}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="p-3 rounded-full bg-primary/20 backdrop-blur-sm">
                                    <ZoomIn size={24} className="text-primary" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Lightbox
                images={images}
                initialIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </>
    );
}
