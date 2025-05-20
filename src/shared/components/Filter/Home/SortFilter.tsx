'use client';

import styles from './SortFilter.module.scss';
import likeGraySvg from '@/src/public/images/like-gray.svg';
import likeActive from '@/src/public/images/like-gray-active.svg';
import cupSvg from '@/src/public/images/cup-gray.svg';

import cupSvgActive from '@/src/public/images/cup-gray-active.svg';
import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/src/store';
import { setSortOption } from '@/src/store/gamesSlice';
import {SORT_OPTIONS} from "@/src/shared/constants/sort";

const btns = [
  { name: SORT_OPTIONS.POPULAR, image: likeGraySvg, imageActive: likeActive },
  { name: SORT_OPTIONS.NEW, image: cupSvg, imageActive: cupSvgActive },
];

export const SortFilter = () => {
  const dispatch = useDispatch();
  const sortOption = useSelector((state: AppState) => state.games.sortOption);

  const handleSortChange = (newSort: string) => {
    dispatch(setSortOption(newSort));
  };

  return (
    <div className={styles['sort-filter']}>
      <h2>Чарты🌟</h2>
      <div className={styles['sort-filter__content']}>
        {btns.map((item, index) => (
          <button
            key={`${item.name} + ${index}`}
            className={`${styles['sort-filter__btn']} ${sortOption === item.name ? styles['active'] : ''}`}
            onClick={() => handleSortChange(item.name)}
          >
            <Image
              src={sortOption === item.name ? item.imageActive : item.image}
              alt={item.name}
              width="20"
              height="20"
            />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
