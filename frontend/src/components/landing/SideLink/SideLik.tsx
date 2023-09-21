import { styled } from 'styled-components';

import BugReportingLink from '../BugReportingLink/BugReportingLink';
import ChattingLink from '../ChattingLink/ChattingLink';

const SideLink = () => {
  return (
    <Layout>
      <ChattingLink />
      <BugReportingLink />
    </Layout>
  );
};

export default SideLink;

const Layout = styled.div`
  position: fixed;
  bottom: 36px;
  right: 36px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  @media screen and (max-width: 768px) {
    bottom: 18px;
    right: 18px;
  }
`;
