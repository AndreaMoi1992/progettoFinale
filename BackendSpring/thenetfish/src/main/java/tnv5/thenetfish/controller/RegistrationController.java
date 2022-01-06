package tnv5.thenetfish.controller;

import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;
import tnv5.thenetfish.dto.UserDto;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

public class RegistrationController {


   // public ModelAndView registerUser(@ModelAttribute("user")
   //                                  @Valid UserDto userDto,
   //                                  HttpServletRequest request,
   //                                  Errors errors) {
   //     //...
   // }






    //Registration Route - GET
    @GetMapping("/registration")
    public String showRegistrationForm(WebRequest request, Model model) {
        UserDto userDto = new UserDto();
        model.addAttribute("user", userDto);
        return "registration";
    }
}

