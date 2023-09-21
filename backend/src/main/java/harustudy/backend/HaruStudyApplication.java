package harustudy.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class HaruStudyApplication {

    public static void main(String[] args) {
        SpringApplication.run(HaruStudyApplication.class, args);
    }
}
