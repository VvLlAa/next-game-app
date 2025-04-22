import styles from './SortFilter.module.scss';
import likeGraySvg from '@/public/images/like-gray.svg';
import likeActive from '@/public/images/like-gray-active.svg';
import cupSvg from '@/public/images/cup-gray.svg';
import starsSvg from '@/public/images/stars-gray.svg';
import starsSvgActive from '@/public/images/stars-gray-active.svg';
import cupSvgActive from '@/public/images/cup-gray-active.svg';
import Image from 'next/image';

interface IProps {
  setSortGames: (text: string) => void;
  sortGames: string;
}

const btns = [
  { name: 'Популярные', image: likeGraySvg, imageActive: likeActive },
  { name: 'Высоко оцененные', image: cupSvg, imageActive: cupSvgActive },
  { name: 'Самые желанные', image: starsSvg, imageActive: starsSvgActive },
];

export const SortFilter = ({ setSortGames, sortGames }: IProps) => {
  const getTextSort = (text: string) => {
    setSortGames(text);
  };

  return (
    <div className={styles['sort-filter']}>
      <h2>Чарты🌟</h2>
      <div className={styles['sort-filter__content']}>
        {btns.map((item, index) => (
          <button
            key={`$(item.name) + ${index}`}
            className={`${styles['sort-filter__btn']} ${sortGames === item.name ? styles['active'] : ''}`}
            onClick={() => getTextSort(item.name)}
          >
            {sortGames === item.name ? (
              <Image
                src={item.imageActive}
                alt={item.name}
                width="20"
                height="20"
              />
            ) : (
              <Image src={item.image} alt={item.name} width="20" height="20" />
            )}

            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
