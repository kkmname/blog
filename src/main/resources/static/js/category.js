$(document).ready(function() {
    category.init();
});

var category = {
    init: async function() {
        const subjects = await this.getList();
        this.draw(null, subjects);
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

        subjects.forEach(async function(subject) {
            if (target.id == subject.parentId) {
                let parentTree = document.getElementById("tree-for-" + target.name);

                let subjectTag = document.createElement("li");
                parentTree.appendChild(subjectTag);

                let subjectContent = document.createElement("a");
                subjectContent.className = await category.isExistsChild(subject, subjects) ? "directory" : "file";
                subjectContent.textContent = subject.name;
                subjectTag.appendChild(subjectContent);

                let subjectTree = document.createElement("ul");
                subjectTree.id = "tree-for-" + subject.name;
                subjectTag.appendChild(subjectTree);

                category.draw(subject, subjects);
            }
        });
    },

    isExistsChild: async function(target, subjects) {
        let isExists = false;
        subjects.forEach(function(subject) {
            if (target.id == subject.parentId) {
                isExists = true;
            }
        });
        return isExists;
    }
};
