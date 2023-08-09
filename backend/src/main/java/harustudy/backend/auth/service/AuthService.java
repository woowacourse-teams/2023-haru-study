package harustudy.backend.auth.service;

import harustudy.backend.auth.GoogleOauthClient;
import harustudy.backend.auth.OauthProperties;
import harustudy.backend.auth.OauthProperty;
import harustudy.backend.auth.OauthUserInfoExtractor;
import harustudy.backend.auth.domain.OauthMember;
import harustudy.backend.auth.domain.SocialType;
import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.dto.UserInfo;
import harustudy.backend.auth.repository.OauthMemberRepository;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {

  private final OauthProperties oauthProperties;
  private final GoogleOauthClient googleOauthClient;
  private final OauthMemberRepository oauthMemberRepository;

  public TokenResponse oauthLogin(String oauthProvider, String code) {
    OauthProperty oauthProperty = oauthProperties.get(oauthProvider);
    OauthTokenResponse oauthToken = googleOauthClient.requestOauthToken(code, oauthProperty);
    Map<String, Object> oauthUserInfo = googleOauthClient.requestOauthUserInfo(oauthProperty,
        oauthToken);
    UserInfo userInfo = OauthUserInfoExtractor.extract(oauthProvider, oauthUserInfo);

    saveOrUpdateOauthMember(oauthProvider, userInfo);
    return null;
  }

  private OauthMember saveOrUpdateOauthMember(String oauthProvider, UserInfo userInfo) {
    OauthMember oauthMember = oauthMemberRepository.findByEmail(userInfo.email())
        .map(entity -> entity.update(
            userInfo.email(), userInfo.name(), userInfo.imageUrl()))
        .orElseGet(() -> userInfo.toOauthMember(SocialType.valueOf(oauthProvider)));
    return oauthMemberRepository.save(oauthMember);
  }

  public TokenResponse guestLogin() {
    return null;
  }

  public TokenResponse refresh(UUID refreshToken) {
    return null;
  }
}
