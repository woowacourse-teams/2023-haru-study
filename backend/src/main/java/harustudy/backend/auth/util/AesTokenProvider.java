package harustudy.backend.auth.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.auth.exception.InvalidAccessTokenException;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AesTokenProvider {

    private static final String alg = "AES/CBC/PKCS5Padding";
    private static final String iv = "0123456789abcdef"; // 16byte

    private final ObjectMapper objectMapper;

    public String createAccessToken(Long subject, Long accessTokenExpireLength, String secretKey) {
        String token = AccessTokenUtils.issue(objectMapper, subject, accessTokenExpireLength);
        return encrypt(token, secretKey);
    }

    private String encrypt(String text, String secretKey) {
        try {
            Cipher cipher = Cipher.getInstance(alg);
            SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(), "AES");
            IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
            cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivParamSpec);

            byte[] encrypted = cipher.doFinal(text.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (GeneralSecurityException e) {
            throw new InvalidAccessTokenException(e);
        }
    }

    public Long parseSubject(String accessToken, String secretKey) {
        byte[] decrypted = decrypt(accessToken, secretKey);
        return AccessTokenUtils.parseSubject(objectMapper, decrypted);
    }

    private byte[] decrypt(String accessToken, String secretKey) {
        try {
            Cipher cipher = Cipher.getInstance(alg);
            SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(), "AES");
            IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
            cipher.init(Cipher.DECRYPT_MODE, keySpec, ivParamSpec);

            byte[] decodedBytes = Base64.getDecoder().decode(accessToken);
            return cipher.doFinal(decodedBytes);
        } catch (GeneralSecurityException | IllegalArgumentException e) {
            throw new InvalidAccessTokenException();
        }
    }
}
