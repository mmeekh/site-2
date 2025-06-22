// About Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Locomotive Scroll
    const locoScroll = locomotive();
    
    // Initialize mission sword animation
    initMissionSword();
    
    // Initialize team interactions
    initTeamInteractions();
    
    // Initialize process timeline animations
    initProcessTimeline();
    
    // Initialize values animations
    initValuesAnimation();
    
    // Initialize particles for hero
    initHeroParticles();
});

// Mission Sword Animation
function initMissionSword() {
    const missionCanvas = document.getElementById('mission-sword');
    if (!missionCanvas) return;
    
    const swordAnim = new SwordAnimation({
        canvas: missionCanvas,
        scrollBehavior: 'rotate',
        frameCount: 40,
        basePath: './images/sword-sequence/',
        autoplay: true,
        size: 'medium'
    });
    swordAnim.init();
}

// Team Member Interactions
function initTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach((member, index) => {
        // Generate unique AI portrait pattern
        const aiPortrait = member.querySelector('.ai-portrait');
        if (aiPortrait) {
            generateAIPortrait(aiPortrait, index);
        }
        
        // Add hover sound effect
        member.addEventListener('mouseenter', () => {
            // Play subtle hover sound if enabled
            if (window.soundEnabled) {
                playHoverSound();
            }
        });
    });
}

// Generate AI Portrait Pattern
function generateAIPortrait(element, seed) {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // Create generative art pattern
    const colors = ['#38BDF8', '#38A169', '#F97316'];
    const segments = 12;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 90;
    
    for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const nextAngle = ((i + 1) / segments) * Math.PI * 2;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angle, nextAngle);
        ctx.closePath();
        
        // Use seed to determine color pattern
        const colorIndex = (i + seed) % colors.length;
        ctx.fillStyle = colors[colorIndex];
        ctx.fill();
    }
    
    // Add inner circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = '#1A202C';
    ctx.fill();
    
    // Apply as background
    element.style.backgroundImage = `url(${canvas.toDataURL()})`;
    element.style.backgroundSize = 'cover';
}

// Process Timeline Animation
function initProcessTimeline() {
    const steps = document.querySelectorAll('.process-step');
    
    steps.forEach((step, index) => {
        gsap.fromTo(step,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: step,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                }
            }
        );
        
        // Animate step icon
        const icon = step.querySelector('.step-icon');
        if (icon) {
            gsap.fromTo(icon,
                {
                    scale: 0,
                    rotation: -180
                },
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    delay: index * 0.2 + 0.3,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                        scroller: '#main'
                    }
                }
            );
        }
    });
    
    // Animate timeline line
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) {
        gsap.fromTo(timelineLine,
            {
                scaleY: 0
            },
            {
                scaleY: 1,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#about-process',
                    start: 'top 50%',
                    end: 'bottom 50%',
                    scrub: 1,
                    scroller: '#main'
                }
            }
        );
    }
}

// Values Cards Animation
function initValuesAnimation() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach((card, index) => {
        // Entrance animation
        gsap.fromTo(card,
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
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                }
            }
        );
        
        // Icon glow animation on hover
        const iconGlow = card.querySelector('.icon-glow');
        if (iconGlow) {
            card.addEventListener('mouseenter', () => {
                gsap.to(iconGlow, {
                    scale: 1.5,
                    opacity: 0.5,
                    duration: 0.6
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(iconGlow, {
                    scale: 1,
                    opacity: 0.3,
                    duration: 0.6
                });
            });
        }
    });
}

// Hero Particles Effect
function initHeroParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? '#38BDF8' : '#38A169'};
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: 0.5;
            filter: blur(1px);
            animation: floatParticle ${duration}s ${delay}s infinite ease-in-out;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.5;
                }
                25% {
                    transform: translate(50px, -30px) scale(1.2);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(-30px, 20px) scale(0.8);
                    opacity: 0.3;
                }
                75% {
                    transform: translate(20px, -50px) scale(1.1);
                    opacity: 0.6;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Hover sound effect
function playHoverSound() {
    // Implement sound playing logic if needed
    console.log('Hover sound played');
}

// CTA Button enhanced interaction
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}