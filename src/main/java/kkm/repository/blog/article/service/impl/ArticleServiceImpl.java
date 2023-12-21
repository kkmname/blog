package kkm.repository.blog.article.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kkm.repository.blog.article.domain.Article;
import kkm.repository.blog.article.repository.ArticleRepository;
import kkm.repository.blog.article.service.ArticleService;
import kkm.repository.blog.category.domain.Category;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    ArticleRepository articleRepository;

    @Override
    public List<Article> getArticleListByCategory(Category category) {
        return articleRepository.findByCategory(category);
    }

    @Override
    public Article getArticle(String id) {
        return articleRepository.findById(Long.parseLong(id)).get();
    }
}
