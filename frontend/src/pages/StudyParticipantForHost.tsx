import { useLocation } from 'react-router-dom';

const StudyParticipantForHost = () => {
  const location = useLocation();

  return <div>{(location.state as { participantCode: string }).participantCode}</div>;
};

export default StudyParticipantForHost;
