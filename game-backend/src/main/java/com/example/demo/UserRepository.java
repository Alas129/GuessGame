package com.example.demo;

/**
 * Repository interface for managing User entities in the database.
 * @author Alusi
 * @date 2023.12.1
 */

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;

public interface UserRepository extends DatastoreRepository<User, String> {

}
