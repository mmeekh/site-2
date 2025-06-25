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

// Make locomotive function globally available
window.locomotive = locomotive;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize locomotive scroll
    const locoScroll = locomotive();
    
    // Initialize sword animation for homepage
    const mainCanvas = document.querySelector('canvas');
    if (mainCanvas) {
        console.log('Canvas bulundu, kılıç animasyonu başlatılıyor...');
        
        const swordAnim = new SwordAnimation({
            canvas: mainCanvas,
            scrollBehavior: 'scroll',
            frameCount: 40, // Kılıç görseli sayısına göre ayarla
            basePath: 'images/sword-sequence/',
            scrollTrigger: {
                trigger: '#page',
                start: 'top top',
                end: '600% top',
                scroller: '#main'
            }
        });
        
        swordAnim.init();
        console.log('Kılıç animasyonu başlatıldı!');
        
        // Global olarak erişilebilir kıl (debug için)
        window.swordAnimation = swordAnim;
    } else {
        console.log('Canvas elementi bulunamadı!');
    }
    
    // Scroll-based navigation effects
    let lastScroll = 0;
    let ticking = false;
    
    function updateNavigation() {
        const currentScroll = window.pageYOffset;
        const nav = document.getElementById('nav');
        
        if (nav) {
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavigation);
            ticking = true;
        }
    });
    
    // Video lazy loading and performance optimization
    const videos = document.querySelectorAll('iframe');
    videos.forEach(video => {
        // Intersection Observer ile videoları lazy load
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video görünür olduğunda yükleme işlemini başlat
                    const iframe = entry.target;
                    if (!iframe.dataset.loaded) {
                        iframe.dataset.loaded = 'true';
                        console.log('Video yüklendi:', iframe.src);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        observer.observe(video);
    });
    
    // GSAP animasyonları
    initGSAPAnimations();
});

// GSAP animasyonlarını başlat
function initGSAPAnimations() {
    // Sayfa yüklendiğinde ana başlığı animate et
    gsap.from("#loop h1", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5
    });
    
    // Video container'ları animate et
    gsap.utils.toArray('.video-glow').forEach((video, index) => {
        gsap.fromTo(video, 
            {
                opacity: 0,
                scale: 0.8
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: video,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scroller: '#main',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Text elementlerini animate et
    gsap.utils.toArray('#page h3, #page h4').forEach((text, index) => {
        gsap.fromTo(text,
            {
                opacity: 0,
                x: -100
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: text,
                    start: 'top 85%',
                    scroller: '#main',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Sol ve sağ text'leri animate et
    gsap.utils.toArray('#left-text, #text1, #text2, #text3').forEach((text, index) => {
        const direction = text.id.includes('left') || text.id === 'text1' ? -100 : 100;
        
        gsap.fromTo(text,
            {
                opacity: 0,
                x: direction
            },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: text,
                    start: 'top 75%',
                    scroller: '#main',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Footer animate et
    gsap.fromTo('#footer',
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#footer',
                start: 'top 90%',
                scroller: '#main',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Debug fonksiyonları
window.debugSword = function() {
    if (window.swordAnimation) {
        console.log('Sword Animation Instance:', window.swordAnimation);
        console.log('Frame Count:', window.swordAnimation.frameCount);
        console.log('Current Frame:', window.swordAnimation.imageSeq.frame);
        console.log('Images Loaded:', window.swordAnimation.images.length);
        console.log('Is Loaded:', window.swordAnimation.isLoaded);
    } else {
        console.log('Sword animation instance bulunamadı!');
    }
};

// Resize event handler
window.addEventListener('resize', () => {
    // ScrollTrigger'ı yenile
    ScrollTrigger.refresh();
    
    // Canvas boyutunu güncelle
    if (window.swordAnimation && window.swordAnimation.canvas) {
        window.swordAnimation.setCanvasSize();
        window.swordAnimation.render();
    }
});

// Hata yakalama
window.addEventListener('error', (e) => {
    console.error('JavaScript Hatası:', e.error);
});

// Console mesajı
console.log('🗡️ Sword Nest - Ana script yüklendi!');
console.log('🎬 Debug için window.debugSword() fonksiyonunu kullanabilirsiniz.');