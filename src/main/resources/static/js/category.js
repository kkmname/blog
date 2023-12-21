$(document).ready(async function() {
    category.init();
});

var category = {
    init: async function() {
        if (!this.intialized) {
            this.intialized = true;
            const subjects = await this.getList();
            this.draw(null, subjects);
        }
    },

    getList: async function () {
        try {
            const response = await fetch('/api/category');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const categories = await response.json();
            return categories;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    draw: async function (target, subjects) {
        if (target == null) {
            target = {"id" : null, "name" : "root"};
        }

        const drawPromises = [];

        subjects.forEach(async function(subject) {
            if (target.id == subject.parentId) {
                let parentTree = document.getElementById("tree-for-" + target.name);

                let subjectTag = document.createElement("li");
                parentTree.appendChild(subjectTag);

                let subjectContent = document.createElement("a");
                subjectContent.className = await category.isExistsChild(subject, subjects) ? "directory" : "file";
                subjectContent.textContent = subject.name;
                subjectContent.dataset.id = subject.id;
                subjectContent.onclick = category.viewContents;
                subjectTag.appendChild(subjectContent);

                if (subjectContent.className == "directory") {
                    let subjectTree = document.createElement("ul");
                    subjectTree.id = "tree-for-" + subject.name;
                    subjectTag.appendChild(subjectTree);
    
                    drawPromises.push(category.draw(subject, subjects));
                }
            }
        });

        await Promise.all(drawPromises);
    },

    isExistsChild: async function(target, subjects) {
        let isExists = false;
        subjects.forEach(function(subject) {
            if (target.id == subject.parentId) {
                isExists = true;
            }
        });
        return isExists;
    },

    viewContents: async function(event) {
        await category.clearContents();
        const categoryId = event.originalTarget.dataset.id;
        try {
            const response = await fetch('/api/article?category=' + categoryId);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const contents = await response.json();
            if (contents.length < 1) {
                const articleListHeader = document.getElementById("article-list-header");
                articleListHeader.innerHTML = "All " + 0 + " articles";
                return;
            }
            category.drawContents(contents);

        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    drawContents: async function(contents) {
        const articleListHeader = document.getElementById("article-list-header");
        articleListHeader.innerHTML = "All " + contents.length + " articles";

        const articleListContents = document.getElementById("article-list-contents");
        contents.forEach(async function(content) {
            if (content.draft) {
                return;
            }
            let article = document.createElement("article");
            article.className = "lh-lg";
            article.id = content.id;
            article.onclick = category.viewContent;
            articleListContents.appendChild(article);

            let title = document.createElement("span");
            title.className = "h5 fw-bold";
            title.textContent = "【" + content.title + "】";
            article.appendChild(title);

            if (true) {
                let bedge = document.createElement("span");
                bedge.className = "badge bg-secondary";
                bedge.textContent = "New";
                article.appendChild(bedge);
            }

            let date = document.createElement("span");
            date.className = "float-end";
            date.textContent = content.updatedAt;
            article.appendChild(date);
        });
    },

    clearContents: async function() {
        const articleListHeader = document.getElementById("article-list-header");
        articleListHeader.innerHTML = '';

        const articleListContents = document.getElementById("article-list-contents");
        articleListContents.innerHTML = '';

        const articleContents = document.getElementById("article-contents");
        articleContents.innerHTML = '';
    },

    viewContent: async function(event) {
        await category.clearContents();

        let target = event.originalTarget;
        if (target.tagName !== 'ARTICLE') {
            target = target.parentNode;
        }

        const articleContents = document.getElementById("article-contents");
        const articleId = target.id;
        try {
            const response = await fetch('/api/article/' + articleId);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const contents = await response.json();

            /* 제목 */
            const articleContentsHeader = document.createElement("div");
            articleContentsHeader.className = "mb-3";
            articleContents.appendChild(articleContentsHeader);

            const articleContentsHeaderName =  document.createElement("span");
            articleContentsHeaderName.className = "h3";
            articleContentsHeaderName.textContent = "title: ";
            articleContentsHeader.appendChild(articleContentsHeaderName);

            const articleContentsHeaderValue = document.createElement("span");
            articleContentsHeaderValue.className = "h1";
            articleContentsHeaderValue.textContent =  "【" + contents.title + "】";
            articleContentsHeader.appendChild(articleContentsHeaderValue);

            /* 생성일 */
            const articleContentsCreated = document.createElement("div");
            articleContents.appendChild(articleContentsCreated);

            const articleContentsCreatedName = document.createElement("span");
            articleContentsCreatedName.textContent = "created at: ";
            articleContentsCreated.appendChild(articleContentsCreatedName);

            const articleContentsCreatedValue = document.createElement("span");
            articleContentsCreatedValue.textContent = contents.createdAt;
            articleContentsCreated.appendChild(articleContentsCreatedValue);

            /* 수정일 */
            const articleContentsUpdated = document.createElement("div");
            articleContents.appendChild(articleContentsUpdated);;

            const articleContentsUpdatedName = document.createElement("span");
            articleContentsUpdatedName.textContent = "updated at: ";
            articleContentsUpdated.appendChild(articleContentsUpdatedName);

            const articleContentsUpdatedValue = document.createElement("span");
            articleContentsUpdatedValue.textContent = contents.updatedAt;
            articleContentsUpdated.appendChild(articleContentsUpdatedValue);

            /* 내용 */
            const articleContentsDetail = document.createElement("div");
            articleContentsDetail.className = "mt-5";
            articleContentsDetail.textContent = category.mdToHtml(contents.contents);
            articleContents.appendChild(articleContentsDetail);
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    mdToHtml: function(markdown) {
        return markdown;
    }
};
