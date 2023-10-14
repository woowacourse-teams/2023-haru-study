import useFetch from '@Hooks/api/useFetch';

import { requestGetLobbyInfo } from '@Apis/index';

const useLobbyInfoPolling = (studyId: string) => {
  const { result: lobbyInfo } = useFetch(() => requestGetLobbyInfo(studyId), {
    suspense: false,
    refetchInterval: 2000,
  });

  return {
    participantList: lobbyInfo?.participants ?? [],
    studyStatus: lobbyInfo?.studyStep,
  };
};

export default useLobbyInfoPolling;
