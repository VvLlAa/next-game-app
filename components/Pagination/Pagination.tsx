import styles from './Pagination.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface PaginationState {
  totalItems: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
}

export const Pagination = ({
  totalItems = 200,
  pageSize = 5,
  handlePageChange,
}: PaginationState) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(
    Number(router.query.page) | 1
  );
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
    if (page >= 1 && page <= totalPages) {
      handlePageChange(page);
      setCurrentPage(page);
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
