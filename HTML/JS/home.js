document.addEventListener('DOMContentLoaded', function() {
    // Get the current page URL
    const currentPage = window.location.pathname;
    
    // Get all menu items
    const menuItems = document.querySelectorAll('.writing div');
    
    // Remove 'selected' class from all menu items
    menuItems.forEach(item => {
        item.classList.remove('selected');
    });
    
    // Determine which menu item should be selected based on the current URL
    if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('/')) {
        document.getElementById('home').classList.add('selected');
    } else if (currentPage.includes('job-board.html')) {
        document.getElementById('jobboard').classList.add('selected');
    } else if (currentPage.includes('categories.html')) {
        document.getElementById('categories').classList.add('selected');
    } else if (currentPage.includes('about-us.html')) {
        document.getElementById('aboutus').classList.add('selected');
    } else if (currentPage.includes('login.html')) {
        document.getElementById('login').classList.add('selected');
    }

    // Add hover effects for the cards in the categories section
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click functionality to the "Find Job" button
    const findJobButton = document.getElementById('findJobButton');
    if (findJobButton) {
        findJobButton.addEventListener('click', function() {
            const searchValue = document.getElementById('type').value.trim();
            if (searchValue) {
                window.location.href = `job-board.html?search=${encodeURIComponent(searchValue)}`;
            } else {
                window.location.href = 'job-board.html';
            }
        });
    }

    // Add search functionality on Enter key press
    const searchInput = document.getElementById('type');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                findJobButton.click();
            }
        });
    }

    // Newsletter subscription form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }

    // Categories "See all" button
    const seeAllButton = document.querySelector('#p2h h1:last-child');
    if (seeAllButton) {
        seeAllButton.addEventListener('click', function() {
            window.location.href = 'categories.html';
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Language selector in the header
    const globeElement = document.getElementById('globe');
    if (globeElement) {
        globeElement.addEventListener('click', function() {
            alert('Language selection feature coming soon!');
        });
    }

    // Footer language selector
    const languageSelect = document.querySelector('.language-selector select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            console.log(`Language changed to: ${selectedLanguage}`);
            alert(`Language preference set to: ${selectedLanguage}`);
        });
    }
});
