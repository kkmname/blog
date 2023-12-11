package kkm.repository.blog.category.service;

import java.util.List;

import kkm.repository.blog.category.domain.CategoryEntity;

public interface CategoryService {
    public List<CategoryEntity> getCategories();
}
