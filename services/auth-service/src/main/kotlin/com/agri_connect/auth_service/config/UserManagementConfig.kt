package com.agri_connect.auth_service.config

import com.agri_connect.auth_service.components.CustomAuthProvider
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.NoOpPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager


@Configuration
class UserManagementConfig(private val authenticationProvider: CustomAuthProvider) {

    @Bean
    fun userDetailsService(): UserDetailsService {
        val userDetailsManager = InMemoryUserDetailsManager()
        val user = User.withUsername("John")
            .password("12345")
            .authorities("read")
            .build();
        userDetailsManager.createUser(user)
        return userDetailsManager
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return NoOpPasswordEncoder.getInstance()
    }
}