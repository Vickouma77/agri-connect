package com.agri_connect.auth_service.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class WebAuthorizationConfig {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.httpBasic(Customizer.withDefaults())

        http.authorizeHttpRequests { requests ->
            requests
                .requestMatchers("/register").permitAll()
                .anyRequest().authenticated()
        }

        return http.build()
    }
}
