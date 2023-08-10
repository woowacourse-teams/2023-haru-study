package harustudy.backend.auth.domain;

public enum LoginType {

    GUEST,
    GOOGLE;

    public static LoginType from(String name) {
        return valueOf(name.toUpperCase());
    }
}
