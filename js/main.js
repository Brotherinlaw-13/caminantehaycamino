/**
 * Caminante No Hay Camino - Enhanced UX JavaScript
 * Smooth animations, filtering, and interactions
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initFilters();
        initScrollAnimations();
        initSmoothScroll();
        initCurrentYear();
        initParallax();
    }

    /**
     * Trip Filtering with smooth animations
     */
    function initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const tripCards = document.querySelectorAll('.trip-card');
        const grid = document.querySelector('.trips-grid');

        if (!filterButtons.length || !tripCards.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Animate grid
                if (grid) {
                    grid.style.opacity = '0.5';
                    grid.style.transform = 'scale(0.98)';
                }

                setTimeout(() => {
                    // Filter cards
                    let visibleIndex = 0;
                    tripCards.forEach(card => {
                        const year = card.dataset.year;
                        const shouldShow = filter === 'all' || year === filter;
                        
                        if (shouldShow) {
                            card.classList.remove('hidden');
                            card.style.animationDelay = `${visibleIndex * 50}ms`;
                            card.style.animation = 'fadeInCard 0.5s ease forwards';
                            visibleIndex++;
                        } else {
                            card.classList.add('hidden');
                        }
                    });

                    // Restore grid
                    if (grid) {
                        grid.style.opacity = '1';
                        grid.style.transform = 'scale(1)';
                    }

                    // Announce to screen readers
                    announceFilter(filter, tripCards);
                }, 150);
            });
        });

        // Add animation keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInCard {
                from {
                    opacity: 0;
                    transform: translateY(20px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            .trips-grid {
                transition: opacity 0.15s ease, transform 0.15s ease;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Announce filter results to screen readers
     */
    function announceFilter(filter, cards) {
        const visibleCount = [...cards].filter(card => !card.classList.contains('hidden')).length;
        const message = filter === 'all' 
            ? `Mostrando todos los ${visibleCount} viajes`
            : `Mostrando ${visibleCount} viajes de ${filter}`;
        
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
     * Scroll-triggered animations
     */
    function initScrollAnimations() {
        // Add fade-in class to animatable elements
        const animatableSelectors = [
            '.section-title',
            '.about-text',
            '.about-highlights',
            '.highlight-item',
            '.featured-card',
            '.trip-card',
            '.camino-text',
            '.camino-routes',
            '.stat-item',
            '.aboutus-content > *',
            '.cta-text'
        ];

        const elements = document.querySelectorAll(animatableSelectors.join(', '));
        
        elements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${Math.min(index % 6, 4) * 100}ms`;
        });

        // Intersection Observer for animations
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(el => observer.observe(el));
    }

    /**
     * Smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update focus
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                }
            });
        });
    }

    /**
     * Update year in footer
     */
    function initCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    /**
     * Subtle parallax on hero
     */
    function initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const heroHeight = hero.offsetHeight;
                    
                    if (scrolled < heroHeight) {
                        const opacity = 1 - (scrolled / heroHeight) * 0.5;
                        const heroContent = hero.querySelector('.hero-content');
                        if (heroContent) {
                            heroContent.style.opacity = opacity;
                            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                        }
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /**
     * Track outbound links
     */
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="http"]');
        if (link && !link.href.includes(window.location.hostname)) {
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    event_category: 'outbound',
                    event_label: link.href
                });
            }
        }
    });

})();
