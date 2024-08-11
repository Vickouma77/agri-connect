package com.agri_connect.auth_service.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/auth")
class HomeController {

    @GetMapping("/home")
    fun home(): String {
        return "Welcome to AgriConnect"
    }
}