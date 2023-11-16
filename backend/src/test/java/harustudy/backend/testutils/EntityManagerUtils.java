package harustudy.backend.testutils;

import jakarta.persistence.EntityManager;

public class EntityManagerUtils {

    public static void flushAndClearContext(EntityManager entityManager) {
        entityManager.flush();
        entityManager.clear();
    }
}
