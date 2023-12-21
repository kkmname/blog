package kkm.repository.blog.category.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kkm.repository.blog.category.domain.Category;
import kkm.repository.blog.category.service.CategoryService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/category")
public class CategoryAPIController {

    @Autowired
    CategoryService categoryService;
    
    @GetMapping
    public List<Category> categories() {
        log.info("######################################################################");
        log.info("CategoryAPIController categories()");
        log.info("######################################################################");
        return categoryService.getCategories();
    }
}
