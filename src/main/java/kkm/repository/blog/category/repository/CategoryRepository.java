package kkm.repository.blog.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kkm.repository.blog.category.domain.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
}
