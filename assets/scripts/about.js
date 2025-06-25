// About Page Scripts - Completely Redesigned
document.addEventListener('DOMContentLoaded', () => {
    initAboutPage();
});

// Global function for page transitions
window.initAboutPage = function() {
    // Wait for DOM to be ready
    setTimeout(() => {
        // Initialize Locomotive Scroll
        if (typeof window.locomotive === 'function') {
            const locoScroll = window.locomotive();
        }
        
        // Initialize about page components
        initHeroAnimations();
        initAIVisualization();
        initScenarioAnimations();
        initTechGrid();
        initImpactCounters();
        initParticleEffects();
        initScrollAnimations();
    }, 100);
};

// Hero Animations
function initHeroAnimations() {
    // Animate hero content
    gsap.fromTo('.hero-title', 
        {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out'
        }
    );
    
    gsap.fromTo('.hero-subtitle', 
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out'
        }
    );
    
    // Animate hero stats
    gsap.fromTo('.hero-stats .stat-item', 
        {
            opacity: 0,
            y: 30,
            scale: 0.8
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.6,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        }
    );
}

// AI Visualization
function initAIVisualization() {
    const nodes = document.querySelectorAll('.node');
    const connections = document.querySelectorAll('.connection');
    
    // Animate nodes with ScrollTrigger
    gsap.fromTo(nodes,
        {
            scale: 0,
            opacity: 0
        },
        {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.ai-visualization',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                scroller: '#main'
            }
        }
    );
    
    // Animate connections
    gsap.fromTo(connections,
        {
            scaleX: 0,
            opacity: 0
        },
        {
            scaleX: 1,
            opacity: 1,
            duration: 1.5,
            stagger: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.ai-visualization',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                scroller: '#main'
            }
        }
    );
}

// Scenario Animations
function initScenarioAnimations() {
    const scenarios = document.querySelectorAll('.scenario');
    
    scenarios.forEach((scenario, index) => {
        gsap.fromTo(scenario,
            {
                opacity: 0,
                y: 50,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: scenario,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                }
            }
        );
        
        // Hover effects
        scenario.addEventListener('mouseenter', () => {
            gsap.to(scenario, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        scenario.addEventListener('mouseleave', () => {
            gsap.to(scenario, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Tech Grid Animations
function initTechGrid() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        gsap.fromTo(item,
            {
                opacity: 0,
                y: 40,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                }
            }
        );
        
        // Icon rotation on hover
        const icon = item.querySelector('.tech-icon');
        item.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                rotation: 360,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    });
}

// Impact Counters
function initImpactCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const text = stat.textContent;
        
        // Only animate numeric values
        if (text.includes('%')) {
            const number = parseInt(text);
            const counter = { value: 0 };
            
            gsap.to(counter, {
                value: number,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                },
                onUpdate: () => {
                    stat.textContent = Math.round(counter.value) + '%';
                }
            });
        }
    });
    
    // Animate stat circles
    const statCircles = document.querySelectorAll('.stat-circle');
    statCircles.forEach((circle, index) => {
        gsap.fromTo(circle,
            {
                scale: 0,
                rotation: -180
            },
            {
                scale: 1,
                rotation: 0,
                duration: 1,
                delay: index * 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: circle,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                }
            }
        );
    });
}

// Particle Effects
function initParticleEffects() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? '#38BDF8' : '#38A169'};
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: 0.4;
            filter: blur(1px);
            animation: aiParticleFloat ${duration}s ${delay}s infinite ease-in-out;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation
    if (!document.querySelector('#ai-particle-styles')) {
        const style = document.createElement('style');
        style.id = 'ai-particle-styles';
        style.textContent = `
            @keyframes aiParticleFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.4;
                }
                25% {
                    transform: translate(40px, -40px) scale(1.2);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(-30px, 30px) scale(0.8);
                    opacity: 0.3;
                }
                75% {
                    transform: translate(20px, -60px) scale(1.1);
                    opacity: 0.6;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll Animations
function initScrollAnimations() {
    // Animate section headers
    gsap.utils.toArray('h2').forEach(header => {
        gsap.fromTo(header,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                }
            }
        );
    });
    
    // Animate philosophy cards
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    philosophyCards.forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 40,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                }
            }
        );
    });
    
    // Animate metric bars
    const metricFills = document.querySelectorAll('.metric-fill');
    metricFills.forEach(fill => {
        const width = fill.style.width;
        gsap.fromTo(fill,
            {
                width: '0%'
            },
            {
                width: width,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: fill,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                }
            }
        );
    });
    
    // Animate CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach((button, index) => {
        gsap.fromTo(button,
            {
                opacity: 0,
                y: 30,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: button,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                }
            }
        );
        
        // Enhanced hover effects
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Mission points animation
const missionPoints = document.querySelectorAll('.point');
missionPoints.forEach((point, index) => {
    gsap.fromTo(point,
        {
            opacity: 0,
            x: -50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: point,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                scroller: '#main'
            }
        }
    );
});

// Story cards animation
const storyCards = document.querySelectorAll('.story-card');
storyCards.forEach((card, index) => {
    gsap.fromTo(card,
        {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                scroller: '#main'
            }
        }
    );
});

console.log('🤖 About page initialized with AI-powered animations!');

// Enhanced interaction effects
function initEnhancedInteractions() {
    // Add glow effect to tech icons on hover
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.boxShadow = '0 0 30px rgba(56, 161, 105, 0.6)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.boxShadow = 'none';
        });
    });
    
    // Add pulse effect to stat circles
    const statCircles = document.querySelectorAll('.stat-circle');
    statCircles.forEach(circle => {
        setInterval(() => {
            gsap.to(circle, {
                scale: 1.05,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        }, 3000 + Math.random() * 2000);
    });
}

// Initialize enhanced interactions
setTimeout(initEnhancedInteractions, 1000);