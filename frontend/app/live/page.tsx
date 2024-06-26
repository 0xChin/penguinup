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
                src="https://cmgw-online-fk.easy4ipcloud.com:8890/LCO/9B0A1B3PBV11415/0/1/20240519T001403/48b0e978d8fdc9acff4b5118a82151af.m3u8?proto=https"
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
