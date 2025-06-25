// Page Transition System
class PageLoader {
    constructor() {
        this.transition = document.getElementById('page-transition');
        this.swordSlash = document.querySelector('.sword-slash');
        this.duration = 600;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.url) {
                this.loadPage(e.state.url, false);
            }
        });
        
        // Set initial state
        history.replaceState({ url: window.location.href }, '', window.location.href);
    }
    
    async navigateTo(url) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Play transition out
        await this.transitionOut();
        
        // Load new page
        await this.loadPage(url, true);
        
        // Play transition in
        await this.transitionIn();
        
        this.isTransitioning = false;
    }
    
    async transitionOut() {
        return new Promise((resolve) => {
            // Activate transition overlay
            this.transition.classList.add('active');
            
            // Animate sword slash
            gsap.timeline()
                .set(this.swordSlash, {
                    left: '-100%',
                    rotation: -15
                })
                .to(this.swordSlash, {
                    left: '100%',
                    duration: this.duration / 1000,
                    ease: 'power3.inOut',
                    onComplete: resolve
                })
                .to(this.transition, {
                    backgroundColor: 'rgba(26, 32, 44, 1)',
                    duration: 0.3
                }, '-=0.3');
        });
    }
    
    async loadPage(url, pushState = true) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            
            // Create temporary DOM to parse response
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');
            
            // Update page content
            const newMain = newDoc.querySelector('#main');
            const currentMain = document.querySelector('#main');
            
            if (newMain && currentMain) {
                currentMain.innerHTML = newMain.innerHTML;
            }
            
            // Update page title
            document.title = newDoc.title;
            
            // Update meta tags
            this.updateMetaTags(newDoc);
            
            // Update active navigation
            if (window.navigation) {
                window.navigation.setActivePage();
            }
            
            // Push state if needed
            if (pushState) {
                history.pushState({ url }, '', url);
            }
            
            // Reinitialize page-specific scripts
            this.reinitializeScripts();
            
        } catch (error) {
            console.error('Error loading page:', error);
            // Fallback to traditional navigation
            window.location.href = url;
        }
    }
    
    async transitionIn() {
        return new Promise((resolve) => {
            gsap.timeline()
                .to(this.transition, {
                    backgroundColor: 'rgba(26, 32, 44, 0)',
                    duration: 0.3
                })
                .set(this.swordSlash, {
                    left: '-100%'
                })
                .set(this.transition, {
                    className: 'page-transition',
                    onComplete: resolve
                });
        });
    }
    
    loadPageCSS(url) {
        // Remove existing page-specific CSS
        const existingPageCSS = document.querySelectorAll('link[data-page-css]');
        existingPageCSS.forEach(link => link.remove());
        
        // Determine which CSS file to load based on URL
        let cssFile = '';
        const currentPage = url.split('/').pop() || 'index.html';
        
        switch (currentPage) {
            case 'hakkimizda.html':
                cssFile = './assets/styles/pages/hakkimizda.css';
                break;
            case 'projeler.html':
                cssFile = './assets/styles/pages/projeler.css';
                break;
            case 'iletisim.html':
                cssFile = './assets/styles/pages/iletisim.css';
                break;
            default:
                // No additional CSS needed for homepage
                return Promise.resolve();
        }
        
        // Load the CSS file and return a promise
        return new Promise((resolve, reject) => {
            if (cssFile) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = cssFile;
                link.setAttribute('data-page-css', 'true');
                
                link.onload = () => {
                    console.log(`CSS loaded: ${cssFile}`);
                    resolve();
                };
                
                link.onerror = () => {
                    console.error(`Failed to load CSS: ${cssFile}`);
                    resolve(); // Still resolve to not block the process
                };
                
                document.head.appendChild(link);
            } else {
                resolve();
            }
        });
    }
    
    updateMetaTags(newDoc) {
        // Update meta description
        const metaDesc = newDoc.querySelector('meta[name="description"]');
        const currentMetaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && currentMetaDesc) {
            currentMetaDesc.setAttribute('content', metaDesc.getAttribute('content'));
        }
        
        // Update OG tags
        const ogTags = ['og:title', 'og:description', 'og:url'];
        ogTags.forEach(property => {
            const newTag = newDoc.querySelector(`meta[property="${property}"]`);
            const currentTag = document.querySelector(`meta[property="${property}"]`);
            if (newTag && currentTag) {
                currentTag.setAttribute('content', newTag.getAttribute('content'));
            }
        });
    }
    
    reinitializeScripts() {
        // Destroy existing instances
        if (window.locomotiveScroll) {
            window.locomotiveScroll.destroy();
        }
        
        // Kill all ScrollTriggers
        ScrollTrigger.getAll().forEach(st => st.kill());
        
        // Wait for CSS to be fully loaded
        setTimeout(() => {
            // Reinitialize based on current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            switch (currentPage) {
                case 'index.html':
                    this.initHomePage();
                    break;
                case 'hakkimizda.html':
                    this.initAboutPage();
                    break;
                case 'projeler.html':
                    this.initProjectsPage();
                    break;
                case 'iletisim.html':
                    this.initContactPage();
                    break;
            }
            
            // Reinitialize locomotive scroll with a longer delay
            setTimeout(() => {
                // Use the global locomotive function from script.js
                if (typeof locomotive === 'function') {
                    try {
                        window.locomotiveScroll = locomotive();
                        console.log('Locomotive scroll reinitialized');
                    } catch (e) {
                        console.error('Locomotive scroll initialization error:', e);
                    }
                    
                    // Refresh ScrollTrigger after locomotive is ready
                    setTimeout(() => {
                        ScrollTrigger.refresh();
                    }, 200);
                }
            }, 300);
        }, 200);
    }
    
    initHomePage() {
        // Initialize sword animation for homepage
        const mainCanvas = document.getElementById('main-canvas');
        if (mainCanvas) {
            const swordAnim = new SwordAnimation({
                canvas: mainCanvas,
                scrollBehavior: 'pinned',
                frameCount: 40,
                basePath: './images/sword-sequence/',
                scrollTrigger: {
                    trigger: '#page',
                    start: 'top top',
                    end: '600% top',
                    scroller: '#main'
                }
            });
            swordAnim.init();
        }
    }
    
    initAboutPage() {
        // About page specific initializations
        console.log('About page initialized');
    }
    
    initProjectsPage() {
        // Projects page specific initializations
        console.log('Projects page initialized');
        
        // Initialize projects page if function exists
        if (typeof window.initProjectsPage === 'function') {
            window.initProjectsPage();
        } else {
            // Fallback initialization
            setTimeout(() => {
                if (typeof initFilterSystem === 'function') {
                    initFilterSystem();
                }
                if (typeof initProjectCards === 'function') {
                    initProjectCards();
                }
                if (typeof initProjectModal === 'function') {
                    initProjectModal();
                }
                if (typeof initStatsCounter === 'function') {
                    initStatsCounter();
                }
                if (typeof initSwordDecoration === 'function') {
                    initSwordDecoration();
                }
            }, 200);
        }
    }
    
    initContactPage() {
        // Contact page specific initializations
        console.log('Contact page initialized');
        
        // Initialize contact page if function exists
        if (typeof window.initContactPage === 'function') {
            window.initContactPage();
        } else {
            // Fallback initialization
            setTimeout(() => {
                if (typeof initContactSword === 'function') {
                    initContactSword();
                }
                if (typeof initContactForm === 'function') {
                    initContactForm();
                }
                if (typeof initFAQAccordion === 'function') {
                    initFAQAccordion();
                }
                if (typeof initMap === 'function') {
                    initMap();
                }
                if (typeof initContactParticles === 'function') {
                    initContactParticles();
                }
            }, 200);
        }
    }
}

// Initialize page loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.pageLoader = new PageLoader();
});