package tnv5.thenetfish.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tnv5.thenetfish.dao.UserDAO;
import tnv5.thenetfish.dto.UserRegistrationDto;
import tnv5.thenetfish.model.User;

@Service
public class UserRegistrationService {
    UserDAO userDAO;
    PasswordEncoder passwordEncoder;

    @Autowired
    public UserRegistrationService(@Qualifier("userDAO") UserDAO userDAO, PasswordEncoder passwordEncoder) {
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


}
