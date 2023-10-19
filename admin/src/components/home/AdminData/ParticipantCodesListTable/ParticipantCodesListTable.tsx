import { styled } from 'styled-components';

import useFetch from '@Hooks/useFetch';

import { PARTICIPANT_CODES_KEYWORDS } from '@Constants/index';

import { getKeys, invariantOf } from '@Utils/index';

import type { ResponseParticipantCodes } from '@Types/api';

import Pagenation from '../Pagination/Pagination';

const ParticipantCodesListTable = () => {
  const { page, changePage, result: participantCodes } = useFetch<ResponseParticipantCodes>('participant-codes');

  if (!participantCodes || participantCodes.data.length === 0) return <div>조회된 데이터가 없습니다.</div>;

  const keys = getKeys(invariantOf(participantCodes.data[0]), []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            {keys.map((key) => (
              <Th key={key}>{PARTICIPANT_CODES_KEYWORDS[key]}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {participantCodes.data.map((participantCodes, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <Td key={key}>{participantCodes[key]}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagenation totalPage={participantCodes.totalPage} page={page} changePage={changePage} limitPageCount={5} />
    </>
  );
};

export default ParticipantCodesListTable;

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
