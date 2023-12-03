package com.example.demo;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Controller class for managing game-related operations.
 *
 * @author Alusi
 * @date 2023.12.1
 */


public class GameController {
    // Game repository for database operations
    private final GameRepository gameRepository;

    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    /**
     * Endpoint to retrieve all games, sorted by score in descending order
     */
    @GetMapping("/findAllGames")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public List<Game> findAllGames() {
        Iterable<Game> games = this.gameRepository.findAll(Sort.by("score").descending());
        List<Game> gameList = new ArrayList<>();
        games.forEach(gameList::add);
        return gameList;
    }

    /**
     * Endpoint to retrieve games by user ID, sorted by score in descending order
     * @param userId
     * @return game list
     */
    @GetMapping("/findGameByUserId")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public List<Game> findByUserId(@RequestParam String userId){
        Iterable<Game> games = this.gameRepository.findByUserId(userId);
        List<Game> gameList = new ArrayList<>();
        games.forEach(gameList::add);
        gameList.sort(Comparator.comparingInt(Game::getScore).reversed());
        return gameList;
    }

    /**
     * Endpoint to save a new game
     * @param game
     * @return
     */
    @PostMapping("/saveGame")
    @CrossOrigin(origins = "*")
    public String saveGame(@RequestBody Game game) {
        if (game == null) {
            return "The game is invalid";
        }
        game.setDate(LocalDate.now());
        this.gameRepository.save(game);
        return "success";
    }

    /**
     * Endpoint to delete a game by its ID
     * @param id
     * @return
     */
    @GetMapping("/deleteGameById")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public String deleteGameById(@RequestParam Long id){
        this.gameRepository.deleteById(id);
        return "success";
    }
}
