package com.example.demo;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Alusi
 * @date 2023.12.1
 */


public class GameController {
    private GameRepository gameRepository;

    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @GetMapping("/findAllGames")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public List<Game> findAllGames() {
        Iterable<Game> games = this.gameRepository.findAll(Sort.by("score").descending());
        List<Game> gameList = new ArrayList<>();
        games.forEach(gameList::add);
        return gameList;
    }


}
