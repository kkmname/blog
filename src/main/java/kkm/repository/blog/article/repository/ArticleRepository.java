package kkm.repository.blog.article.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kkm.repository.blog.article.domain.Article;
import kkm.repository.blog.category.domain.Category;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>{
    List<Article> findByCategory(Category category);
}
