package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Controller class for managing user-related operations.
 * @author Alusi
 * @date 2023.12.1
 */
@RestController
public class UserController {
    // User repository for database operations
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Endpoint to save a new user
     * @param user
     * @return
     */
    @PostMapping("/saveUser")
    @CrossOrigin(origins = "*")
    public String saveUser(@RequestParam User user) {
        if (user==null) {
            return "The user is invalid";
        }
        this.userRepository.save(user);
        return "success";
    }

    /**
     * Endpoint to find the game ID associated with a given user ID
     * @param userId
     * @return
     */
    @PostMapping("/findGameIdByUserId")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public String findGameIdByUserId(@RequestParam String userId) {
        Optional<User> user = this.userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get().getGameId();
        }
        return "";
    }
}
