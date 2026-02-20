"use client";

import { useEffect, useRef } from 'react';

export function useVideoAutoplay() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        // Prova a far partire il video
        await video.play();
      } catch {
        console.log('Autoplay non riuscito, il video partirà al primo click');
      }
    };

    // Prova autoplay quando il video è caricato
    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo);
    }

    // Gestisci il click per far partire il video se l'autoplay fallisce
    const handleClick = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('click', handleClick);

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('click', handleClick);
    };
  }, []);

  return videoRef;
}
