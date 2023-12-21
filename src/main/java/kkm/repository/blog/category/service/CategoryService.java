package kkm.repository.blog.category.service;

import java.util.List;

import kkm.repository.blog.category.domain.Category;

public interface CategoryService {
    public List<Category> getCategories();
    public Category getCategory(String categoryId);
}
