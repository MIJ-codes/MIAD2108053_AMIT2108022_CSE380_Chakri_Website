document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const loginText = document.querySelector('.login-text');
    const loginForm = document.querySelector('.login-form');
    const loginFormContent = document.querySelector('.login-form-content');
    const bgAnimation = document.querySelector('.bg-animation');
    
    // Starting animation sequence - precisely timed for smooth flow
    setTimeout(() => {
        // 1. First show the CHAKRI text with letter-by-letter animation (already in CSS)
        
        // 2. After the letters appear, move the CHAKRI text to the top
        setTimeout(() => {
            loginText.style.animation = 'moveLogoUp 1.5s ease-out forwards';
            
            // 3. After CHAKRI starts moving up, begin the purple background expansion
            setTimeout(() => {
                bgAnimation.style.animation = 'expandBg 1.5s ease-out forwards';
                
                // 4. As background expands to full screen, change CHAKRI text color to white
                setTimeout(() => {
                    loginText.style.color = 'white';
                    loginText.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)';
                    
                    // 5. ONLY after text has moved up and purple background is expanding, make the login form visible
                    // but keep it at opacity 0 so we can fade it in
                    loginForm.style.visibility = 'visible';
                }, 500);
                
                // 6. ONLY after purple background is fully expanded, fade in the login form
                setTimeout(() => {
                    loginForm.style.opacity = '1';
                    loginForm.style.transform = 'scale(1)';
                }, 1500); // Wait for background to fully expand
            }, 800); // Start background expansion slightly after text starts moving
        }, 1000); // Wait for letters to appear before moving the text up
    }, 100);
    
    // Handle login form submission
    const loginFormElement = document.getElementById('login-form');
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your login logic here
        console.log('Login attempted');
        // For demonstration purposes, redirect to home page after 1 second
        setTimeout(() => {
            alert('Login successful!');
            // window.location.href = 'index.html';
        }, 1000);
    });
    
    // Add ripple effect to login button on click
    const loginButton = document.getElementById('login-button');
    const buttonAnimation = document.querySelector('.button-animation');
    
    loginButton.addEventListener('click', createRippleEffect);
    
    // Function to create ripple effect
    function createRippleEffect(e) {
        // Trigger the button animation that was previously on hover
        if (buttonAnimation) {
            buttonAnimation.classList.add('animate');
            setTimeout(() => {
                buttonAnimation.classList.remove('animate');
            }, 800);
        }
        
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Set ripple position based on click location
        const buttonRect = this.getBoundingClientRect();
        const diameter = Math.max(buttonRect.width, buttonRect.height);
        const radius = diameter / 2;
        
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - buttonRect.left - radius}px`;
        ripple.style.top = `${e.clientY - buttonRect.top - radius}px`;
        
        // Add ripple to button
        this.appendChild(ripple);
        
        // Remove ripple element after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 800); // Match the animation duration (0.8s)
    }
});