package harustudy.backend.integration;

import harustudy.backend.repository.StudyRepository;
import org.springframework.beans.factory.annotation.Autowired;


class CreateStudyIntegrationTest extends IntegrationTest {

    @Autowired
    StudyRepository studyRepository;
}
