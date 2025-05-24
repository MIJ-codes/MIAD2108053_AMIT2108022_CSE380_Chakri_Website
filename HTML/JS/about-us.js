// Custom animation system - no external libraries needed
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Animated number counters
    initCounters();
    
    // Timeline progress animation
    initTimeline();
    
    // Team member 3D tilt effect
    initTeamTilt();
    
    // Value cards animation
    initValueCards();
    
    // Button hover effects
    initButtonEffects();
    
    // Smooth scroll for the scroll indicator
    initSmoothScroll();
    
    // Parallax effect
    initParallax();
    
    // NEW: Add ripple effect to the About Us menu item
    initAboutUsRipple();
});

// Add ripple effect to the About Us menu item
function initAboutUsRipple() {
    const aboutUsItem = document.getElementById('aboutus');
    
    if (aboutUsItem && aboutUsItem.classList.contains('selected')) {
        // Add ripple effect on click
        aboutUsItem.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('header-ripple');
            
            // Ensure position is set for proper ripple positioning
            if (getComputedStyle(this).position === 'static') {
                this.style.position = 'relative';
            }
            
            // Set ripple position
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            // Add ripple to element
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

// Custom animation system
function initAnimations() {
    // Get all elements that need animation
    const animElements = document.querySelectorAll('.anim-fade-up, .anim-fade-down, .anim-fade-left, .anim-fade-right, .anim-zoom-in, .anim-flip');
    
    // Create observer for animation elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                // Optional: stop observing after animation is triggered
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove the class when element is out of view
                // entry.target.classList.remove('anim-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all animation elements
    animElements.forEach(element => {
        observer.observe(element);
    });
}

// Number counter animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                
                const updateCount = () => {
                    const increment = target / speed;
                    
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Timeline progress animation
function initTimeline() {
    const timelineProgress = document.querySelector('.timeline-progress');
    
    if (timelineProgress) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        timelineProgress.style.height = '100%';
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(timelineProgress);
    }
}

// Team member 3D tilt effect
function initTeamTilt() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mousemove', (e) => {
            const cardRect = member.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = -(x - centerX) / 10;
            
            member.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            setTimeout(() => {
                member.style.transition = '';
            }, 300);
        });
    });
}

// Value cards animation
function initValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.value-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotateY(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.value-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotateY(0)';
            }
        });
    });
}

// Button hover effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
            button.style.boxShadow = '0 10px 25px rgba(81, 45, 168, 0.4)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
    });
}

// Smooth scroll for the scroll indicator
function initSmoothScroll() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const missionSection = document.querySelector('.mission');
            if (missionSection) {
                missionSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Parallax effect
function initParallax() {
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
}