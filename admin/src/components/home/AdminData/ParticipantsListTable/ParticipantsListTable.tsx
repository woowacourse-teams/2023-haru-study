import { styled } from 'styled-components';

import useFetch from '@Hooks/useFetch';

import { PARTICIPANT_KEYWORDS } from '@Constants/index';

import { getKeys, invariantOf } from '@Utils/index';

import type { ResponseParticipant } from '@Types/api';

import Pagenation from '../Pagination/Pagination';

const ParticipantsListTable = () => {
  const { page, changePage, result: participants } = useFetch<ResponseParticipant>('participants');

  if (!participants || participants.data.length === 0) return <div>조회된 데이터가 없습니다.</div>;

  const keys = getKeys(invariantOf(participants.data[0]), []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            {keys.map((key) => (
              <Th key={key}>{PARTICIPANT_KEYWORDS[key]}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {participants.data.map((participant, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <Td key={key}>{key === 'isHost' ? (participant[key] ? 'yes' : 'no') : participant[key]}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagenation totalPage={participants.totalPage} page={page} changePage={changePage} limitPageCount={5} />
    </>
  );
};

export default ParticipantsListTable;

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
