package harustudy.backend.config;

import harustudy.backend.common.CachingFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<CachingFilter> contentCachingFilter(){
        FilterRegistrationBean<CachingFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new CachingFilter());
        registrationBean.addUrlPatterns("/api/v2/participant-codes/*", "/api/v2/studies/*", "/api/v2/temp/*", "/api/v2/auth/*", "/api/v2/me/*");
        registrationBean.setOrder(1);
        registrationBean.setName("CachingFilter");
        return registrationBean;
    }
}
