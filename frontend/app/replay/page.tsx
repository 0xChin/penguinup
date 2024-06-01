"use client"

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const ReactHlsPlayer = dynamic(() => import('react-hls-player'), { ssr: false });

export default function Live() {
    const playerRef = useRef<HTMLVideoElement | null>(null);
    const searchParams = useSearchParams()
    searchParams.get('cid')

    return (
        <div className='max-w-screen max-h-screen'>
            <video
                ref={playerRef}
                src={`https://ipfs.io/ipfs/${searchParams.get('cid')}`}
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
