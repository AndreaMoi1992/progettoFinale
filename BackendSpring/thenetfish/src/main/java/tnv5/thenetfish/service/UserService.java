package tnv5.thenetfish.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tnv5.thenetfish.dao.UserDAO;
import tnv5.thenetfish.dto.UserRegistrationDto;
import tnv5.thenetfish.model.User;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    UserDAO userDAO;
    PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(@Qualifier("userDAO") UserDAO userDAO, PasswordEncoder passwordEncoder) {
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
    }


    //////////////// LOGIN / REGISTRATION //////////////////////

    // POST -- SIGNUP
    public void signup(UserRegistrationDto dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        //user.setPassword(dto.getPassword());
        user.setEnabled(true);
        userDAO.save(user);
    }


    //CREATE
    //public String addUser(User user) {
    //    User result = userDAO.save(user);
    //    if (result != null && result.getId() != 0) {
    //        return "Utente salvato correttamente";
    //    } else {
    //        return "Errore: utente non salvato correttamente.";
    //    }
    //}

    //READ
    public User getUserById(Long id) {
        Optional<User> foundUser = userDAO.findById(id);
        return foundUser.orElse(null);
    }

    public Iterable<User> getAllUsers() {
        return userDAO.findAll();
    }


    public User getUserByUsername(String username) {
        return userDAO.findByUsername(username);
    }

    public User getUserByEmail(String email) {
        Optional<User> foundUser = Optional
                .ofNullable(userDAO.findByEmail(email));
        return foundUser.orElse(null);
    }


    public List<User> getUserContainingUsername(String partialUsername) {
        return userDAO.findByUsernameContaining(partialUsername);
    }

    //UPDATE
    public String updateUser(Long id, User user) {
        if (userDAO.existsById(id)) {
            user.setId(id);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setEnabled(true);
            User result = userDAO.save(user);
            return "Utente aggiornato correttamente";
        }
        //if (result != null && result.getId() != 0) {
        //} else {
        return "Errore nell'aggiornamento dell'utente";

    }

    //DELETE

    public String deleteUser(Long id) {
        Optional<User> userToDelete = userDAO.findById(id);
        if (userToDelete == null) {
            return "Utente con id: "
                    + id + " non trovato";
        } else {
            userDAO.deleteById(id);
            return "Utente con id : "
                    + id + " cancellato correttamente";
        }
    }


}
