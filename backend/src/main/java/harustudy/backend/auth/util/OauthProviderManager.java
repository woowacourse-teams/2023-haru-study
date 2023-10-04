package harustudy.backend.auth.util;

import org.springframework.core.NamedThreadLocal;

public class OauthProviderManager {

    private OauthProviderManager() {
    }

    private static final ThreadLocal<String> currentProviderName = new NamedThreadLocal<>("current oauth provider name");

    public static void setCurrentProviderName(String providerName) {
        currentProviderName.set(providerName);
    }

    public static String getCurrentProviderName() {
        return currentProviderName.get();
    }

    public static void clear() {
        currentProviderName.remove();
    }
}
