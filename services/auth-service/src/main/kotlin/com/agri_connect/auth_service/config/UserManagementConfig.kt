package com.agri_connect.auth_service.config


import com.agri_connect.auth_service.service.CustomUserDetailsService
//import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder


@Configuration
class UserManagementConfig(
    private val customUserDetailsService: CustomUserDetailsService
) {

    fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder())
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder(10)
    }
}