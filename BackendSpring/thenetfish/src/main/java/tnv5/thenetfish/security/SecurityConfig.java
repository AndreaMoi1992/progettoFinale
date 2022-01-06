package tnv5.thenetfish.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    //PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    DataSource dataSource;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource);
        // DA ESEGUIRE SOLO AL PRIMO AVVIO (commentare o cancellare dopo la creazione)
               // .withUser("user")
               // .password(encoder.encode("password"))
               // .roles("USER")
               // .and()
               // .withUser("admin")
               // .password(encoder.encode("admin"))
               // .roles("ADMIN");
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors().and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/users/*")
                .permitAll()
                //.hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/users/")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/signup/")
                .permitAll()
                //.hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/users/")
                .permitAll()
                //.hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/users/")
                .permitAll()
                //.hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .httpBasic();
    }

    @Bean
    PasswordEncoder encoder() { return new BCryptPasswordEncoder(); }

}
