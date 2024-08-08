package com.agri_connect.auth_service

import com.agri_connect.auth_service.entity.MyUser
import com.agri_connect.auth_service.repository.UserRepository
import com.agri_connect.auth_service.service.CustomUserDetailsService
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit.jupiter.SpringExtension
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertNotNull


@ExtendWith(SpringExtension::class)
@SpringBootTest
@ContextConfiguration(classes = [TestContainersConfig::class])
class CustomUserDetailsServiceTest {

    @Autowired
    lateinit var customUserDetailsService: CustomUserDetailsService

    @Autowired
    lateinit var userRepository: UserRepository

    @BeforeEach
    fun setUp() {
        userRepository.deleteAll()
    }

    @AfterEach
    fun tearDown() {
        userRepository.deleteAll()
    }

    @Test
    fun `should load user by username`() {
        val username = "root"
        val password = "root"
        val authority = "USER"
        val user = MyUser(username = username, password = password, authority = authority)
        userRepository.save(user)

        val userDetails = customUserDetailsService.loadUserByUsername(username)

        assertNotNull(userDetails)
        assertEquals(username, userDetails.username)
        assertEquals(password, userDetails.password)
        assertEquals(authority, (userDetails.authorities.first() as org.springframework.security.core.GrantedAuthority).authority)
    }

    @Test
    fun `should throw UsernameNotFoundException for non-existent user`() {
        assertFailsWith<UsernameNotFoundException> {
            customUserDetailsService.loadUserByUsername("nonExistentUser")
        }
    }
}