import useFetch from '@Hooks/useFetch';

import { getKeys } from '@Utils/index';

import type { ResponseStudies } from '@Types/api';

import Pagenation from '../Pagination/Pagination';

const StudiesListTable = () => {
  const { page, changePage, result: studies } = useFetch<ResponseStudies>('studies');

  if (!studies || studies.data.length === 0) return <div>조회된 데이터가 없습니다.</div>;

  const keys = getKeys(studies.data[0], ['detail']);

  return (
    <>
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studies.data.map((study, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key}>
                  {key === 'detail' ? <button onClick={() => console.log(study.id)}>상세보기</button> : study[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagenation totalPage={studies.totalPage} page={page} changePage={changePage} limitPageCount={5} />
    </>
  );
};

export default StudiesListTable;
