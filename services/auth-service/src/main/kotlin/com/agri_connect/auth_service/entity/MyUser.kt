package com.agri_connect.auth_service.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id


@Entity
class MyUser(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long = 0,
    val username: String = "",
    val password: String = "",
    val authority: String = ""
)