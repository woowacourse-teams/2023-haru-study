import { styled } from 'styled-components';

import color from '@Styles/color';

export const StudyInformationLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
    h2 {
      margin-bottom: 0px;
    }
  }
`;

export const StudyInfoContainer = styled.div`
  display: flex;
  max-width: 100%;
  width: 350px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  svg {
    width: 20px;
    height: 20px;
  }

  :nth-child(3) {
    text-align: end;
  }

  p {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 700;
    color: ${color.neutral[700]};
  }

  @media screen and (max-width: 768px) {
    width: 100%;

    :nth-child(3) {
      text-align: start;
      justify-content: space-between;
    }
  }
`;
