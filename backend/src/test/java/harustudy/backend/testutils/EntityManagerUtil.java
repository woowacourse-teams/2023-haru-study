package harustudy.backend.testutils;

import jakarta.persistence.EntityManager;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

public class EntityManagerUtil {

    public static void FLUSH_AND_CLEAR_CONTEXT(EntityManager entityManager) {
        entityManager.flush();
        entityManager.clear();
    }

    public static void FLUSH_AND_CLEAR_CONTEXT(TestEntityManager entityManager) {
        entityManager.flush();
        entityManager.clear();
    }
}
