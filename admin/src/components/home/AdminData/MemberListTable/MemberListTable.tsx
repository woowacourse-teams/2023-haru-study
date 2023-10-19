import { useState } from 'react';
import { styled } from 'styled-components';

import useFetch from '@Hooks/useFetch';

import { MEMBER_LIST_KEYWORDS } from '@Constants/index';

import { getKeys, invariantOf } from '@Utils/index';

import type { ResponseMemberInfo } from '@Types/api';

import Pagenation from '../Pagination/Pagination';

type MemberListType = 'google' | 'kakao' | 'guest';

const MemberListTable = () => {
  const [memberListType, setMemberListType] = useState<MemberListType | null>(null);

  const { page, changePage, result } = useFetch<ResponseMemberInfo>(
    'members',
    memberListType ? `loginType=${memberListType}` : '',
  );

  if (!result || result.members.length === 0) return <div>조회된 데이터가 없습니다.</div>;

  const keys = getKeys(invariantOf(result.members[0]), []);

  return (
    <>
      <ButtonContainer>
        <Button onClick={() => setMemberListType(null)}>전체</Button>
        <Button onClick={() => setMemberListType('kakao')}>카카오</Button>
        <Button onClick={() => setMemberListType('google')}>구글</Button>
        <Button onClick={() => setMemberListType('guest')}>게스트</Button>
      </ButtonContainer>
      <h2>멤버 수: {result.members.length}</h2>
      <Table>
        <thead>
          <tr>
            {keys.map((key) => (
              <Th key={key}>{MEMBER_LIST_KEYWORDS[key]}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.members.map((member, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <Td key={key}>{member[key]}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagenation totalPage={result.totalPage} page={page} changePage={changePage} limitPageCount={5} />
    </>
  );
};

export default MemberListTable;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #e5e5e5;
`;

const Th = styled.th`
  border: 1px solid #e5e5e5;
  padding: 8px;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #e5e5e5;
  padding: 8px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #d4d4d4;
  color: #ffffff;
  border: none;
  padding: 4px 8px;
`;
