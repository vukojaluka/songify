export const songs = [
    {
        id: 1,
        title: 'Skini mi se s vrata',
        artist: 'Dražen Zečić',
        duration: '3:45',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 2,
        title: 'Zmija me za srce ugrizla',
        artist: 'Dražen Zečić',
        duration: '4:20',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 3,
        title: 'Vjeruj u ljubav',
        artist: 'Oliver Dragojević',
        duration: '4:15',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 4,
        title: 'Cesarica',
        artist: 'Oliver Dragojević',
        duration: '4:10',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 5,
        title: 'Magazin',
        artist: 'Minus i plus',
        duration: '3:55',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 6,
        title: 'Dani i godine',
        artist: 'Parni Valjak',
        duration: '4:30',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 7,
        title: 'Jesen u meni',
        artist: 'Parni Valjak',
        duration: '4:25',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 8,
        title: 'Nocturno',
        artist: 'Oliver Dragojević',
        duration: '4:05',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 9,
        title: 'Skalinada',
        artist: 'Oliver Dragojević',
        duration: '3:50',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 10,
        title: 'Nije u šoldima sve',
        artist: 'Oliver Dragojević',
        duration: '4:00',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 11,
        title: 'Kad mi dođeš ti',
        artist: 'Dražen Zečić',
        duration: '3:40',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 12,
        title: 'Ima jedan svijet',
        artist: 'Parni Valjak',
        duration: '4:15',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 13,
        title: 'Sve još miriše na nju',
        artist: 'Parni Valjak',
        duration: '4:35',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 14,
        title: 'Moj galebe',
        artist: 'Oliver Dragojević',
        duration: '3:55',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 15,
        title: 'Oprosti mi pape',
        artist: 'Oliver Dragojević',
        duration: '4:20',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 16,
        title: 'Ljubav je samo riječ',
        artist: 'Dražen Zečić',
        duration: '3:50',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 17,
        title: 'Prolazi sve',
        artist: 'Dražen Zečić',
        duration: '4:05',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 18,
        title: 'Lutka za bal',
        artist: 'Parni Valjak',
        duration: '4:40',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 19,
        title: 'Zastave',
        artist: 'Parni Valjak',
        duration: '4:25',
        isFavorite: false,
        addedAt: null,
    },
    {
        id: 20,
        title: 'Picaferaj',
        artist: 'Oliver Dragojević',
        duration: '3:45',
        isFavorite: false,
        addedAt: null,
    },
] as {
    id: number
    title: string
    artist: string
    duration: string
    isFavorite: boolean
    addedAt: null | string
}[]

export type Song = (typeof songs)[number]

export const featuredPlaylists = [
    {
        id: 1,
        title: 'Croatian Classics',
        thumbnail:
            'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&w=480&q=90',
        songs: [songs[13], songs[14], songs[15], songs[16]].filter(Boolean),
    },
    {
        id: 2,
        title: 'Best of Oliver Dragojević',
        thumbnail:
            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&w=480&q=90',
        songs: [songs[14], songs[15], songs[20]].filter(Boolean),
    },
    {
        id: 3,
        title: 'Parni Valjak Collection',
        thumbnail:
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&w=480&q=90',
        songs: [songs[13], songs[18], songs[19]].filter(Boolean),
    },
    {
        id: 4,
        title: 'Dražen Zečić Hits',
        thumbnail:
            'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&w=480&q=90',
        songs: [songs[16], songs[17]].filter(Boolean),
    },
    {
        id: 5,
        title: 'Summer Vibes',
        thumbnail:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=480&q=90',
        songs: [songs[14], songs[20], songs[15]].filter(Boolean),
    },
    {
        id: 6,
        title: 'Romantic Ballads',
        thumbnail:
            'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&w=480&q=90',
        songs: [songs[13], songs[16], songs[17]].filter(Boolean),
    },
    {
        id: 7,
        title: 'Rock Classics',
        thumbnail:
            'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&w=480&q=90',
        songs: [songs[18], songs[19], songs[13]].filter(Boolean),
    },
    {
        id: 8,
        title: 'Dalmatian Nights',
        thumbnail:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=480&q=90',
        songs: [songs[14], songs[15], songs[20]].filter(Boolean),
    },
    {
        id: 9,
        title: 'Evening Melodies',
        thumbnail:
            'https://images.unsplash.com/photo-1495312040802-a929cd14a6ab?auto=format&w=480&q=90',
        songs: [songs[16], songs[17], songs[13]].filter(Boolean),
    },
    {
        id: 10,
        title: 'Croatian Legends',
        thumbnail:
            'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&w=480&q=90',
        songs: [songs[14], songs[18], songs[19]].filter(Boolean),
    },
    {
        id: 11,
        title: 'Seaside Stories',
        thumbnail:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=480&q=90',
        songs: [songs[20], songs[15], songs[14]].filter(Boolean),
    },
    {
        id: 12,
        title: 'Nostalgic Mix',
        thumbnail:
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&w=480&q=90',
        songs: [songs[13], songs[16], songs[19]].filter(Boolean),
    },
    {
        id: 13,
        title: 'Sunset Collection',
        thumbnail:
            'https://images.unsplash.com/photo-1494548162494-384bba4ab999?auto=format&w=480&q=90',
        songs: [songs[15], songs[17], songs[20]].filter(Boolean),
    },
    {
        id: 14,
        title: 'Croatian Rock',
        thumbnail:
            'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&w=480&q=90',
        songs: [songs[18], songs[19], songs[13]].filter(Boolean),
    },
    {
        id: 15,
        title: 'Mediterranean Moods',
        thumbnail:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=480&q=90',
        songs: [songs[14], songs[15], songs[20]].filter(Boolean),
    },
]

export type FeaturedPlaylist = (typeof featuredPlaylists)[number]
