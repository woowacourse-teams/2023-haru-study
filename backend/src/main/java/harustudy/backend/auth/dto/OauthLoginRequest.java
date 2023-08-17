package harustudy.backend.auth.dto;

public record OauthLoginRequest(String oauthProvider, String code) {

}
