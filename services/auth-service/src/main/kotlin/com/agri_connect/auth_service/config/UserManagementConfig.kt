package com.agri_connect.auth_service.config

import com.agri_connect.auth_service.service.CustomUserDetailsService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity

@Configuration
@EnableWebSecurity
class UserManagementConfig(
    private val customUserDetailsService: CustomUserDetailsService,
    private val auth: AuthenticationManagerBuilder
) {

    @Bean
    fun bcryptPassword(): BCryptPasswordEncoder {

        return BCryptPasswordEncoder(10)
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return bcryptPassword()
    }

    fun configureAuthentication() {
        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder())
    }
}
