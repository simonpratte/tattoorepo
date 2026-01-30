import { Artist } from './types';

// Placeholder image URLs using Unsplash for tattoo/portrait photos
const avatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
];

const tattooImages = [
    'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1590246814883-57c511e9b42d?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1542856204-00101eb6def4?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&h=1000&fit=crop',
];

// Helper to get portfolio images for an artist
const getPortfolio = (artistIndex: number) => {
    const baseIdx = (artistIndex * 4) % tattooImages.length;
    return [
        { id: `p${artistIndex}-1`, url: tattooImages[baseIdx % tattooImages.length], alt: 'Tattoo artwork 1', width: 800, height: 1000 },
        { id: `p${artistIndex}-2`, url: tattooImages[(baseIdx + 1) % tattooImages.length], alt: 'Tattoo artwork 2', width: 800, height: 1200 },
        { id: `p${artistIndex}-3`, url: tattooImages[(baseIdx + 2) % tattooImages.length], alt: 'Tattoo artwork 3', width: 800, height: 800 },
        { id: `p${artistIndex}-4`, url: tattooImages[(baseIdx + 3) % tattooImages.length], alt: 'Tattoo artwork 4', width: 800, height: 1000 },
    ];
};

// Mock artist data for development
export const mockArtists: Artist[] = [
    {
        id: '1',
        name: 'Marcus Chen',
        studioName: 'Neon Tiger Tattoo',
        bio: 'Specializing in bold neo-traditional work with a modern twist. 15 years of experience bringing vibrant colors and dynamic compositions to life.',
        location: {
            city: 'Los Angeles',
            stateProvince: 'California',
            country: 'USA',
            region: 'west-coast',
        },
        styles: ['neo-traditional', 'japanese', 'blackwork'],
        portfolio: getPortfolio(1),
        contact: {
            instagram: '@neontiger_ink',
            website: 'https://neontigertattoo.com',
            bookingUrl: 'https://neontigertattoo.com/book',
        },
        isFeatured: true,
        avatarUrl: avatars[0],
    },
    {
        id: '2',
        name: 'Sophie Dubois',
        studioName: 'Encre Montréal',
        bio: 'Artiste tatoueur spécialisée dans le fine line et le style minimaliste. Chaque pièce est une œuvre d\'art unique et personnelle.',
        location: {
            city: 'Montréal',
            stateProvince: 'QC',
            country: 'Canada',
            region: 'quebec',
        },
        styles: ['fine-line', 'minimalist', 'geometric'],
        portfolio: getPortfolio(2),
        contact: {
            instagram: '@encre_mtl',
            bookingUrl: 'https://encremontreal.com/reservation',
        },
        isFeatured: true,
        avatarUrl: avatars[1],
    },
    {
        id: '3',
        name: 'Jake Morrison',
        studioName: 'Electric Dreams Ink',
        bio: 'Old school meets new school in my work. Traditional American tattooing with a bold, modern edge.',
        location: {
            city: 'Brooklyn',
            stateProvince: 'New York',
            country: 'USA',
            region: 'east-coast',
        },
        styles: ['traditional', 'new-school', 'chicano'],
        portfolio: getPortfolio(3),
        contact: {
            instagram: '@electricdreams_bk',
            website: 'https://electricdreamsink.com',
        },
        isFeatured: false,
        avatarUrl: avatars[2],
    },
    {
        id: '4',
        name: 'Yuki Tanaka',
        studioName: 'Sakura Tattoo Studio',
        bio: 'Master of Japanese traditional (Irezumi) and contemporary Japanese fusion. Each piece tells a story rooted in centuries of tradition.',
        location: {
            city: 'Vancouver',
            stateProvince: 'BC',
            country: 'Canada',
            region: 'british-columbia',
        },
        styles: ['japanese', 'traditional', 'blackwork'],
        portfolio: getPortfolio(4),
        contact: {
            instagram: '@sakura_tattoo_van',
            bookingUrl: 'https://sakuratattoo.ca/book',
        },
        isFeatured: true,
        avatarUrl: avatars[3],
    },
    {
        id: '5',
        name: 'Elena Rodriguez',
        studioName: 'Agua y Tinta',
        bio: 'Watercolor dreams brought to skin. Creating soft, ethereal pieces that flow like paint on canvas.',
        location: {
            city: 'Austin',
            stateProvince: 'Texas',
            country: 'USA',
            region: 'south',
        },
        styles: ['watercolor', 'fine-line', 'minimalist'],
        portfolio: getPortfolio(5),
        contact: {
            instagram: '@aguaytinta_atx',
            website: 'https://aguaytinta.com',
        },
        isFeatured: false,
        avatarUrl: avatars[4],
    },
    {
        id: '6',
        name: 'Viktor Kozlov',
        studioName: 'Dark Matter Tattoo',
        bio: 'Pushing the boundaries of blackwork and geometric tattooing. Clean lines, perfect symmetry, and bold statements.',
        location: {
            city: 'Toronto',
            stateProvince: 'ON',
            country: 'Canada',
            region: 'ontario',
        },
        styles: ['blackwork', 'geometric', 'dotwork'],
        portfolio: getPortfolio(6),
        contact: {
            instagram: '@darkmatter_ink',
            bookingUrl: 'https://darkmatterink.com/appointments',
        },
        isFeatured: true,
        avatarUrl: avatars[5],
    },
    {
        id: '7',
        name: 'Aria Kim',
        studioName: 'Phantom Ink Studios',
        bio: 'Realism is my passion. From portraits to nature, I bring life to skin with photorealistic detail.',
        location: {
            city: 'Seattle',
            stateProvince: 'Washington',
            country: 'USA',
            region: 'west-coast',
        },
        styles: ['realism', 'portrait', 'blackwork'],
        portfolio: getPortfolio(7),
        contact: {
            instagram: '@phantom_ink_sea',
            website: 'https://phantominkstudios.com',
        },
        isFeatured: false,
        avatarUrl: avatars[6],
    },
    {
        id: '8',
        name: 'François Beaumont',
        studioName: 'Atelier du Nord',
        bio: 'L\'art du trash polka rencontre l\'expressionnisme. Des pièces audacieuses qui racontent des histoires profondes.',
        location: {
            city: 'Québec City',
            stateProvince: 'QC',
            country: 'Canada',
            region: 'quebec',
        },
        styles: ['trash-polka', 'realism', 'blackwork'],
        portfolio: getPortfolio(8),
        contact: {
            instagram: '@atelierdunord_qc',
            bookingUrl: 'https://atelierdunord.ca/rendez-vous',
        },
        isFeatured: false,
        avatarUrl: avatars[7],
    },
    {
        id: '9',
        name: 'Olivia Stone',
        studioName: 'Wanderlust Tattoo',
        bio: 'Travel-inspired dotwork and mandala designs. Every piece is a journey captured in ink.',
        location: {
            city: 'Denver',
            stateProvince: 'Colorado',
            country: 'USA',
            region: 'midwest',
        },
        styles: ['dotwork', 'geometric', 'tribal'],
        portfolio: getPortfolio(9),
        contact: {
            instagram: '@wanderlust_ink_co',
            website: 'https://wanderlusttattoo.co',
        },
        isFeatured: true,
        avatarUrl: avatars[8],
    },
    {
        id: '10',
        name: 'Liam O\'Brien',
        studioName: 'Celtic Knot Tattoo',
        bio: 'Keeping traditional Irish and Celtic tattooing alive. Knotwork, mythology, and heritage in every piece.',
        location: {
            city: 'Halifax',
            stateProvince: 'NS',
            country: 'Canada',
            region: 'atlantic',
        },
        styles: ['tribal', 'blackwork', 'traditional'],
        portfolio: getPortfolio(10),
        contact: {
            instagram: '@celticknot_hfx',
            bookingUrl: 'https://celticknotattoo.ca/book',
        },
        isFeatured: false,
        avatarUrl: avatars[9],
    },
];

// Helper to get random featured artists
export function getRandomFeaturedArtists(count: number = 3): Artist[] {
    const featured = mockArtists.filter(a => a.isFeatured);
    const shuffled = [...featured].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Helper to get a single random artist
export function getRandomArtist(): Artist {
    return mockArtists[Math.floor(Math.random() * mockArtists.length)];
}

// Helper to filter artists
export function filterArtists(
    artists: Artist[],
    regions: string[],
    styles: string[]
): Artist[] {
    return artists.filter(artist => {
        const matchesRegion = regions.length === 0 || regions.includes(artist.location.region);
        const matchesStyle = styles.length === 0 || artist.styles.some(s => styles.includes(s));
        return matchesRegion && matchesStyle;
    });
}

// Helper to get artist by ID
export function getArtistById(id: string): Artist | undefined {
    return mockArtists.find(a => a.id === id);
}
