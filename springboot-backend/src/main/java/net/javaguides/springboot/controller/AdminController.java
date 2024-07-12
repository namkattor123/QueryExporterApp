package net.javaguides.springboot.controller;

import net.javaguides.springboot.dto.AuthResponseDTO;
import net.javaguides.springboot.dto.LoginDTO;
import net.javaguides.springboot.dto.RegisterDto;
import net.javaguides.springboot.model.Database;
import net.javaguides.springboot.model.Role;
import net.javaguides.springboot.model.UserEntity;
import net.javaguides.springboot.repository.RoleRepository;
import net.javaguides.springboot.repository.UserRepository;
import net.javaguides.springboot.security.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/user")
    public List<UserEntity> getAllUser(){
        return userRepository.findAll();
    }
}