import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req }) as Session & { accessToken?: string };
    if (!session || !session.accessToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    spotifyApi.setAccessToken(session.accessToken);

    try {
        const data = await spotifyApi.getMyTopTracks();
        res.status(200).json(data.body.items);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching top tracks' });
    }
}