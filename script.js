// Initialize loader effect
function loaderEffect() {
    const loader = document.querySelector("#loader");
    const mainContent = document.querySelector("#main");

    window.addEventListener('load', () => {
        if (loader) {
            loader.classList.add('hidden');
        }
        
        if (mainContent) {
            mainContent.classList.add('loaded');
        }
    });
}
loaderEffect();

// Initialize Locomotive Scroll
function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });
    
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
    
    return locoScroll;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize locomotive scroll
    const locoScroll = locomotive();
    
    // Initialize sword animation for homepage
    if (document.getElementById('main-canvas')) {
        const swordAnim = new SwordAnimation({
            canvas: document.getElementById('main-canvas'),
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
    
    // Scroll-based navigation effects
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const nav = document.getElementById('nav');
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
});