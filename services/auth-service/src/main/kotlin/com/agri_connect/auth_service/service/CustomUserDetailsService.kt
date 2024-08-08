package com.agri_connect.auth_service.service

import com.agri_connect.auth_service.entity.MyUser
import com.agri_connect.auth_service.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service


@Service
class CustomUserDetailsService(
    @Autowired private val userRepository: UserRepository
): UserDetailsService {

    @Throws(AuthenticationException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user: MyUser = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")
        return CustomUserDetails(user)
    }

}

data class CustomUserDetails(
    private val user: MyUser
): UserDetails {

    override fun getPassword(): String = user.password
    override fun getUsername(): String = user.username
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> =
        mutableListOf(GrantedAuthority { user.authority })

    override fun isAccountNonExpired(): Boolean = true
    override fun isAccountNonLocked(): Boolean = true
    override fun isCredentialsNonExpired(): Boolean = true
    override fun isEnabled(): Boolean = true
}
