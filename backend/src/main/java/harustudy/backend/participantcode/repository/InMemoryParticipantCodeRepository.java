package harustudy.backend.participantcode.repository;

import harustudy.backend.participantcode.domain.ParticipantCode;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;

@Repository
public class InMemoryParticipantCodeRepository {

    // 1 hour
    private static final long SCHEDULE_DELAY_IN_MILLIS = 1000 * 60 * 60;
    // 10 sec
//    private static final long SCHEDULE_DELAY_IN_MILLIS = 1000 * 10;

    private final Map<String, ParticipantCode> participantCodeRepository = new ConcurrentHashMap<>();

    @Scheduled(fixedDelay = SCHEDULE_DELAY_IN_MILLIS)
    protected void expireCode() {
        for (Entry<String, ParticipantCode> entry : participantCodeRepository.entrySet()) {
            ParticipantCode participantCode = entry.getValue();
            if (participantCode.isExpired()) {
                participantCodeRepository.remove(entry.getKey());
            }
        }
    }

    public Optional<ParticipantCode> findByCode(String code) {
        return Optional.ofNullable(participantCodeRepository.get(code));
    }

    public ParticipantCode save(ParticipantCode participantCode) {
        participantCodeRepository.put(participantCode.getCode(), participantCode);
        return participantCode;
    }
}
