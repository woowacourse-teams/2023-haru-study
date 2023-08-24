package harustudy.backend.participantcode.repository;

import harustudy.backend.participantcode.domain.ParticipantCode;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Optional;
import java.util.Queue;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;

@Repository
public class InMemoryParticipantCodeRepository {

    // 1 hour
//    private static final long SCHEDULE_DELAY_IN_MILLIS = 1000 * 60 * 60;
    // 10 sec
    private static final long SCHEDULE_DELAY_IN_MILLIS = 1000 * 10;

    private final Map<String, ParticipantCode> participantCodeRepository = new HashMap<>();
    private final Queue<ParticipantCode> participantCodeQueue = new LinkedList<>();
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    @Scheduled(fixedDelay = SCHEDULE_DELAY_IN_MILLIS)
    protected void expireCode() {
        while (isFirstRemovable()) {
            lock.writeLock().lock();
            try {
                ParticipantCode first = participantCodeQueue.poll();
                participantCodeRepository.remove(first.getCode());
            } finally {
                lock.writeLock().unlock();
            }
        }
    }

    private boolean isFirstRemovable() {
        lock.readLock().lock();
        try {
            return !participantCodeQueue.isEmpty() && participantCodeQueue.peek().isExpired();
        } finally {
            lock.readLock().unlock();
        }
    }

    public Optional<ParticipantCode> findByCode(String code) {
        lock.readLock().lock();
        try {
            return Optional.ofNullable(participantCodeRepository.getOrDefault(code, null));
        } finally {
            lock.readLock().unlock();
        }
    }

    public ParticipantCode save(ParticipantCode participantCode) {
        lock.writeLock().lock();
        try {
            participantCodeRepository.put(participantCode.getCode(), participantCode);
            participantCodeQueue.add(participantCode);
        } finally {
            lock.writeLock().unlock();
        }
        return participantCode;
    }
}
