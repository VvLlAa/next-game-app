import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useRef, useState } from 'react';
import { ShortScreenshotsType } from '@/type/type';
import styles from './CarouselComponent.module.scss';

interface ScreenshotsProps {
  gameScreenshots: ShortScreenshotsType[];
}

export const CarouselComponent = ({ gameScreenshots }: ScreenshotsProps) => {
  const [index, setIndex] = useState(0);
  const [currentImg, setCurrentImg] = useState<ShortScreenshotsType | null>(
    gameScreenshots[0] || null
  );
  const [count, setCount] = useState(1);
  const prevCountRef = useRef(1);

  const handleSelect = (selectedIndex: number) => {
    setCount(selectedIndex + 1);
    setIndex(selectedIndex);
    prevCountRef.current = count;
  };

  useEffect(() => {
    if (prevCountRef.current === 1 && count === gameScreenshots.length + 1) {
      setIndex(6);
      setCurrentImg(gameScreenshots[6]);
    } else if (count === gameScreenshots.length + 1) {
      setIndex(0);
      setCount(index + 1);
      setCurrentImg(gameScreenshots[0]);
    } else {
      setCurrentImg(gameScreenshots[index]);
    }
  }, [index, gameScreenshots, count]);

  const handleSelectMinImg = (idx: number) => {
    setIndex(idx);
    setCount(idx + 1);
    setCurrentImg(gameScreenshots[idx] || null);
  };
  return (
    <div className={styles['carousel']}>
      <Carousel
        wrap={true}
        interval={null}
        activeIndex={index}
        onSelect={handleSelect}
      >
        {gameScreenshots.map((image) => (
          <Carousel.Item key={image?.id}>
            <Image
              src={currentImg?.image ? currentImg?.image : ''}
              className={styles['carousel__main-image']}
              alt="Card"
              width={700}
              height={400}
              priority
            />
          </Carousel.Item>
        ))}
        <div className={styles['carousel__image-small-block']}>
          {gameScreenshots.map((image, idx) => (
            <div
              key={image.id}
              className={styles['carousel__image-small']}
              style={{
                margin: '0 5px',
                cursor: 'pointer',
              }}
              onClick={() => handleSelectMinImg(idx)}
            >
              <Image
                src={image.image}
                alt={`Screenshot ${idx}`}
                width={70}
                height={60}
                style={{
                  border: idx === index ? '2px solid #dc3838' : 'none',
                  objectFit: 'cover',
                  borderRadius: '5px',
                  opacity: idx === index ? 1 : 0.7,
                }}
              />
            </div>
          ))}
        </div>
      </Carousel>
    </div>
  );
};
