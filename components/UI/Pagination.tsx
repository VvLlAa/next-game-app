import styles from './Pagination.module.scss';
import { useRouter } from 'next/router';

interface PaginationState {
  totalItems: number;
  pageSize: number;
  setLoading: (show: boolean) => void;
}

export const Pagination = ({
  totalItems = 1000,
  pageSize = 5,
  setLoading,
}: PaginationState) => {
  const router = useRouter();
  const currentPage = Number(router.query.page ?? 1);
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageNumbers = [];

  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    pageNumbers.push(i);
  }

  const goToPage = (page: number) => {
    setLoading(true);
    if (page >= 1 && page <= totalPages) {
      const min = router.query.min || '1';
      const max = router.query.max || '5';
      router.replace({
        pathname: 'games',
        query: {
          page: page,
          min: min,
          max: max,
        },
      });
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles['pagination__btn']}
      >
        Назад
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`${styles['pagination__btn']} ${page === currentPage ? styles['pagination__btn--active'] : ''}`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles['pagination__btn']}
      >
        Далее
      </button>
    </div>
  );
};
