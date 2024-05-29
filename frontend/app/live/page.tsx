"use client"

import { useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';

export default function Live() {
    const playerRef = useRef(HTMLVideoElement);

    return (
        <div>
            <ReactHlsPlayer
            playerRef={playerRef}
            src="https://cmgw-online-fk.easy4ipcloud.com:8890/LCO/9B0A1B3PBV11415/0/1/20240519T001403/48b0e978d8fdc9acff4b5118a82151af.m3u8?proto=https"
            autoPlay
            playsInline
            muted
            width="100%"
            height="auto"
            />
        </div>
    )
}