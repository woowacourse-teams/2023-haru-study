import { useState } from 'react';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Typography from '@Components/common/Typography/Typography';

import useParticipantCode from '@Hooks/fetch/useParticipantCode';
import useInput from '@Hooks/useInput';

import { getCookie } from '@Utils/cookie';

import NickNameExistence from './NickNameExistence';
import NickNameNonExistence from './NickNameNonExistence';

export type NickNameExist = 'default' | 'exist' | 'notExist';

const ParticipationInfo = () => {
  const [nickNameExistence, setNickNameExistence] = useState<NickNameExist>('default');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const participantCodeInput = useInput(false);

  const { studyName, responseNickName, checkParticipantCode } = useParticipantCode();

  const handleOnClickParticipateButton = async () => {
    const memberId = getCookie('memberId');

    try {
      setIsLoading(true);

      const isExistParticipantCode = await checkParticipantCode(participantCodeInput.state, memberId);

      if (!isExistParticipantCode) {
        return setNickNameExistence('notExist');
      }
      
      setNickNameExistence('exist');
      
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert('해당 참여코드는 없는 코드입니다.');
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Input
        label={<Typography variant="p1">참여코드</Typography>}
        bottomText="스터디장에게 받은 참여코드를 입력하세요."
      >
        <Input.TextField onChange={participantCodeInput.onChangeInput} disabled={nickNameExistence !== 'default'} />
      </Input>
      {nickNameExistence === 'default' && (
        <Button
          variant="primary"
          onClick={handleOnClickParticipateButton}
          disabled={!participantCodeInput.state}
          isLoading={isLoading}
        >
          스터디 참여하기
        </Button>
      )}
      {nickNameExistence === 'notExist' && <NickNameNonExistence studyName={studyName} />}
      {nickNameExistence === 'exist' && (
        <NickNameExistence
          studyName={studyName}
          responseNickName={responseNickName}
          changeNickNameExistence={setNickNameExistence}
        />
      )}
    </Layout>
  );
};

export default ParticipationInfo;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
