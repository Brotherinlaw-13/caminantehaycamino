/**
 * Caminante No Hay Camino - Main JavaScript
 * Lightweight, vanilla JS for filtering and interactions
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initFilters();
        initCurrentYear();
        initSmoothScroll();
        initLazyLoading();
    }

    /**
     * Trip Filtering Functionality
     */
    function initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const tripCards = document.querySelectorAll('.trip-card');

        if (!filterButtons.length || !tripCards.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter cards
                tripCards.forEach(card => {
                    const year = card.dataset.year;
                    const shouldShow = filter === 'all' || year === filter;
                    
                    card.classList.toggle('hidden', !shouldShow);
                    
                    // Add fade animation
                    if (shouldShow) {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        requestAnimationFrame(() => {
                            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    }
                });

                // Announce to screen readers
                announceFilter(filter, tripCards);
            });
        });
    }

    /**
     * Announce filter results to screen readers
     */
    function announceFilter(filter, cards) {
        const visibleCount = [...cards].filter(card => !card.classList.contains('hidden')).length;
        const message = filter === 'all' 
            ? `Mostrando todos los ${visibleCount} viajes`
            : `Mostrando ${visibleCount} viajes de ${filter}`;
        
        // Create or update live region
        let liveRegion = document.getElementById('filter-announcement');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'filter-announcement';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'visually-hidden';
            document.body.appendChild(liveRegion);
        }
        liveRegion.textContent = message;
    }

    /**
     * Update current year in footer
     */
    function initCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    /**
     * Smooth scroll for internal links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update focus for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });
    }

    /**
     * Enhanced lazy loading with Intersection Observer
     */
    function initLazyLoading() {
        // Check for native lazy loading support
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            return;
        }

        // Fallback for older browsers
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Simple analytics event tracking (if analytics is present)
     */
    function trackEvent(action, category, label) {
        if (typeof gtag === 'function') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    }

    // Track outbound link clicks
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="http"]');
        if (link && !link.href.includes(window.location.hostname)) {
            trackEvent('click', 'outbound', link.href);
        }
    });

})();
