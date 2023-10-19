import { css, styled } from 'styled-components';

import color from '@Styles/color';

import { useNotification } from '@Contexts/NotificationProvider';

import ArrowIcon from '@Assets/icons/ArrowIcon';

type Props = {
  totalPagesNumber: number;
  currentPageNumber: number;
  shiftPage: (page: number) => void;
};

const PaginationButton = ({ totalPagesNumber, currentPageNumber, shiftPage }: Props) => {
  const { send } = useNotification();

  const handleClickPageButton = (page: number) => {
    if (page < 1) {
      send({ message: '첫 페이지예요.' });
      return;
    }

    if (page > totalPagesNumber) {
      send({ message: '마지막 페이지예요.' });
      return;
    }

    window.scroll({
      top: 0,
    });

    shiftPage(page);
  };

  const getRenderingPageButtons = () => {
    const renderingPages = Array.from({ length: totalPagesNumber }).map((_, index) => index + 1);

    if (totalPagesNumber < 6) return renderingPages.slice();

    if (currentPageNumber < 5) return renderingPages.slice(0, 5);

    if (currentPageNumber === totalPagesNumber) return renderingPages.slice(-5);

    return renderingPages.slice(currentPageNumber - 4, currentPageNumber + 1);
  };

  return (
    <Layout>
      <Button onClick={() => handleClickPageButton(currentPageNumber - 1)}>
        <ArrowIcon color={color.neutral[500]} direction="left" />
      </Button>
      {getRenderingPageButtons().map((pageNumber) => {
        const isCurrentButton = currentPageNumber === pageNumber;
        return (
          <Button key={pageNumber} onClick={() => handleClickPageButton(pageNumber)} $isCurrentButton={isCurrentButton}>
            {pageNumber}
          </Button>
        );
      })}
      <Button onClick={() => handleClickPageButton(currentPageNumber + 1)}>
        <ArrowIcon color={color.neutral[500]} direction="right" />
      </Button>
    </Layout>
  );
};

export default PaginationButton;

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  color: ${color.neutral[500]};

  svg {
    width: 12px;
    height: 12px;
  }
`;

type PaginationButtonProps = {
  $isCurrentButton?: boolean;
};

const Button = styled.button<PaginationButtonProps>`
  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 4px;

  ${({ $isCurrentButton }) => css`
    color: ${$isCurrentButton && color.white};
    background-color: ${$isCurrentButton && color.blue[400]};
  `}
`;
