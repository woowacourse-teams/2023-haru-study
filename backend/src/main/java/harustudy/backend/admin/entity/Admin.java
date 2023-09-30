package harustudy.backend.admin.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Getter
@Entity
public class Admin {

    @Id
    @GeneratedValue
    private Long id;

    private String account;

    private String password;
}
