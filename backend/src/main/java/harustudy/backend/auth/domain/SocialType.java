package harustudy.backend.auth.domain;

public enum SocialType {
    GUEST,
    GOOGLE;

    public static SocialType from(String name) {
        return valueOf(name.toUpperCase());
    }
}
