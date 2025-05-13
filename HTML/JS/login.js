document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const loginText = document.querySelector('.login-text');
    const loginForm = document.querySelector('.login-form');
    const loginFormContent = document.querySelector('.login-form-content');
    const signupFormContainer = document.querySelector('.signup-form-container');
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
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
    
    // Handle signup form submission
    const signupFormElement = document.getElementById('signup-form');
    signupFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your signup logic here
        console.log('Signup attempted');
        // For demonstration purposes, redirect to home page after 1 second
        setTimeout(() => {
            alert('Signup successful!');
            // window.location.href = 'index.html';
        }, 1000);
    });
    
    // Add ripple effect to login button on click
    const loginButton = document.getElementById('login-button');
    const buttonAnimation = document.querySelector('.button-animation');
    
    loginButton.addEventListener('click', createRippleEffect);
    
    // Add ripple effect to signup button
    const signupButton = document.getElementById('signup-button');
    signupButton.addEventListener('click', createRippleEffect);
    
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
    
    // Handle signup link click - carefully sequenced transition
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 1. First fade out login form content
        loginFormContent.style.opacity = '0';
        
        setTimeout(() => {
            // 2. Hide login content completely
            loginFormContent.style.display = 'none';
            
            // 3. Start expanding the white login form to full screen
            loginForm.classList.add('expand');
            
            // 4. Move the CHAKRI text further up and make it smaller
            loginText.style.animation = 'moveLogoUpFurther 1s ease-out forwards';
            
            // 5. As it expands and passes the CHAKRI text, change text color to black
            setTimeout(() => {
                // Critical: Change CHAKRI text from white to black as the white background passes it
                loginText.style.color = '#333';
                loginText.style.textShadow = 'none';
                
                // 6. After full expansion, show the signup form
                setTimeout(() => {
                    signupFormContainer.classList.add('show');
                }, 600);
            }, 400);
        }, 500);
    });
    
    // Handle login link click - improved timing for smoother transition back to login
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 1. Hide signup form first
        signupFormContainer.classList.remove('show');
        
        // 2. Wait for signup form to disappear
        setTimeout(() => {
            // 3. Move CHAKRI text up to make room for the login form - do this BEFORE contracting the background
            loginText.style.animation = 'moveLogoUp 1.2s ease-out forwards';
            
            // 4. Wait for the CHAKRI text animation to complete before contracting the white background
            setTimeout(() => {
                // 5. Begin contracting the white background ONLY after text has moved up
                loginForm.classList.remove('expand');
                
                // 6. Change CHAKRI text back to white as background contracts
                setTimeout(() => {
                    loginText.style.color = 'white';
                    loginText.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)';
                }, 300);
                
                // 7. Show login form content after white background contracts
                setTimeout(() => {
                    loginFormContent.style.display = 'block';
                    // Ensure opacity transition is smooth
                    setTimeout(() => {
                        loginFormContent.style.opacity = '1';
                    }, 300);
                }, 900); // Increased timing to wait for contraction
            }, 600); // Wait for CHAKRI text to move up before contracting
        }, 500); // Wait for signup form to disappear
    });
});