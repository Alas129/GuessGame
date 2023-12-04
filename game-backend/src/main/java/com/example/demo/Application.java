package com.example.demo;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

import java.time.LocalDate;
import java.util.List;

@ShellComponent
@SpringBootApplication
public class Application {

    @Autowired
    GameRepository gameRepository;
    @Autowired
    UserRepository userRepository;

    public static void main(String[] args) {
      SpringApplication.run(Application.class, args);
  }

    @ShellMethod("Saves a game to Cloud Datastore: save-game <userId> <gameId> <score>")
    public String saveGame(String userId, String gameId, int score) {
        Game savedGame = this.gameRepository.save(new Game(userId, gameId, score));
        return savedGame.toString();
    }

    @ShellMethod("Loads all games")
    public String findAllGames() {
        Iterable<Game> games = this.gameRepository.findAll();
        return Lists.newArrayList(games).toString();
    }

    @ShellMethod("Loads games by user Id: find-by-user-id <userId>")
    public String findByUserId(String userId) {
        List<Game> games = this.gameRepository.findByUserId(userId);
        return games.toString();
    }

    @ShellMethod("Loads games by game Id: find-by-game-id <gameId>")
    public String findByGameId(String gameId) {
        List<Game> games = this.gameRepository.findByGameId(gameId);
        return games.toString();
    }

    @ShellMethod("Loads games by score: find-by-score <score>")
    public String findByScore(int score) {
        List<Game> games = this.gameRepository.findByScore(score);
        return games.toString();
    }

    @ShellMethod("Removes all games")
    public void removeAllBooks() {
        this.gameRepository.deleteAll();
    }

}
