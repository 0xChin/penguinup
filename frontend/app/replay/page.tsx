"use client"

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactHlsPlayer = dynamic(() => import('react-hls-player'), { ssr: false });

export default function Live() {
    const playerRef = useRef<HTMLVideoElement | null>(null);

    return (
        <div className='max-w-screen max-h-screen'>
            <ReactHlsPlayer
                playerRef={playerRef}
                src="https://res.cloudinary.com/dg7wsrlpz/video/upload/sp_auto/v1717110950/2.m3u8"
                autoPlay
                playsInline
                controls
                width="100%"
                muted
                style={{ maxHeight: '100vh' }}
            />
        </div>
    );
}
