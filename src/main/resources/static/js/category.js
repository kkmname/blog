async function fetchCategories() {
    try {
        const response = await fetch('/api/category');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const categories = await response.json();
        console.log('Categories:', categories);
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}