import { useState } from 'react';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

import ReportIcon from '@Assets/icons/ReportIon';

const BUG_REPORTING_LINK =
  'https://docs.google.com/forms/d/e/1FAIpQLSdwvz3y9xYc9PHCLw1LiaLB8TGfGao91cVs_NwERHSV9c5Mfg/viewform';

const BugReportingLink = () => {
  const [isHoverIcon, setIsHoverIcon] = useState(false);

  return (
    <Layout>
      <GuideMessage $isHoverIcon={isHoverIcon}>불편사항 피드백하기</GuideMessage>
      <Link
        href={BUG_REPORTING_LINK}
        target="_blank"
        onMouseEnter={() => setIsHoverIcon(true)}
        onMouseLeave={() => setIsHoverIcon(false)}
      >
        <ReportIcon color="rgba(34,34,34)" />
      </Link>
    </Layout>
  );
};

export default BugReportingLink;

const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

type GuideMessageProps = {
  $isHoverIcon: boolean;
};

const GuideMessage = styled.p<GuideMessageProps>`
  font-size: 1.4rem;

  color: ${color.neutral[600]};

  ${({ $isHoverIcon }) => css`
    opacity: ${$isHoverIcon ? '1' : '0'};
  `}

  transition: opacity 0.15s ease;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Link = styled.a`
  cursor: pointer;

  background-color: ${color.neutral[100]};

  padding: 12px;
  border-radius: 14px;

  svg {
    width: 24px;
    height: 24px;
  }
`;
