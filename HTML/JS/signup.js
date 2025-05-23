document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const chakriText = document.querySelector('.chakri-text');
    const signupForm = document.querySelector('.signup-form');
    const signupFormContent = document.querySelector('.signup-form-content');
    const bgAnimation = document.querySelector('.bg-animation');
    
    // Starting animation sequence - precisely timed for smooth flow
    setTimeout(() => {
        // 1. First show the CHAKRI text with letter-by-letter animation (already in CSS)
        
        // 2. After the letters appear, move the CHAKRI text to the top
        setTimeout(() => {
            chakriText.style.animation = 'moveLogoUp 1.5s ease-out forwards';
            
            // 3. After CHAKRI starts moving up, begin the purple background expansion
            setTimeout(() => {
                bgAnimation.style.animation = 'expandBg 1.5s ease-out forwards';
                
                // 4. As background expands to full screen, change CHAKRI text color to white
                setTimeout(() => {
                    chakriText.style.color = 'white';
                    chakriText.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)';
                    
                    // 5. ONLY after text has moved up and purple background is expanding, make the signup form visible
                    signupForm.style.visibility = 'visible';
                }, 500);
                
                // 6. ONLY after purple background is fully expanded, fade in the signup form
                setTimeout(() => {
                    signupForm.style.opacity = '1';
                    signupForm.style.transform = 'scale(1)';
                }, 1500); // Wait for background to fully expand
            }, 800); // Start background expansion slightly after text starts moving
        }, 1000); // Wait for letters to appear before moving the text up
    }, 100);
    
    // Handle signup form submission
    const signupFormElement = document.getElementById('signup-form');
    signupFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate password match
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Add your signup logic here
        console.log('Signup attempted');
        
        // For demonstration purposes, redirect to login page after 1 second
        setTimeout(() => {
            alert('Signup successful! Please login with your new credentials.');
            window.location.href = 'login.html';
        }, 1000);
    });
    
    // Add ripple effect to signup button on click
    const signupButton = document.getElementById('signup-button');
    const buttonAnimation = document.querySelector('.button-animation');
    
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
});