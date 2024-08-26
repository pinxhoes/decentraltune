'use client';

import { useEffect, useState } from 'react';

interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
}

export default function TopTracks() {
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        fetch('/api/top-tracks')
            .then(res => res.json())
            .then(setTracks);
    }, []);

    return (
        <div>
            <h2>Your Top Tracks</h2>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>
                        {track.name} by {track.artists.map(a => a.name).join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
}