package com.agri_connect.auth_service.controllers

import com.agri_connect.auth_service.service.UserRegistrationDto
import com.agri_connect.auth_service.service.UserRegistrationService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/auth")
class AuthController(
    private val userRegistrationService: UserRegistrationService
) {

    @PostMapping("/register")
    fun registerUser(@RequestBody userRegistrationDto: UserRegistrationDto): ResponseEntity<String>{
        try {
            userRegistrationService.newUserRegistration(userRegistrationDto)
            return ResponseEntity.ok("User Registered successfully")
        } catch (e: IllegalArgumentException) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }
}