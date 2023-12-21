package kkm.repository.blog.article.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import kkm.repository.blog.category.domain.Category;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="ARTICLE")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @Column(name="TITLE", nullable=false)
    private String title;

    @Column(name="CONTENTS", columnDefinition="TEXT")
    private String contents;

    @Column(name="IS_DRAFT", nullable=false)
    private boolean isDraft;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name="CATEGORY_ID", nullable=false)
    private Category category;
}
