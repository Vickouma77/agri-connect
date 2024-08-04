package com.agri_connect.auth_service.components

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.stereotype.Component

@Component
class CustomAuthProvider: AuthenticationProvider {

    @Throws(AuthenticationException::class)
    override fun authenticate(authentication: Authentication): Authentication? {
        val username: String = authentication.name
        val password: String = authentication.credentials.toString()

        return if (username == "john" && password == "12345") {
            UsernamePasswordAuthenticationToken(username, password, emptyList())
        }else {
            throw AuthenticationCredentialsNotFoundException("Error!")
        }
    }

    override fun supports(authentication: Class<*>): Boolean {
        return UsernamePasswordAuthenticationToken::class.java.isAssignableFrom(authentication)
    }
}