// GETCHURNSHIELD AI - CORE JS INTERACTIVE LOGIC

document.addEventListener("DOMContentLoaded", () => {
    // --- Header Scrolled Effect ---
    const header = document.querySelector(".header");
    if (header) {
        const toggleHeaderScroll = () => {
            if (window.scrollY > 20) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };
        toggleHeaderScroll();
        window.addEventListener("scroll", toggleHeaderScroll);
    }

    // --- Dynamic Active Nav Highlight ---
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath || (currentPath === "" && href === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburgerBtn = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");
    
    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("active");
            mobileNav.classList.toggle("active");
            
            // Toggle scroll lock on body
            if (mobileNav.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });

        // Close mobile nav when clicking a link
        const mobileLinks = mobileNav.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                mobileNav.classList.remove("active");
                document.body.style.overflow = "";
            });
        });
    }

    // --- Video Lightbox Modal ---
    const videoPreviewBtn = document.querySelector(".video-preview");
    const videoModal = document.querySelector("#videoModal");
    const videoModalClose = document.querySelector("#videoModalClose");
    
    if (videoPreviewBtn && videoModal && videoModalClose) {
        videoPreviewBtn.addEventListener("click", () => {
            videoModal.classList.add("active");
            document.body.style.overflow = "hidden";
            
            // Note: Since this is a demo mockup, we display a placeholder inside the modal content.
            // If you have a YouTube/Vimeo link later, you can dynamically load the iframe here:
            // const videoContainer = videoModal.querySelector('.modal-video-wrapper');
            // videoContainer.innerHTML = `<iframe src="YOUR_YOUTUBE_EMBED_URL?autoplay=1" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        });

        const closeModal = () => {
            videoModal.classList.remove("active");
            document.body.style.overflow = "";
            // If an iframe is used, clean it up here to stop playback sound:
            // const videoContainer = videoModal.querySelector('.modal-video-wrapper');
            // videoContainer.innerHTML = '';
        };

        videoModalClose.addEventListener("click", closeModal);
        
        // Close on clicking the backdrop
        videoModal.addEventListener("click", (e) => {
            if (e.target === videoModal || e.target.classList.contains("modal-backdrop")) {
                closeModal();
            }
        });
    }

    // --- FAQ Accordion Transition ---
    const faqTriggers = document.querySelectorAll(".faq-trigger");
    faqTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const currentItem = trigger.closest(".faq-item");
            const isActive = currentItem.classList.contains("active");
            
            // Close all active FAQs first for accordion effect
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
            });
            
            // Toggle current FAQ
            if (!isActive) {
                currentItem.classList.add("active");
            }
        });
    });

    // --- Pricing Card Selection ---
    const pricingCards = document.querySelectorAll(".pricing-card");
    pricingCards.forEach(card => {
        card.addEventListener("click", () => {
            pricingCards.forEach(c => c.classList.remove("highlighted"));
            card.classList.add("highlighted");
        });
    });

    // --- Scroll-driven animations with IntersectionObserver ---
    const animatedElements = document.querySelectorAll(".observe-animation");
    
    if ("IntersectionObserver" in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animated");
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12, // Element is 12% visible before triggering
            rootMargin: "0px 0px -40px 0px"
        });
        
        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => {
            el.classList.add("animated");
        });
    }
});
