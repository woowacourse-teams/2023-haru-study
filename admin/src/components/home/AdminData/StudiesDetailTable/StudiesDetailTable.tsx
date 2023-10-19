import { styled } from 'styled-components';

import useFetch from '@Hooks/useFetch';

import { PLAN_KEYWORDS, RETROSPECT_KEYWORDS, STUDIES_DETAIL_KEYWORDS } from '@Constants/index';

import { transformJsonToString, getKeys, invariantOf } from '@Utils/index';

import type { ResponseStudiesDetail } from '@Types/api';

import Pagenation from '../Pagination/Pagination';

type Props = {
  studyId: number;
};

const StudiesDetailTable = ({ studyId }: Props) => {
  const { page, changePage, result: studiesDetail } = useFetch<ResponseStudiesDetail>(`studies/${studyId}/contents`);

  if (!studiesDetail || studiesDetail.contents.length === 0) return <div>조회된 데이터가 없습니다.</div>;

  const keys = getKeys(invariantOf(studiesDetail.contents[0]), []);

  return (
    <>
      <h2>스터디 이름: {studiesDetail.studyName}</h2>
      <Table>
        <thead>
          <tr>
            {keys.map((key) => (
              <Th key={key}>{STUDIES_DETAIL_KEYWORDS[key]}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studiesDetail.contents.map((content, index) => (
            <tr key={index}>
              {keys.map((key) => {
                return (
                  <Td key={key}>
                    {key === 'plan'
                      ? transformJsonToString(content[key])
                          .map(([key, value]) => `${PLAN_KEYWORDS[key]}: ${value ? value : '없음'}`)
                          .join('\n')
                      : key === 'retrospect'
                      ? transformJsonToString(content[key])
                          .map(([key, value]) => `${RETROSPECT_KEYWORDS[key]}: ${value ? value : '없음'}`)
                          .join('\n')
                      : content[key]}
                  </Td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagenation totalPage={studiesDetail.totalPage} page={page} changePage={changePage} limitPageCount={5} />
    </>
  );
};

export default StudiesDetailTable;

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
  white-space: pre-line;
`;
