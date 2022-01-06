package tnv5.thenetfish.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import tnv5.thenetfish.dto.UserDto;
import tnv5.thenetfish.dto.UserRegistrationDto;
import tnv5.thenetfish.model.User;
import tnv5.thenetfish.service.UserRegistrationService;
import tnv5.thenetfish.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserService userService;
    //private UserRegistrationService registrationService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    //public UserController(UserRegistrationService registrationService) { this.registrationService = registrationService; }

    //CRUD operations (Create Read Update Delete)

   // @PostMapping("/")
   // public String addUser(@RequestBody User user) {
   //     return userService.addUser(user);
   // }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/username/{username}")
    public User getUserByUsername(@PathVariable("username") String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping("/username/like/{partialUsername}")
    public List<User> getUserContainingUsername(@PathVariable("partialUsername") String partialUsername) {
        return userService.getUserContainingUsername(partialUsername);
    }

    //allUsers - GET
    @GetMapping("/")
    public Iterable<User> allUsers() {
        return userService.getAllUsers();
    }

    //updateUser - PUT
    @PutMapping("/{id}")
    public String updateUser(@PathVariable("id") Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    //deleteUser - DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>("Utente con id : " + id + " cancellato correttamente", HttpStatus.OK);
    }

    ////////////////////// REGISTRAZIONE

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserRegistrationDto dto) {
        userService.signup(dto);
        return new ResponseEntity<>("Registrazione avvenuta con successo", HttpStatus.OK);
    }
}


