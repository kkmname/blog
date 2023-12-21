package kkm.repository.blog.article.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kkm.repository.blog.article.domain.Article;
import kkm.repository.blog.article.service.ArticleService;
import kkm.repository.blog.category.service.CategoryService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/article")
public class ArticleAPIController {
    
    @Autowired
    ArticleService articleService;
    @Autowired
    CategoryService categoryService;

    @GetMapping
    public List<Article> articles(@RequestParam(name="category") String categoryId) {
        log.info("######################################################################");
        log.info("ArticleAPIController articles()");
        log.info("######################################################################");

        return articleService.getArticleListByCategory(categoryService.getCategory(categoryId));
    }

    @GetMapping("/{id}")
    public Article article(@PathVariable("id") String id) {
        return articleService.getArticle(id);
    }
    
}
