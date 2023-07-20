import { useLocation } from 'react-router-dom';

const StudyParticipantForHost = () => {
  const location = useLocation();

  return (
    <div>
      {(location.state as { participantCode: string; studyName: string }).participantCode}
      {(location.state as { participantCode: string; studyName: string }).studyName}
    </div>
  );
};

export default StudyParticipantForHost;
