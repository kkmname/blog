package kkm.repository.blog.article.service;

import java.util.List;

import kkm.repository.blog.article.domain.Article;
import kkm.repository.blog.category.domain.Category;

public interface ArticleService {
    public List<Article> getArticleListByCategory(Category category);
    public Article getArticle(String id);
}
