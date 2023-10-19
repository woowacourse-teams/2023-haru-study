import { styled } from 'styled-components';

import color from '@Styles/color';

import ArrowIcon from '@Assets/icons/ArrowIcon';

type Props = {
  title: string;
  description: string;
  onClick: () => void;
};

const StudyModeItem = ({ title, description, onClick }: Props) => {
  return (
    <Layout onClick={onClick}>
      <TextContainer>
        <TitleText>{title}</TitleText>
        <DescriptionText>{description}</DescriptionText>
      </TextContainer>
      <ArrowIconWrapper>
        <ArrowIcon direction="right" />
      </ArrowIconWrapper>
    </Layout>
  );
};

export default StudyModeItem;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 145px;

  padding: 30px;

  border: 1px solid ${color.neutral[200]};
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: ${color.neutral[50]};
  }

  @media screen and (max-width: 768px) {
    height: 130px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleText = styled.p`
  font-size: 2.4rem;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`;

const DescriptionText = styled.p`
  font-size: 2rem;
  font-weight: 300;

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ArrowIconWrapper = styled.div`
  align-self: center;
`;
