import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

type Props = {
  studyMembers: string[];
};

const StudyMembers = ({ studyMembers }: Props) => {
  return (
    <Layout>
      <Typography variant="p1">현재 참여한 스터디원</Typography>
      <MembersFiled>
        {studyMembers.map((member, index) => (
          <Typography key={index} variant="p2">
            {member}
          </Typography>
        ))}
      </MembersFiled>
      <Typography
        variant="p3"
        $style={css`
          align-self: center;
          color: ${color.neutral[300]};
        `}
      >
        스터디원들이 참여할 때까지 기다려주세요.
      </Typography>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MembersFiled = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-items: center;
  align-items: center;
  gap: 30px;

  width: 100%;
  height: 100%;
  padding: 50px 60px;

  border-radius: 7px;
  border: 1px solid ${color.neutral[200]};
`;

export default StudyMembers;
