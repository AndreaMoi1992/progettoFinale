package com.thenetfish.jwtauth.repository;
import java.util.Optional;

import com.thenetfish.jwtauth.model.Role;
import com.thenetfish.jwtauth.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
