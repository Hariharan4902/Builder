// =========================================================================
// JS/MAIN.JS - CONSOLIDATED, CORRECTED, AND COMPLETE CODE
// Includes: Navbar, Mobile Menu (FIXED SCROLLING), Modal, Services, Projects Filter, Carousel
// =========================================================================

document.addEventListener('DOMContentLoaded', function () {

    // --- Global Element Selectors & Initial Setup ---
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown-container');
    const currentYearSpan = document.getElementById('currentYear');

    // Set current year in footer (if the element exists)
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    // =========================================================================
    // 1. STICKY HEADER LOGIC
    // =========================================================================
    let scrollTimeout;
    function stickyHeaderOnScroll() {
        if (!navbar) return;
        if (scrollTimeout) return;

        scrollTimeout = setTimeout(() => {
            if (window.scrollY >= 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            scrollTimeout = null;
        }, 10);
    }

    window.addEventListener('scroll', stickyHeaderOnScroll, { passive: true });
    stickyHeaderOnScroll(); // Run once on load


    // =========================================================================
    // 2. MOBILE MENU TOGGLE LOGIC (SCROLLING FIX APPLIED)
    // (KEEPING YOUR EXISTING CODE FOR MENU TOGGLE)
    // =========================================================================
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');

            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';

                dropdowns.forEach(container => {
                    container.classList.remove('active');
                });
            }
        });
    }

    // --- Mobile Dropdown Functionality (FIXED CLOSING ISSUE) ---
    dropdowns.forEach(container => {
        const dropbtn = container.querySelector('.dropbtn');

        dropbtn.addEventListener('click', function (e) {
            // Only run this logic for mobile view when the main menu is active
            if (window.innerWidth <= 768 && navLinks && navLinks.classList.contains('active')) {
                e.preventDefault();
                e.stopPropagation();

                // Determine if we are closing the current one
                const isClosing = container.classList.contains('active');

                // Close all other dropdowns
                dropdowns.forEach(otherContainer => {
                    if (otherContainer !== container) {
                        otherContainer.classList.remove('active');
                    }
                });

                // Toggle the 'active' class on the clicked container.
                // If it was already active (isClosing=true), it will be removed (closed).
                // If it was inactive, it will be added (opened).
                container.classList.toggle('active');
            }
        });
    });
    // (KEEPING YOUR EXISTING CODE FOR CLOSING ON OUTSIDE CLICK AND RESIZE)
    // ...

    // --- Close Mobile Menu on Outside Click and Resize ---
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 && navLinks && menuToggle) {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                dropdowns.forEach(container => container.classList.remove('active'));
                document.body.style.overflow = '';
            }
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navLinks && menuToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });


    // =========================================================================
    // 3. ENQUIRY MODAL LOGIC (Body overflow lock IS KEPT here)
    const modal = document.getElementById('enquiryModal');
    const showModalBtn = document.getElementById('showModalBtn');
    const showHeroEnquiryBtn = document.getElementById('showHeroEnquiryBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const form = document.getElementById('enquiryForm');
    const formFields = document.getElementById('formFields');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');
    const modalFooter = document.getElementById('modalFooter');

    // WhatsApp number (with country code)
    const whatsappNumber = '918220341934';

    function resetForm() {
        if (form) form.reset();
        if (successMessage) successMessage.classList.add('hidden');
        if (formFields) formFields.classList.remove('hidden');
        if (modalFooter) modalFooter.classList.remove('hidden');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit';
            submitBtn.onclick = null;
        }
    }

    function openModal() {
        resetForm();
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        modal.setAttribute('aria-hidden', 'true');
        resetForm();
    }

    // Open modal for both buttons
    if (showModalBtn) showModalBtn.addEventListener('click', openModal);
    if (showHeroEnquiryBtn) showHeroEnquiryBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    // Form submit
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const location = document.getElementById('location').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !phone || !email || !location || !message) {
                alert('Please fill all required fields correctly!');
                return;
            }

            const whatsappMsg = `I would like to enquire about your services.%0A👤 Name: ${name}%0A📞 Phone: ${phone}%0A📧 Email: ${email}%0A📍 Location: ${location}%0A📝 Message: ${message}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

            // Open WhatsApp chat in new tab
            window.open(whatsappUrl, '_blank');

            // Show success message and disable submit button
            formFields.classList.add('hidden');
            successMessage.classList.remove('hidden');

            submitBtn.disabled = true;
            submitBtn.textContent = 'Message Sent ✔️';
        });
    }

    // =========================================================================
    // 4. SERVICES HOVER LOGIC (Image Swap)
    // =========================================================================
    const serviceItems = document.querySelectorAll('.service-item');
    const imageWrapper = document.querySelector('.pro-worker-image-wrapper');
    const defaultImage = "images/builderimages/image1.jpg"; // Set a default image

    if (imageWrapper) {
        // Set the default image on load
        imageWrapper.style.backgroundImage = `url('${defaultImage}')`;
    }

    serviceItems.forEach((item, index) => {
        item.addEventListener("mouseenter", () => {
            const imageUrl = item.getAttribute("data-hover-image");
            if (imageWrapper && imageUrl) {
                imageWrapper.style.backgroundImage = `url('${imageUrl}')`;

                // Animation logic: Clear old classes and add new one
                imageWrapper.className = "pro-worker-image-wrapper";
                switch (index % 3) { // Use modulo for cyclical animation
                    case 0:
                        imageWrapper.classList.add("slide-in-elliptic-bottom-fwd");
                        break;
                    case 1:
                        imageWrapper.classList.add("slide-in-elliptic-right-bck");
                        break;
                    case 2:
                        imageWrapper.classList.add("slide-in-elliptic-left-fwd");
                        break;
                }
            }
            serviceItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });

        item.addEventListener("mouseleave", () => {
            item.classList.remove('active');
            // Reset to default image on mouseleave
            if (imageWrapper) {
                imageWrapper.style.backgroundImage = `url('${defaultImage}')`;
                imageWrapper.className = "pro-worker-image-wrapper"; // reset animation
            }
        });
    });


    // =========================================================================
    // 5. PROJECT FILTER LOGIC (MODIFIED for Roll-In + Rotate-Scale-Up)
    // =========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                item.classList.remove('bounce-in-top'); // remove old animation

                if (filterValue === 'all' || (category && category.includes(filterValue))) {
                    // Show item with bounce animation
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.classList.add('bounce-in-top');
                    }, 10);
                } else {
                    // Hide item smoothly
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });


    // =========================================================================
    // 6. WHAT WE DO (CAROUSEL) LOGIC
    // =========================================================================
    const cardsContainer = document.querySelector('.cards-container');
    const cards = document.querySelector('.cards');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    if (cardsContainer && cards) {
        let currentIndex = 0;
        let cardWidth = 0;
        let cardsPerView = 1;
        let totalSlides = 1;
        let autoSlideInterval;

        function initializeSlider() {
            const allCards = document.querySelectorAll(".card");
            const card = allCards[0];
            if (!card) return;

            cardWidth = card.offsetWidth + 30; // spacing
            cardsPerView = Math.max(1, Math.floor(cardsContainer.offsetWidth / cardWidth));
            totalSlides = Math.ceil(allCards.length / cardsPerView);

            updateDots();
            goToSlide(currentIndex, false);
            startAutoSlide();
        }

        function updateDots() {
            const dotsContainer = document.querySelector(".slider-dots");
            if (!dotsContainer) return;
            dotsContainer.innerHTML = "";

            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement("span");
                dot.classList.add("slider-dot");
                if (i === currentIndex) dot.classList.add("active");
                dot.dataset.index = i;
                dot.addEventListener("click", () => {
                    goToSlide(i);
                    restartAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }

        function goToSlide(index, animate = true) {
            if (totalSlides === 0) return;
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            currentIndex = index;
            const translateX = -currentIndex * cardWidth * cardsPerView;

            if (animate) {
                addCardBounceEffect();
            }

            cards.style.transform = `translateX(${translateX}px)`;
            document.querySelectorAll(".slider-dot").forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
            });
        }

        function addCardBounceEffect() {
            document.querySelectorAll(".card").forEach((card, i) => {
                const delay = (i % 3) * 80;
                setTimeout(() => {
                    card.classList.add("bounce-tilt");
                }, delay);
                setTimeout(() => {
                    card.classList.remove("bounce-tilt");
                }, 900);
            });
        }

        if (prevArrow) {
            prevArrow.addEventListener("click", () => {
                goToSlide(currentIndex - 1);
                restartAutoSlide();
            });
        }

        if (nextArrow) {
            nextArrow.addEventListener("click", () => {
                goToSlide(currentIndex + 1);
                restartAutoSlide();
            });
        }

        function startAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 4000);
        }

        function restartAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        cardsContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        cardsContainer.addEventListener('mouseleave', startAutoSlide);

        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => initializeSlider(), 250);
        });

        initializeSlider();
    }




});



// =========================================================================
// BLOG POST STAGGERED ANIMATION LOGIC (Add to main.js)
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the blog page by looking for the posts
    const blogPosts = document.querySelectorAll('.blog-post');

    if (blogPosts.length === 0) return; // Exit if not on the blog page

    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const post = entry.target;

                // Find the index of the post to calculate the delay
                const index = Array.from(blogPosts).indexOf(post);

                // Calculate staggered delay: index * 150ms
                const delay = index * 150;

                // Apply the animation class with a staggered delay
                setTimeout(() => {
                    // Make the post visible (opacity: 1) and start the animation
                    post.classList.add('anim-slide-fwd-center');

                    // Set delay for the staggered effect
                    post.style.animationDelay = `${delay}ms`;

                    // IMPORTANT: The element must be rendered *before* the animation 
                    // starts for the delay to take effect, but the 'opacity: 0' 
                    // in the base CSS handles the initial hiding well. 
                    // The 'both' in the CSS animation definition will handle 
                    // the final opacity state.

                }, 0);

                // Stop observing the post once it has animated
                observer.unobserve(post);
            }
        });
    }, observerOptions);

    // Observe each blog post
    blogPosts.forEach(post => {
        observer.observe(post);
    });
});
// (Keep your existing Navbar, Enquiry Modal, and Project Filter JS code below this)