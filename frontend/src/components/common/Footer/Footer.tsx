import { styled } from 'styled-components';

import Typography from '../Typography/Typography';

const URL = {
  github: 'https://github.com/woowacourse-teams/2023-haru-study',
  feedback: 'https://docs.google.com/forms/d/e/1FAIpQLSdwvz3y9xYc9PHCLw1LiaLB8TGfGao91cVs_NwERHSV9c5Mfg/viewform',
};

const Footer = () => {
  return (
    <Layout>
      <Typography variant="p3" fontSize="12px">
        우아한테크코스 5기 하루스터디
      </Typography>
      <Typography variant="p3" fontSize="12px">
        Copyright © 2023 하루스터디 - All rights reserved.
      </Typography>
      <LinkContainer>
        <a target="_blank" href={URL.github} rel="noreferrer">
          <Typography variant="p3" fontSize="12px">
            Github
          </Typography>
        </a>
        <a target="_blank" href={URL.feedback} rel="noreferrer">
          <Typography variant="p3" fontSize="12px">
            사용자 피드백
          </Typography>
        </a>
      </LinkContainer>
    </Layout>
  );
};

export default Footer;

const Layout = styled.footer`
  width: 100%;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 20px;

  margin-top: 10px;

  p {
    text-decoration: underline;
  }
`;
