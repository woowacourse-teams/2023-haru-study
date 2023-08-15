package harustudy.backend.room.repository;

import harustudy.backend.room.domain.PomodoroRoom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PomodoroRoomRepositoryImpl implements PomodoroRoomRepositoryCustom {

    private final EntityManager entityManager;

    @Override
    public Optional<PomodoroRoom> findWithFilter(Long roomId, String participantCode) {
        StringBuilder jpql = new StringBuilder("select pr from PomodoroRoom pr");
        List<String> criteria = new ArrayList<>();

        if (Objects.nonNull(roomId)) {
            criteria.add(" pr.id = :roomId");
        }
        if (Objects.nonNull(participantCode)) {
            criteria.add(" pr.participantCode.code = :participantCode");
        }

        if (!criteria.isEmpty()) {
            jpql.append(" where");
        }

        for (int i = 0; i < criteria.size(); i++) {
            if (i > 0) {
                jpql.append(" and");
            }
            jpql.append(criteria.get(i));
        }

        TypedQuery<PomodoroRoom> query = entityManager.createQuery(
                jpql.toString(), PomodoroRoom.class);

        if (Objects.nonNull(roomId)) {
            query.setParameter("roomId", roomId);
        }
        if (Objects.nonNull(participantCode)) {
            query.setParameter("participantCode", participantCode);
        }

        try {
            return Optional.of(query.getSingleResult());
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }
}
