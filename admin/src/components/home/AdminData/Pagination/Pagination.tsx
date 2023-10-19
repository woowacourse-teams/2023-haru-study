import { styled } from 'styled-components';

import usePagination from './hooks/usePagination';

type Props = {
  totalPage: number;
  limitPageCount: number;
  page: number;
  changePage: (page: number) => void;
};

const Pagenation = ({ totalPage, limitPageCount, page, changePage }: Props) => {
  const { currentPageArray } = usePagination(totalPage, page, limitPageCount);

  return (
    <Nav>
      <Button onClick={() => changePage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {currentPageArray?.map((pageNumber) => (
        <Button
          key={pageNumber + 1}
          onClick={() => changePage(pageNumber + 1)}
          aria-current={page === pageNumber + 1 ? 'page' : undefined}
        >
          {pageNumber + 1}
        </Button>
      ))}
      <Button onClick={() => changePage(page + 1)} disabled={page === totalPage}>
        &gt;
      </Button>
    </Nav>
  );
};

export default Pagenation;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 20%;
  padding: 8px;
  color: black;
  font-size: 1rem;

  &:hover {
    background: #dbeafe;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #bfdbfe;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
