package harustudy.backend.config;

import harustudy.backend.auth.AuthArgumentResolver;
import harustudy.backend.auth.AuthInterceptor;
import harustudy.backend.common.LoggingInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.Duration;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final LoggingInterceptor loggingInterceptor;
    private final AuthInterceptor authInterceptor;
    private final AuthArgumentResolver authArgumentResolver;

    @Value("${cors-allow-origin}")
    private String[] corsAllowOrigins;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loggingInterceptor)
                .addPathPatterns("/api/v2/**")
                .excludePathPatterns("/api/v2/error-code")
                .excludePathPatterns("/api/v2/resources/**");

        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/api/v2/**")
                .excludePathPatterns("/api/v2/auth/**")
                .excludePathPatterns("/api/v2/error-code")
                .excludePathPatterns("/api/v2/resources/**");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v2/**")
                .allowedOriginPatterns(corsAllowOrigins)
                .allowedMethods("*")
                .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/api/v2/resources/**")
                .addResourceLocations("classpath:/static/")
                .setUseLastModified(true)
                .setCacheControl(CacheControl.maxAge(Duration.ofDays(365)).cachePublic());
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(authArgumentResolver);
    }
}
