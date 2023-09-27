package harustudy.backend.testutils;

import jakarta.persistence.EntityManager;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

public class EntityManagerUtil {

    public static void flushAndClearContext(EntityManager entityManager) {
        entityManager.flush();
        entityManager.clear();
    }

    public static void flushAndClearContext(TestEntityManager entityManager) {
        entityManager.flush();
        entityManager.clear();
    }
}
