package com.example.demo;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * Repository interface for managing Game entities in the database.
 * @author Alusi
 * @date 2023.12.1
 */
public interface GameRepository extends PagingAndSortingRepository<Game, Long >, DatastoreRepository<Game, Long > {
    List<Game> findByUserId(String userId);

    List<Game> findByGameId(String gameId);

    List<Game> findByScore(int score);
}
