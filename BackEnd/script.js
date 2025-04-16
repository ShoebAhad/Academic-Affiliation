document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Enhanced image handling and fallbacks
    function handleImages() {
        // Handle course images with img tags
        const courseImages = document.querySelectorAll('.course-image img');
        
        courseImages.forEach(img => {
            // Add error handler for each image
            img.addEventListener('error', function() {
                console.log(`Image failed to load: ${this.src}`);
                
                // Get course name from alt attribute or parent course card
                let courseName = this.alt;
                if (!courseName) {
                    const courseCard = this.closest('.course-card');
                    if (courseCard) {
                        const courseTitle = courseCard.querySelector('h3');
                        if (courseTitle) {
                            courseName = courseTitle.textContent;
                        } else {
                            courseName = "Course Image";
                        }
                    }
                }
                
                // Try to load the same image from backup location or use placeholder
                if (this.src.includes('BackEnd/images/')) {
                    // Try alternate path
                    this.src = this.src.replace('BackEnd/images/', 'images/');
                } else {
                    // Use placeholder with course name
                    this.src = `https://via.placeholder.com/350x200?text=${encodeURIComponent(courseName)}`;
                }
            });
            
            // Force reload of images to trigger error handlers if needed
            const currentSrc = img.src;
            if (currentSrc.includes("'.jpg")) {
                // Fix obviously wrong image path
                img.src = "BackEnd/images/data.jpeg";
            } else {
                // Force reload of other images
                img.src = currentSrc;
            }
        });
        
        // Handle CSS background images
        const cssBgImages = document.querySelectorAll('.ai-img, .latex-img, .excel-img, .python-img, .ai-advanced-img, .data-science-img, .web-dev-img, .academic-writing-img, .r-programming-img');
        
        // For CSS background images, we want to make sure they're loading properly
        // We can't directly check if they're loading, but we can add a class to indicate they're processed
        cssBgImages.forEach(el => {
            el.classList.add('image-processed');
        });
    }
    
    // Run image handler
    handleImages();
    
    // Course Filters
    const courseSearch = document.getElementById('course-search');
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');
    const priceFilter = document.getElementById('price-filter');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (courseSearch && courseCards.length > 0) {
        const filterCourses = () => {
            const searchTerm = courseSearch.value.toLowerCase();
            const category = categoryFilter ? categoryFilter.value : '';
            const level = levelFilter ? levelFilter.value : '';
            const price = priceFilter ? priceFilter.value : '';
            
            courseCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const cardCategory = card.getAttribute('data-category');
                const cardLevel = card.getAttribute('data-level');
                const cardPrice = card.getAttribute('data-price');
                
                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
                const matchesCategory = category === '' || cardCategory === category;
                const matchesLevel = level === '' || cardLevel === level;
                const matchesPrice = price === '' || cardPrice === price;
                
                if (matchesSearch && matchesCategory && matchesLevel && matchesPrice) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };
        
        courseSearch.addEventListener('input', filterCourses);
        if (categoryFilter) categoryFilter.addEventListener('change', filterCourses);
        if (levelFilter) levelFilter.addEventListener('change', filterCourses);
        if (priceFilter) priceFilter.addEventListener('change', filterCourses);
    }
    
    // Review Filters
    const courseFilter = document.getElementById('course-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const reviewCards = document.querySelectorAll('.review-card');
    
    if (courseFilter && ratingFilter && reviewCards.length > 0) {
        const filterReviews = () => {
            const course = courseFilter.value;
            const rating = ratingFilter.value;
            
            reviewCards.forEach(card => {
                const cardCourse = card.getAttribute('data-course');
                const cardRating = card.getAttribute('data-rating');
                
                const matchesCourse = course === '' || cardCourse === course;
                const matchesRating = rating === '' || cardRating === rating;
                
                if (matchesCourse && matchesRating) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };
        
        courseFilter.addEventListener('change', filterReviews);
        ratingFilter.addEventListener('change', filterReviews);
    }
    
    // Auth Tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    if (authTabs.length > 0 && authForms.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and forms
                authTabs.forEach(t => t.classList.remove('active'));
                authForms.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding form
                tab.classList.add('active');
                document.getElementById(`${target}-form`).classList.add('active');
            });
        });
    }
    
    // Premium Course Enrollment Modal
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    const enrollmentModal = document.getElementById('enrollment-modal');
    
    if (enrollButtons.length > 0 && enrollmentModal) {
        enrollButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const course = button.getAttribute('data-course');
                const courseTitle = button.closest('.premium-details').querySelector('h3').textContent;
                const coursePrice = button.closest('.premium-price-section').querySelector('.premium-price').textContent;
                
                document.getElementById('course-title').textContent = courseTitle;
                document.getElementById('selected-course').textContent = courseTitle;
                document.getElementById('course-price').textContent = coursePrice;
                
                enrollmentModal.style.display = 'block';
            });
        });
        
        // Close modal
        const closeModal = document.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                enrollmentModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === enrollmentModal) {
                enrollmentModal.style.display = 'none';
            }
        });
    }
    
    // Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    const reviewForm = document.getElementById('review-form');
    const newsletterForm = document.getElementById('newsletter-form');
    const enrollmentForm = document.getElementById('enrollment-form');
    const notificationForm = document.getElementById('notification-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Generic form submission handler with validation
    const handleFormSubmit = (form, successMessage) => {
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                const formGroup = input.closest('.form-group');
                
                if (!input.value.trim()) {
                    isValid = false;
                    formGroup.classList.add('error');
                    
                    // Add error message if doesn't exist
                    if (!formGroup.querySelector('.error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        formGroup.appendChild(errorMsg);
                    }
                } else {
                    formGroup.classList.remove('error');
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value)) {
                        isValid = false;
                        formGroup.classList.add('error');
                        
                        const errorMsg = formGroup.querySelector('.error-message') || document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'Please enter a valid email address';
                        
                        if (!formGroup.querySelector('.error-message')) {
                            formGroup.appendChild(errorMsg);
                        }
                    }
                }
            });
            
            if (isValid) {
                // In a real application, you would send the data to the server here
                
                // Show success message
                alert(successMessage);
                
                // Reset the form
                form.reset();
                
                // Close modal if it's the enrollment form
                if (form === enrollmentForm && enrollmentModal) {
                    enrollmentModal.style.display = 'none';
                }
            }
        });
    };
    
    // Initialize form handlers
    handleFormSubmit(contactForm, 'Your message has been sent successfully! We will get back to you soon.');
    handleFormSubmit(reviewForm, 'Thank you for your review! It has been submitted successfully.');
    handleFormSubmit(newsletterForm, 'You have successfully subscribed to our newsletter!');
    handleFormSubmit(enrollmentForm, 'You have successfully enrolled in the course! Check your email for payment details.');
    handleFormSubmit(notificationForm, 'You have successfully subscribed to our notifications!');
    handleFormSubmit(loginForm, 'Login successful! Redirecting to dashboard...');
    handleFormSubmit(registerForm, 'Registration successful! Please check your email to verify your account.');
    
    // Load More Reviews
    const loadMoreBtn = document.querySelector('.load-more button');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real application, you would fetch more reviews from the server
            // For demonstration, let's just clone existing reviews
            const reviewsList = document.querySelector('.reviews-list');
            const reviews = document.querySelectorAll('.review-card');
            
            if (reviews.length > 0) {
                // Clone the first review and append it
                const newReview = reviews[0].cloneNode(true);
                reviewsList.appendChild(newReview);
                
                // Clone the second review and append it
                if (reviews.length > 1) {
                    const newReview2 = reviews[1].cloneNode(true);
                    reviewsList.appendChild(newReview2);
                }
            }
            
            // Hide the button after loading more reviews
            this.style.display = 'none';
        });
    }
    
    // Check image paths and modify if needed
    function checkImagePaths() {
        console.log("Checking image paths...");
        
        // Create a list of all images that should be checked
        const imagesToCheck = [
            { name: "ai-course", selector: 'img[alt="Introduction to AI"]' },
            { name: "latex-course", selector: 'img[alt="LaTeX for Beginners"]' },
            { name: "excel-course", selector: 'img[alt="Excel for Data Analysis"]' },
            { name: "ai-advanced-course", selector: 'img[alt="Advanced AI and Machine Learning"]' },
            { name: "python-course", selector: 'img[alt="Python Programming for Non-CS Students"]' },
            { name: "data-science-course", selector: 'img[alt="Data Science Fundamentals"]' },
            { name: "web-dev-course", selector: 'img[alt="Web Development Basics"]' },
            { name: "academic-writing-course", selector: 'img[alt="Advanced Academic Writing with LaTeX"]' },
            { name: "r-programming-course", selector: 'img[alt="R Programming for Research"]' }
        ];
        
        // Check each image
        imagesToCheck.forEach(item => {
            const imgElement = document.querySelector(item.selector);
            if (imgElement) {
                // Check if the current src is valid
                const testImg = new Image();
                testImg.onload = function() {
                    console.log(`Image ${item.name} loaded successfully from: ${imgElement.src}`);
                };
                testImg.onerror = function() {
                    console.log(`Image ${item.name} failed to load from: ${imgElement.src}`);
                    
                    // Try different paths
                    const possiblePaths = [
                        `BackEnd/images/${item.name}.jpg`,
                        `BackEnd/images/${item.name}.jpeg`,
                        `BackEnd/images/data.jpeg`,
                        `images/${item.name}.jpg`,
                        `images/${item.name}.jpeg`,
                        `https://via.placeholder.com/350x200?text=${encodeURIComponent(imgElement.alt)}`
                    ];
                    
                    // Try first path from our list that's not the current one
                    for (const path of possiblePaths) {
                        if (path !== imgElement.src) {
                            console.log(`Trying alternative path for ${item.name}: ${path}`);
                            imgElement.src = path;
                            break;
                        }
                    }
                };
                testImg.src = imgElement.src;
            }
        });
    }
    
    // Fix any broken background images in CSS
    function fixBackgroundImages() {
        // For items using CSS background images
        const cssImageItems = [
            { className: 'ai-img', fallbackImage: 'BackEnd/images/data.jpeg' },
            { className: 'latex-img', fallbackImage: 'BackEnd/images/data.jpeg' },
            { className: 'excel-img', fallbackImage: 'BackEnd/images/data.jpeg' },
        ];
        
        cssImageItems.forEach(item => {
            const elements = document.querySelectorAll(`.${item.className}`);
            elements.forEach(el => {
                if (getComputedStyle(el).backgroundImage === 'none' || 
                    getComputedStyle(el).backgroundImage === '') {
                    // Background image isn't loading, use inline style with fallback
                    el.style.backgroundImage = `url('${item.fallbackImage}')`;
                }
            });
        });
    }
    
    // Run our image fixer functions after a short delay to allow initial loading
    setTimeout(() => {
        checkImagePaths();
        fixBackgroundImages();
    }, 500);
});