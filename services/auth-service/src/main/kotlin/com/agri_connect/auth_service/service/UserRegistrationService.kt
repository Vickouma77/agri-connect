package com.agri_connect.auth_service.service

import com.agri_connect.auth_service.entity.MyUser
import com.agri_connect.auth_service.repository.UserRepository
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service


@Service
class UserRegistrationService (
    val userRepository: UserRepository,
    val passwordEncoder: BCryptPasswordEncoder
) {

    fun newUserRegistration(userRegistrationDto: UserRegistrationDto): MyUser {
        if (userRepository.existsByUsername(userRegistrationDto.username)) {
            throw IllegalArgumentException("Username already exists")
        }
        val encodedPassword = passwordEncoder.encode(userRegistrationDto.password)

        val user = MyUser(
            username = userRegistrationDto.username,
            password = encodedPassword,
            authority = userRegistrationDto.authority,
            email = userRegistrationDto.email
        )

        return userRepository.save(user)
    }
}

data class UserRegistrationDto(
    val username: String = "",
    val password: String = "",
    val email: String = "",
    val authority: String = ""
)


