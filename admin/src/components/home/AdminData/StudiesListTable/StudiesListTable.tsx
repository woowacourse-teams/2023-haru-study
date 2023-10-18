import { styled } from 'styled-components';

import useFetch from '@Hooks/useFetch';

import { STUDIES_KEY } from '@Constants/index';

import { useModal } from '@Contexts/ModalProvider';

import { getKeys, invariantOf } from '@Utils/index';

import type { ResponseStudies } from '@Types/api';

import Pagenation from '../Pagination/Pagination';
import StudiesDetailTable from '../StudiesDetailTable/StudiesDetailTable';

const StudiesListTable = () => {
  const { page, changePage, result: studies } = useFetch<ResponseStudies>('studies');

  const { openModal } = useModal();

  if (!studies || studies.data.length === 0) return <div>조회된 데이터가 없습니다.</div>;

  const keys = getKeys(invariantOf(studies.data[0]), ['detail']);

  return (
    <>
      <Table>
        <thead>
          <tr>
            {keys.map((key) => (
              <Th key={key}>{STUDIES_KEY[key]}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studies.data.map((study, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <Td key={key}>
                  {key === 'detail' ? (
                    <Button onClick={() => openModal(<StudiesDetailTable studyId={study.id} />)}>보기</Button>
                  ) : (
                    study[key]
                  )}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagenation totalPage={studies.totalPage} page={page} changePage={changePage} limitPageCount={5} />
    </>
  );
};

export default StudiesListTable;

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

const Button = styled.button`
  background-color: #3b82f6;
  color: #fff;
  border: none;
  padding: 4px 8px;
`;
