import { styled } from 'styled-components';

import color from '@Styles/color';

export const StudyInformationLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    margin-bottom: 20px;
  }
`;

export const StudyInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  :nth-child(1) {
    width: 30px;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  :nth-child(2) {
    width: 160px;
  }

  :nth-child(3) {
    width: 160px;
    text-align: end;
  }

  p {
    font-weight: 600;
    color: ${color.neutral[700]};
  }
`;
