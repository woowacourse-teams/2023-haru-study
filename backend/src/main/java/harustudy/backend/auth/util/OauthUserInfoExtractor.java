package harustudy.backend.auth.util;

import harustudy.backend.auth.dto.UserInfo;
import harustudy.backend.auth.exception.InvalidProviderNameException;
import java.util.Arrays;
import java.util.Map;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum OauthUserInfoExtractor {

    GOOGLE("google") {
        @Override
        public UserInfo from(Map<String, Object> attributes) {
            return UserInfo.builder()
                    .name(String.valueOf(attributes.get("name")))
                    .email(String.valueOf(attributes.get("email")))
                    .imageUrl(String.valueOf(attributes.get("picture")))
                    .build();
        }
    },
    KAKAO("kakao") {
        @Override
        public UserInfo from(Map<String, Object> attributes) {
            Map<String, String> properties = (Map<String, String>) attributes.get("properties");
            return UserInfo.builder()
                    .name(properties.get("nickname"))
                    .email(properties.get("email"))
                    .imageUrl(properties.get("profile_image"))
                    .build();
        }
    };

    private final String providerName;

    public static UserInfo extract(String providerName, Map<String, Object> attributes) {
        return Arrays.stream(values())
                .filter(provider -> providerName.equals(provider.providerName))
                .findFirst()
                .orElseThrow(InvalidProviderNameException::new)
                .from(attributes);
    }

    public abstract UserInfo from(Map<String, Object> attributes);
}
