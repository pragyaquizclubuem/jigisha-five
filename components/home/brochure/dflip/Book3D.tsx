'use client';

import Image from 'next/image';
import { useRef } from 'react';
import PdfFlipbookTrigger from './PdfFlipbookTrigger';

interface Book3DProps {
    coverImage: string;
    pdfUrl: string;
    coverColor?: string;
    priority?: boolean; // for hero book (above the fold)
    width?: number;
    height?: number;
}

export default function Book3D({
    coverImage,
    pdfUrl,
    coverColor = '#FFEDE0',
    priority = false,
    width = 225,
    height = 350
}: Book3DProps) {
    const hoverAudioRef = useRef<HTMLAudioElement | null>(null);

    return (
        <PdfFlipbookTrigger pdfUrl={pdfUrl}>
            <div
                className="relative group cursor-pointer text-center"
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    margin: '2.5%'
                }}
                onMouseEnter={() => {
                    if (!hoverAudioRef.current) {
                        hoverAudioRef.current = new Audio('/dflip/sound/turn3.mp3');
                    }
                    hoverAudioRef.current.currentTime = 0;
                    hoverAudioRef.current.play().catch((err) => console.warn('Audio play failed:', err));
                }}
            >

                {/* Book Inside — the page stack beneath the cover */}
                <div
                    className="relative rounded-[3px] bg-white"
                    style={{
                        width: 'calc(100% - 2px)',
                        height: '96%',
                        top: '2%',
                        border: '1px solid grey',
                        boxShadow: `
                            10px 40px 40px -10px rgba(0,0,0,0.19),
                            inset -2px 0 0 grey,
                            inset -3px 0 0 #dbdbdb,
                            inset -4px 0 0 white,
                            inset -5px 0 0 #dbdbdb,
                            inset -6px 0 0 white,
                            inset -7px 0 0 #dbdbdb,
                            inset -8px 0 0 white,
                            inset -9px 0 0 #dbdbdb
                        `,
                    }}
                />

                {/* Book Cover — rotates open on hover */}
                <div
                    className="absolute inset-0 z-10 rounded-[3px] transition-all duration-500 ease-in-out group-hover:transform-[perspective(2000px)_rotateY(-30deg)] transform-3d"
                    style={{
                        transformOrigin: '0 50%',
                        backgroundImage: 'none',
                        backgroundColor: coverColor,
                        boxShadow: `
                            inset 4px 1px 3px rgba(255,255,255,0.38),
                            inset 0 -1px 2px rgba(0,0,0,0.5)
                        `,
                    }}
                >
                    {/* Cover Image */}
                    <Image
                        src={coverImage}
                        alt="Book Cover"
                        fill
                        className="object-cover rounded-[3px]"
                        loading={priority ? 'eager' : 'lazy'}
                        priority={priority}
                        fetchPriority={priority ? 'high' : 'auto'}
                        quality={75}
                        sizes={`${width}px`}
                    />

                    {/* Spine / Edge Effect — left-side gradient */}
                    <div
                        className="absolute top-0 left-0 h-full transition-all duration-500 ease-in-out w-[20px] group-hover:w-[40px]"
                        style={{
                            marginLeft: '10px',
                            borderLeft: '2px solid rgba(0,0,0,0.063)',
                            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
                        }}
                    />

                    {/* Light Sweep — right-side gradient */}
                    <div
                        className="absolute top-0 right-0 h-full w-[90%] rounded-[3px] opacity-10 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:w-[70%]"
                        style={{
                            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)',
                        }}
                    />


                </div>

                {/* Hover shadow for the cover */}
                <style jsx>{`
                    .group:hover > div:nth-child(2) {
                        box-shadow:
                            inset 4px 1px 3px rgba(255,255,255,0.38),
                            inset 0 -1px 2px rgba(0,0,0,0.5),
                            10px 0px 10px -5px rgba(0,0,0,0.19) !important;
                    }
                `}</style>

            </div>
        </PdfFlipbookTrigger>
    );
}
