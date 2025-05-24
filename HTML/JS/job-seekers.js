document.addEventListener('DOMContentLoaded', function() {
    console.log('Job Seekers page loaded successfully!');

    // ======================================
    // EXPLORE DROPDOWN FUNCTIONALITY
    // ======================================
    
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

    // ======================================
    // HERO COUNTER ANIMATIONS
    // ======================================
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target === 98) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    // Initialize counters when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target, 2500);
                });
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // ======================================
    // FLOATING CARDS INTERACTION
    // ======================================
    
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.1) translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
        
        card.addEventListener('click', function() {
            const jobType = this.querySelector('span').textContent;
            showNotification(`Searching for ${jobType} positions...`, 'info');
            setTimeout(() => {
                window.location.href = `browse-jobs.html?search=${encodeURIComponent(jobType)}`;
            }, 1000);
        });
    });

    // ======================================
    // FEATURE CARDS ENHANCED INTERACTIONS
    // ======================================
    
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        // Magnetic effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `perspective(1000px) rotateX(${deltaY * 5}deg) rotateY(${deltaX * 5}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Click animation
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.feature-btn')) {
                const ripple = document.createElement('div');
                ripple.className = 'ripple-effect';
                ripple.style.cssText = `
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: rgba(81, 45, 168, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    left: ${e.offsetX - 10}px;
                    top: ${e.offsetY - 10}px;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ======================================
    // SUCCESS STORIES SLIDER
    // ======================================
    
    const storyCards = document.querySelectorAll('.story-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Hide all slides
        storyCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                setTimeout(() => {
                    card.classList.add('active');
                }, 100);
            }
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % storyCards.length;
        showSlide(nextIndex);
    }
    
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlider();
            startSlider();
        });
    });
    
    // Hover pause
    const sliderContainer = document.querySelector('.stories-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlider);
        sliderContainer.addEventListener('mouseleave', startSlider);
        startSlider();
    }
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe right - previous slide
                const prevIndex = currentSlide === 0 ? storyCards.length - 1 : currentSlide - 1;
                showSlide(prevIndex);
            } else {
                // Swipe left - next slide
                nextSlide();
            }
            stopSlider();
            startSlider();
        }
    }

    // ======================================
    // SCROLL ANIMATIONS & REVEAL EFFECTS
    // ======================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add stagger effect for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const cards = Array.from(document.querySelectorAll('.feature-card'));
                    const index = cards.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for reveal animation
    const revealElements = document.querySelectorAll('.feature-card, .section-header, .story-card, .cta-content');
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
        revealObserver.observe(el);
    });

    // ======================================
    // PARTICLE BACKGROUND EFFECT
    // ======================================
    
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particleContainer);
        
        for (let i = 0; i < 50; i++) {
            createParticle(particleContainer);
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const opacity = Math.random() * 0.5 + 0.1;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(81, 45, 168, ${opacity});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${duration}s infinite linear;
        `;
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            particle.remove();
            createParticle(container);
        }, duration * 1000);
    }
    
    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Initialize particles
    createParticles();

    // ======================================
    // PARALLAX SCROLLING EFFECTS
    // ======================================
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg-animation, .floating-elements');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Parallax for floating cards
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = scrolled * speed;
            card.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Throttled scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleParallax();
            ticking = false;
        });
        ticking = true;
    }
});

    // ======================================
    // ENHANCED BUTTON INTERACTIONS
    // ======================================
    
    const featureButtons = document.querySelectorAll('.feature-btn');
    featureButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Button press animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show loading state
            const originalText = this.querySelector('span').textContent;
            const icon = this.querySelector('i');
            
            this.querySelector('span').textContent = 'Loading...';
            icon.className = 'ri-loader-4-line';
            icon.style.animation = 'spin 1s linear infinite';
            
            // Simulate page transition
            setTimeout(() => {
                window.location.href = this.href;
            }, 1500);
        });
    });
    
    // Add spin animation for loading icon
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);

    // ======================================
    // CTA BUTTONS INTERACTION
    // ======================================
    
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create success ripple
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.3);
                border-radius: inherit;
                transform: scale(0);
                animation: successRipple 0.6s ease-out;
                top: 0;
                left: 0;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                window.location.href = this.href;
            }, 600);
        });
    });
    
    // Add success ripple animation
    const successRippleStyle = document.createElement('style');
    successRippleStyle.textContent = `
        @keyframes successRipple {
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(successRippleStyle);

    // ======================================
    // NEWSLETTER SUBSCRIPTION
    // ======================================
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const button = this.querySelector('button');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Animate button
                button.textContent = 'Subscribing...';
                button.style.background = 'var(--success)';
                
                setTimeout(() => {
                    button.textContent = 'Subscribed!';
                    emailInput.value = '';
                    showNotification('Successfully subscribed to our newsletter!', 'success');
                    
                    setTimeout(() => {
                        button.textContent = 'Subscribe';
                        button.style.background = '';
                    }, 2000);
                }, 1500);
            } else {
                showNotification('Please enter a valid email address', 'error');
                emailInput.style.borderColor = 'var(--error)';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 2000);
            }
        });
    }

    // ======================================
    // SOCIAL MEDIA INTERACTIONS
    // ======================================
    
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
            
            // Bounce animation
            this.style.animation = 'bounce 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            showNotification(`Opening ${platform}...`, 'info');
        });
    });
    
    // Add bounce animation
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(bounceStyle);

    // ======================================
    // UTILITY FUNCTIONS
    // ======================================
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
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
                border-radius: var(--border-radius-sm);
                color: white;
                font-weight: 600;
                z-index: 10000;
                transform: translateX(400px);
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                max-width: 350px;
                word-wrap: break-word;
                box-shadow: var(--box-shadow-lg);
            `;
            document.body.appendChild(notification);
        }

        const colors = {
            'success': 'var(--success)',
            'error': 'var(--error)',
            'info': 'var(--primary)',
            'warning': 'var(--warning)'
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

    // ======================================
    // KEYBOARD SHORTCUTS
    // ======================================
    
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search (if implemented)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showNotification('Quick search coming soon!', 'info');
        }
        
        // Arrow keys for slider navigation
        if (e.key === 'ArrowLeft') {
            const prevIndex = currentSlide === 0 ? storyCards.length - 1 : currentSlide - 1;
            showSlide(prevIndex);
            stopSlider();
            startSlider();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopSlider();
            startSlider();
        }
    });

    // Log initialization
    console.log('Job Seekers page fully initialized with all interactive features!');
});