package kkm.repository.blog.category.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kkm.repository.blog.category.domain.CategoryEntity;
import kkm.repository.blog.category.service.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryAPIController {

    @Autowired
    CategoryService categoryService;
    
    @GetMapping
    public List<CategoryEntity> categories() {
        return categoryService.getCategories();
    }
}
