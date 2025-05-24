document.addEventListener('DOMContentLoaded', function() {
    // ======================================
    // NAVIGATION & PAGE SELECTION
    // ======================================
    
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
        const homeElement = document.getElementById('home');
        if (homeElement) homeElement.classList.add('selected');
    } else if (currentPage.includes('job-board.html')) {
        const jobboardElement = document.getElementById('jobboard');
        if (jobboardElement) jobboardElement.classList.add('selected');
    } else if (currentPage.includes('categories.html')) {
        const categoriesElement = document.getElementById('categories');
        if (categoriesElement) categoriesElement.classList.add('selected');
    } else if (currentPage.includes('about-us.html')) {
        const aboutusElement = document.getElementById('aboutus');
        if (aboutusElement) aboutusElement.classList.add('selected');
    } else if (currentPage.includes('login.html')) {
        const loginElement = document.getElementById('login');
        if (loginElement) loginElement.classList.add('selected');
    }

    // ======================================
    // DROPDOWN FUNCTIONALITY - FIXED
    // ======================================
    
    const dropdown = document.getElementById('explore');
    if (dropdown) {
        const dropdownTrigger = dropdown.querySelector('.dropdown-trigger');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownTrigger && dropdownMenu) {
            // Toggle dropdown on click
            dropdownTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
            
            // Prevent dropdown from closing when clicking inside the menu
            dropdownMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Close dropdown when pressing Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    dropdown.classList.remove('active');
                }
            });
            
            // Handle dropdown item clicks
            const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    // Allow the link to work normally
                    dropdown.classList.remove('active');
                });
            });
        }
    }

    // ======================================
    // CARD HOVER EFFECTS
    // ======================================
    
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

    // ======================================
    // SEARCH FUNCTIONALITY
    // ======================================
    
    // Add click functionality to the "Find Job" button
    const findJobButton = document.getElementById('findJobButton');
    if (findJobButton) {
        findJobButton.addEventListener('click', function(e) {
            e.preventDefault();
            const searchInput = document.getElementById('type');
            const searchValue = searchInput ? searchInput.value.trim() : '';
            
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
                if (findJobButton) {
                    findJobButton.click();
                }
            }
        });
        
        // Add input focus effects
        searchInput.addEventListener('focus', function() {
            const outer = document.getElementById('outer');
            if (outer) {
                outer.style.boxShadow = '0px 8px 20px rgba(81, 45, 168, 0.15)';
            }
        });
        
        searchInput.addEventListener('blur', function() {
            const outer = document.getElementById('outer');
            if (outer) {
                outer.style.boxShadow = '0px 5px 15px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // ======================================
    // NEWSLETTER FUNCTIONALITY
    // ======================================
    
    // Newsletter subscription form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value.trim() : '';
            
            if (email && validateEmail(email)) {
                // Show success message
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            } else {
                // Show error message
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }

    // ======================================
    // CATEGORY NAVIGATION
    // ======================================
    
    // Categories "See all" button
    const seeAllButton = document.querySelector('#p2h h1:last-child');
    if (seeAllButton) {
        seeAllButton.addEventListener('click', function() {
            window.location.href = 'categories.html';
        });
    }

    // Add click functionality to category cards
    const categoryCards = document.querySelectorAll('.card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryText = this.querySelector('p').textContent.trim();
            const categoryParam = encodeURIComponent(categoryText);
            window.location.href = `categories.html?category=${categoryParam}`;
        });
        
        // Add cursor pointer style
        card.style.cursor = 'pointer';
    });

    // Add click functionality to popular service cards
    const serviceCards = document.querySelectorAll('.bigcard');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceText = this.querySelector('p').textContent.trim();
            const serviceParam = encodeURIComponent(serviceText);
            window.location.href = `job-board.html?service=${serviceParam}`;
        });
        
        // Add cursor pointer style
        card.style.cursor = 'pointer';
    });

    // ======================================
    // LANGUAGE SELECTOR
    // ======================================
    
    // Language selector in the header (if exists)
    const globeElement = document.getElementById('globe');
    if (globeElement) {
        globeElement.addEventListener('click', function() {
            showNotification('Language selection feature coming soon!', 'info');
        });
    }

    // Footer language selector
    const languageSelect = document.querySelector('.language-selector select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            const languageNames = {
                'en': 'English',
                'hi': 'Hindi',
                'bn': 'Bengali',
                'ta': 'Tamil'
            };
            
            console.log(`Language changed to: ${selectedLanguage}`);
            showNotification(`Language preference set to: ${languageNames[selectedLanguage] || selectedLanguage}`, 'info');
        });
    }

    // ======================================
    // SOCIAL MEDIA LINKS
    // ======================================
    
    // Handle social media icon clicks
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const iconClass = this.querySelector('i').className;
            let platform = 'social media';
            
            if (iconClass.includes('facebook')) platform = 'Facebook';
            else if (iconClass.includes('twitter') || iconClass.includes('x-fill')) platform = 'Twitter/X';
            else if (iconClass.includes('instagram')) platform = 'Instagram';
            else if (iconClass.includes('linkedin')) platform = 'LinkedIn';
            
            showNotification(`${platform} page will open soon!`, 'info');
        });
    });

    // ======================================
    // UTILITY FUNCTIONS
    // ======================================
    
    // Email validation function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 300px;
                word-wrap: break-word;
            `;
            document.body.appendChild(notification);
        }

        // Set notification style based on type
        const colors = {
            'success': '#4CAF50',
            'error': '#f44336',
            'info': '#2196F3',
            'warning': '#ff9800'
        };

        notification.style.backgroundColor = colors[type] || colors.info;
        notification.textContent = message;
        
        // Show notification
        notification.style.transform = 'translateX(0)';
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
        }, 3000);
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Initialize smooth scrolling
    initSmoothScrolling();

    // ======================================
    // ERROR HANDLING
    // ======================================
    
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.error);
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });

    console.log('Home page JavaScript loaded successfully!');
});