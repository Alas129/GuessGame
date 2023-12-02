package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 *
 * @author Alusi
 * @date 2023.12.1
 */
@RestController
public class UserController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/saveUser")
    @CrossOrigin(origins = "*")
    public String saveUser(@RequestParam User user) {
        if (user==null) {
            return "The user is invalid";
        }
        this.userRepository.save(user);
        return "success";
    }

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
