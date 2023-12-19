package kkm.repository.blog.category.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kkm.repository.blog.category.domain.CategoryEntity;
import kkm.repository.blog.category.repository.CategoryRepository;
import kkm.repository.blog.category.service.CategoryService;

@Service
public class CategoryServiceimpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<CategoryEntity> getCategories() {
        return categoryRepository.findAll();
    }
}
