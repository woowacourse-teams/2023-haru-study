import { styled } from 'styled-components';

import color from '@Styles/color';

export const StudyInformationLayout = styled.div`
  display: grid;
  row-gap: 20px;

  h2 {
    margin-bottom: 20px;
  }
`;

export const StudyInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 20px 160px 160px;
  align-items: center;
  column-gap: 10px;

  :nth-child(3) {
    text-align: end;
  }

  p {
    font-weight: 600;
    color: ${color.neutral[700]};
  }
`;
