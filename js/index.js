// JavaScript for handling search suggestions
async function getSuggestions() {
    const query = document.getElementById('search-input').value;

    // Don't send request if input is empty
    if (query.length === 0) {
        document.getElementById('suggestions-dropdown').innerHTML = '';
        return;
    }

    try {
        // Send a request to the backend to get search suggestions
        const response = await fetch(`http://localhost:5000/search?q=${query}`);
        const articles = await response.json();

        const dropdown = document.getElementById('suggestions-dropdown');
        dropdown.innerHTML = '';  // Clear previous suggestions

        if (articles.length === 0) {
            dropdown.innerHTML = '<p>No suggestions found</p>';
        } else {
            // Create suggestion items
            articles.forEach(article => {
                const item = document.createElement('div');
                item.classList.add('suggestion-item');

                item.innerHTML = `
                    <img src="${article.image || 'default_image_url.jpg'}" alt="${article.title}">
                    <span>${article.title}</span>
                `;

                // Add click event to each suggestion item
                item.addEventListener('click', () => {
                    document.getElementById('search-input').value = article.title;
                    dropdown.innerHTML = '';  // Hide dropdown when an item is selected
                });

                dropdown.appendChild(item);
            });
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}


// JavaScript to toggle the mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});
