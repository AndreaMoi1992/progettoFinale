package tnv5.thenetfish.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tnv5.thenetfish.model.User;

import java.util.List;

@Repository("userDAO")
public interface UserDAO extends CrudRepository<User, Long> {

    public User findByUsername(String username);

    public User findByEmail(String email);

    public List<User> findByUsernameContaining(String partialUsername);
}
