import styles from './FilterBody.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Slider } from '@mui/material';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { fetchGamesStart } from '@/store/gamesSlice';

interface FilterProps {
  setShow: (show: boolean) => void;
}

export const FilterBody = ({ setShow }: FilterProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { min, max } = router.query;
  const [rating, setRating] = useState({
    min: Number(min),
    max: Number(max),
  });

  const handleSliderChange = (
    event: Event,
    newValue: number[],
    activeThumb: number
  ) => {
    const [min, max] = newValue;
    const minDistance = 0.6;
    const round = (val: number) => Math.round(val * 10) / 10;

    if (activeThumb === 0) {
      const clampedMin = Math.min(min, max - minDistance);
      setRating({
        min: round(clampedMin),
        max: round(max),
      });
    } else {
      const clampedMax = Math.max(max, min + minDistance);
      setRating({
        min: round(min),
        max: round(clampedMax),
      });
    }
  };

  const valuetext = (value: number) => {
    return `${value}`;
  };

  const updateGamesList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          min: rating.min,
          max: rating.max,
        },
      },
      undefined,
      { shallow: false }
    );
    dispatch(fetchGamesStart());
    setShow(false);
  };

  return (
    <form onSubmit={updateGamesList} className={styles['filter-body']}>
      <div className={styles['filter-body__rating']}>
        <div>Рейтинг:</div>
        <Slider
          value={[rating.min, rating.max]}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
          min={1}
          max={5}
          step={0.1}
        />
        {rating.min} - {rating.max}
      </div>
      <Button type="submit">Применить</Button>
    </form>
  );
};
