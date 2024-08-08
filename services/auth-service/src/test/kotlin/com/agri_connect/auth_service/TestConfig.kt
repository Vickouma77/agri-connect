package com.agri_connect.auth_service

import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Profile
import org.springframework.jdbc.datasource.DriverManagerDataSource
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.utility.DockerImageName
import javax.sql.DataSource

@TestConfiguration
@Profile("test")
class TestContainersConfig {

    @Bean
    fun postgreSQLContainer(): PostgreSQLContainer<*> {

        val myImageName = DockerImageName.parse("postgres").asCompatibleSubstituteFor("postgres")
        val postgreSQLC = PostgreSQLContainer<Nothing>(myImageName)
        postgreSQLC .withDatabaseName("agri_connect")
        postgreSQLC .withUsername("root")
        postgreSQLC .withPassword("root")
        postgreSQLC.start()

        return postgreSQLC
    }

    @Bean
    fun dataSource(postgreSQLContainer: PostgreSQLContainer<*>): DataSource {

        val dataSource = DriverManagerDataSource()
        dataSource.setDriverClassName(postgreSQLContainer.driverClassName)
        dataSource.url = postgreSQLContainer.jdbcUrl
        dataSource.username = postgreSQLContainer.username
        dataSource.password = postgreSQLContainer.password

        return dataSource
    }
}