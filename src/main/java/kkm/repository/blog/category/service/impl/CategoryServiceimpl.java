package kkm.repository.blog.category.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kkm.repository.blog.category.domain.Category;
import kkm.repository.blog.category.repository.CategoryRepository;
import kkm.repository.blog.category.service.CategoryService;

@Service
public class CategoryServiceimpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategory(String categoryId) {
        Optional<Category> categories = categoryRepository.findById(Long.parseLong(categoryId));
        if (categories.isPresent()) {
            return categories.get();
        }
        return null;
    }
}
