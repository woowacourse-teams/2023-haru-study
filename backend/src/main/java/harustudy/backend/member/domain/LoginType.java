package harustudy.backend.member.domain;

public enum LoginType {

    GUEST,
    GOOGLE;

    public static LoginType from(String name) {
        return valueOf(name.toUpperCase());
    }
}
