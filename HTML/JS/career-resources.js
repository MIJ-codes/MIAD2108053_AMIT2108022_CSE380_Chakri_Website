// Initialize all animations and interactive elements when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Career Resources page loaded successfully!');
    
    // Initialize animations
    initAnimations();
    
    // Initialize header effects and explore dropdown
    initHeaderEffects();
    
    // Initialize resource slider
    initResourceSlider();
    
    // Initialize category cards
    initCategoryCards();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize scroll behavior
    initSmoothScroll();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize floating elements
    initFloatingElements();
});

// Custom animation system for elements entering viewport
function initAnimations() {
    // Get all elements that need animation
    const animElements = document.querySelectorAll('.anim-fade-up, .anim-fade-down, .anim-fade-left, .anim-fade-right, .anim-zoom-in, .anim-flip');
    
    // Create IntersectionObserver for animation elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                // Optional: stop observing after animation is triggered
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove the class when element is out of view for repeating animations
                // entry.target.classList.remove('anim-visible');
            }
        });
    }, {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Adjust rootMargin to trigger animations earlier or later
    });
    
    // Observe all animation elements
    animElements.forEach(element => {
        observer.observe(element);
    });
}

// Handle header effects including the explore dropdown functionality
function initHeaderEffects() {
    // Explore dropdown functionality
    const exploreDropdown = document.getElementById('explore');
    if (exploreDropdown) {
        // Ensure the selected class is applied
        exploreDropdown.classList.add('selected');
        
        // Toggle dropdown on click
        const dropdownLink = exploreDropdown.querySelector('a');
        const dropdownMenu = exploreDropdown.querySelector('.explore-dropdown');
        
        if (dropdownLink && dropdownMenu) {
            // Toggle dropdown on click
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                exploreDropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!exploreDropdown.contains(e.target)) {
                    exploreDropdown.classList.remove('active');
                }
            });
            
            // Prevent clicks inside dropdown from closing it
            dropdownMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Close dropdown with ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    exploreDropdown.classList.remove('active');
                }
            });
        }
    }
    
    // Add ripple effect on click for menu items
    const menuItems = document.querySelectorAll('.writing > div');
    menuItems.forEach(item => {
        item.addEventListener('click', createRippleEffect);
    });
}

// Create ripple effect when clicking on header items
function createRippleEffect(e) {
    // Ensure we're not creating ripples for link clicks
    if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
        return;
    }
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('header-ripple');
    
    // Ensure position is set for proper ripple positioning
    if (getComputedStyle(this).position === 'static') {
        this.style.position = 'relative';
    }
    
    // Set ripple position based on click location
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const radius = size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - radius}px`;
    ripple.style.top = `${e.clientY - rect.top - radius}px`;
    
    // Add ripple to element
    this.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize the resource slider functionality
function initResourceSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const cardWidth = document.querySelector('.resource-card').offsetWidth + 30; // Card width + margin
    
    let currentIndex = 0;
    const totalSlides = document.querySelectorAll('.resource-card').length;
    let slidesToShow = getSlidesToShow();
    
    // Update slides to show based on screen width
    function getSlidesToShow() {
        if (window.innerWidth >= 1200) {
            return 4; // Show 4 cards on large screens
        } else if (window.innerWidth >= 992) {
            return 3; // Show 3 cards on medium screens
        } else if (window.innerWidth >= 768) {
            return 2; // Show 2 cards on small screens
        } else {
            return 1; // Show 1 card on extra small screens
        }
    }
    
    // Update slider on window resize
    window.addEventListener('resize', () => {
        const newSlidesToShow = getSlidesToShow();
        if (newSlidesToShow !== slidesToShow) {
            slidesToShow = newSlidesToShow;
            goToSlide(currentIndex);
        }
    });
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        
        // Ensure we don't go beyond the last slide
        if (currentIndex > totalSlides - slidesToShow) {
            currentIndex = totalSlides - slidesToShow;
        }
        
        // Ensure we don't go before the first slide
        if (currentIndex < 0) {
            currentIndex = 0;
        }
        
        // Update slider position
        sliderTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update dots
        updateDots();
    }
    
    // Update active dot
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Event listeners for previous and next buttons
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto slide functionality
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % (totalSlides - slidesToShow + 1);
            goToSlide(nextIndex);
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto sliding
    startAutoSlide();
    
    // Pause auto sliding on hover
    const sliderContainer = document.querySelector('.slider-container');
    
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

// Initialize category cards with hover animations
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.category-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.category-icon i');
            if (icon) {
                icon.style.transform = '';
            }
        });
        
        // Add click functionality to navigate to category page
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            if (category) {
                console.log(`Navigating to ${category} category`);
                // Uncomment to enable actual navigation
                // window.location.href = `${category}.html`;
                
                // Show notification
                showNotification(`Exploring ${category} resources...`, 'info');
            }
        });
    });
}

// Initialize FAQ accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other items (for accordion behavior)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// Initialize smooth scrolling for anchor links and scroll indicator
function initSmoothScroll() {
    // Smooth scroll for the scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const categoriesSection = document.querySelector('.categories-section');
            if (categoriesSection) {
                categoriesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Back to top button (if exists)
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        // Show button when user scrolls down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('resource-search');
    
    if (searchInput) {
        // Add input event listener
        searchInput.addEventListener('input', () => {
            // Get search term
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            // Log the search term (replace with actual search logic)
            console.log(`Searching for: ${searchTerm}`);
        });
        
        // Add form submission handler
        const searchForm = searchInput.closest('form') || searchInput.parentNode;
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchTerm = searchInput.value.toLowerCase().trim();
                
                if (searchTerm) {
                    // Show notification for search submission
                    showNotification(`Searching for "${searchTerm}"...`, 'info');
                    
                    // Perform search action (replace with actual implementation)
                    console.log(`Submitting search for: ${searchTerm}`);
                    // Uncomment to enable actual search results page navigation
                    // window.location.href = `search-results.html?query=${encodeURIComponent(searchTerm)}`;
                } else {
                    // Show notification for empty search
                    showNotification('Please enter a search term', 'warning');
                }
            });
        }
    }
}

// Initialize floating elements animation
function initFloatingElements() {
    // Parallax effect for background circles
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero');
        const circles = document.querySelectorAll('.circle');
        
        if (heroSection && scrollPosition < heroSection.offsetHeight) {
            circles.forEach((circle, index) => {
                const speed = 0.2 + (index * 0.1);
                circle.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        }
    });
    
    // Mouse move parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const circles = document.querySelectorAll('.circle');
            
            circles.forEach((circle, index) => {
                const speed = 0.05 + (index * 0.02);
                const x = (window.innerWidth - e.pageX * speed) / 100;
                const y = (window.innerHeight - e.pageY * speed) / 100;
                
                circle.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        });
    }
}

// Newsletter form submission handling
function initNewsletterForms() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value.trim() : '';
            
            if (email && validateEmail(email)) {
                // Show success notification
                showNotification('Successfully subscribed to our newsletter!', 'success');
                
                // Reset form
                if (emailInput) emailInput.value = '';
                
                // Checkbox reset if exists
                const checkbox = this.querySelector('input[type="checkbox"]');
                if (checkbox) checkbox.checked = false;
            } else {
                // Show error notification
                showNotification('Please enter a valid email address', 'error');
            }
        });
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show notification helper function
function showNotification(message, type = 'info') {
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 350px;
            word-wrap: break-word;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        `;
        document.body.appendChild(notification);
    }

    // Set the color based on notification type
    const colors = {
        'success': '#4caf50',
        'error': '#f44336',
        'info': '#512da8',
        'warning': '#ff9800'
    };

    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    // Show notification with bounce effect
    notification.style.transform = 'translateX(0) scale(1.05)';
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Hide after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
    }, 4000);
}