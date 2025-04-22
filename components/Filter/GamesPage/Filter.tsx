import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './Filter.module.scss';

import { FilterBody } from '@/components/Filter/GamesPage/FilterBody';

export const Filter = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div className={styles['filter']}>
      <Button variant="primary" onClick={handleShow} className="me-2">
        Фильтр
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className={styles['game-page__offcanvas']}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Фильтр</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FilterBody setShow={setShow} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
