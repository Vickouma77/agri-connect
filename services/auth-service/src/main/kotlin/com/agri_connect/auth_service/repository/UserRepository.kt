package com.agri_connect.auth_service.repository

import com.agri_connect.auth_service.entity.MyUser
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: JpaRepository<MyUser, Long> {
    fun findByUsername(username: String): MyUser?
    fun existsByUsername(username: String): Boolean
}