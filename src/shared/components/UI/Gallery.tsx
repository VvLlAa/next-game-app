'use client'
import * as React from "react";
import styles from './Gallery.module.scss'
import {useEffect, useRef, useState} from "react";
import Image from 'next/image';


interface Props {
    screenshots:
{id: number; path_full: string, path_thumbnail: string}[]

}

export const Gallery = ({screenshots}: Props) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [indexFullScreen, setIndexFullScreen] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);


    const goToPrevious = () => {
        setIndexFullScreen((prev) => prev === 0 ? screenshots.length - 1 : prev - 1);
    };

    const goToNext = () => {
        setIndexFullScreen((prev) =>  (prev === screenshots.length - 1 ? 0 : prev + 1));
    };

    const handleLargeImageClick = () => {
        setIsFullScreen(true);
    };

    const closeFullScreen = () => {
        setIsFullScreen(false);
    };



    const scrollMiniBar = (scr : string) => {
        if(scr === 'Right') {
            setSelectedImage((prev) => prev === screenshots.length - 1 ? 0 : prev + 1);
        } else if(scr === 'Left') {
            setSelectedImage((prev) =>  prev === 0 ? screenshots.length - 1 : prev - 1);
        }
    };

    useEffect(() => {
        containerRef.current?.scrollTo({ left: 116 * selectedImage, behavior: 'smooth' });
    }, [selectedImage]);

    return (
        <div className={styles['gallery']}>
            <div className={styles['gallery__large-image-container']}>
                <Image
                    className={styles['large-image']}
                    src={screenshots?.[selectedImage]?.path_thumbnail}
                    width={600}
                    height={338}
                    alt="Large View"
                    onClick={handleLargeImageClick}
                />
            </div>

            <div className={styles['gallery__wrapper']}>
                <button
                    className={styles['gallery__scroll-btn'] + ' ' + styles['left']}
                    onClick={() => scrollMiniBar('Left')}
                >
                    ◀
                </button>

                <div className={styles['gallery__thumbnails-container']} ref={containerRef}>
                    {screenshots.map((image, index) => (
                        <Image
                            key={index}
                            width={116}
                            height={65}
                            className={styles['gallery__thumbnail']}
                            style={{
                                border: index === selectedImage ? '2px solid var(--text-color-purple)' : '2px',
                            }}
                            src={image.path_thumbnail}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => setSelectedImage(index)}
                        />
                    ))}
                </div>

                <button
                    className={styles['gallery__scroll-btn'] + ' ' + styles['right']}
                    onClick={() => scrollMiniBar('Right')}
                >
                    ▶
                </button>
            </div>


            {isFullScreen && (
                <>
                    <div className={styles['gallery__fullscreen-overlay']}>
                        <div className={styles['gallery__fullscreen-content']}>
                            <button className={styles['gallery__fullscreen-close']} onClick={closeFullScreen}>X</button>
                            <Image
                                width={1920}
                                height={1080}
                                className={styles['gallery__fullscreen-image']}
                                src={screenshots?.[indexFullScreen]?.path_thumbnail}
                                alt="Full Screen"
                            />
                        </div>
                        <div className={styles['gallery__fullscreen-controls']}>
                            <button className={styles['gallery__fullscreen-prev']} onClick={goToPrevious}>Назад</button>
                            <button className={styles['gallery__fullscreen-next']} onClick={goToNext}>Вперед</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
};