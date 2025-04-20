import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { FilterBody } from '@/components/Filter/FilterBody';

export const FilterTop = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div className="filter-top">
      <Button variant="primary" onClick={handleShow} className="me-2">
        Поменять поиск
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="top">
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
