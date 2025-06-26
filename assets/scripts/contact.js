// Contact Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    initContactPage();
});

// Global function for page transitions
window.initContactPage = function() {
    // Wait for DOM to be ready
    setTimeout(() => {
        // Initialize Locomotive Scroll
        if (typeof window.locomotive === 'function') {
            const locoScroll = window.locomotive();
        }
        
        // Initialize contact page components
        initContactSword();
        initContactForm();
        initFAQAccordion();
        initMap();
        initContactParticles();
    }, 100);
};

// Contact Particle Trail (follows cursor)
function initContactSword() {
    const canvas = document.getElementById('contact-sword');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let particles = [];
    
    // Mouse tracking
    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        // Create new particle at mouse position
        particles.push({
            x: mouseX,
            y: mouseY,
            size: Math.random() * 6 + 3, // Bigger particles
            life: 1,
            color: Math.random() > 0.5 ? '#38BDF8' : '#38A169', // Blue or Green
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3
        });
        
        // Keep particle count under control
        if (particles.length > 80) { // More particles
            particles.shift();
        }
    });
    
    // Animation loop
    function animate() {
        // Clear canvas with fade effect
        ctx.fillStyle = 'rgba(26, 32, 44, 0.05)'; // Slower fade for more trail
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            
            // Update particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.02;
            particle.size *= 0.98;
            
            // Remove dead particles
            if (particle.life <= 0 || particle.size < 0.5) {
                particles.splice(i, 1);
                continue;
            }
            
            // Draw particle with enhanced glow
            ctx.shadowBlur = 25; // Stronger glow
            ctx.shadowColor = particle.color;
            
            // Multiple glow layers for extra brightness
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.life * 0.3;
            ctx.fill();
            
            // Inner bright core
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF'; // White core for extra brightness
            ctx.globalAlpha = particle.life * 0.8;
            ctx.fill();
            
            // Outer colored glow
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.life;
            ctx.fill();
            
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('.submit-button');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = successModal.querySelector('.modal-close-btn');
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state
        submitButton.classList.add('loading');
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate API call (replace with actual API endpoint)
        try {
            await simulateAPICall(data);
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            form.reset();
            
            // Reset form lines
            const formLines = form.querySelectorAll('.form-line');
            formLines.forEach(line => {
                gsap.set(line, { width: 0 });
            });
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            submitButton.classList.remove('loading');
        }
    });
    
    // Form field animations
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const line = group.querySelector('.form-line');
        
        if (input && line) {
            input.addEventListener('focus', () => {
                gsap.to(line, {
                    width: '100%',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    gsap.to(line, {
                        width: 0,
                        duration: 0.3,
                        ease: 'power2.in'
                    });
                }
            });
        }
    });
    
    // Modal close
    modalCloseBtn.addEventListener('click', () => {
        hideSuccessModal();
    });
    
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            hideSuccessModal();
        }
    });
}

// Simulate API call
async function simulateAPICall(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data submitted:', data);
            resolve();
        }, 2000);
    });
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('active');
    
    gsap.fromTo('.success-content',
        {
            scale: 0.8,
            opacity: 0
        },
        {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)'
        }
    );
    
    // Animate success icon
    gsap.fromTo('.success-icon',
        {
            scale: 0,
            rotation: -180
        },
        {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: 0.2,
            ease: 'back.out(1.7)'
        }
    );
}

// Hide success modal
function hideSuccessModal() {
    const modal = document.getElementById('success-modal');
    
    gsap.to('.success-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            modal.classList.remove('active');
        }
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const ans = faq.querySelector('.faq-answer');
                gsap.to(ans, {
                    maxHeight: 0,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                
                // Calculate actual height
                answer.style.maxHeight = 'none';
                const height = answer.offsetHeight;
                answer.style.maxHeight = '0';
                
                gsap.to(answer, {
                    maxHeight: height,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Initialize Map (placeholder - replace with actual map API)
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Placeholder for map
    mapContainer.style.background = `
        linear-gradient(rgba(26, 32, 44, 0.9), rgba(26, 32, 44, 0.9)),
        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" text-anchor="middle" fill="white" font-size="8">MAP</text></svg>')
    `;
    mapContainer.style.backgroundSize = 'cover';
    mapContainer.style.backgroundPosition = 'center';
    
    // In production, initialize actual map here
    // Example: Google Maps, Mapbox, etc.
}

// Contact Particles Effect
function initContactParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'contact-particle';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? '#38BDF8' : '#F97316'};
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: 0.6;
            filter: blur(0.5px);
            animation: contactFloat ${duration}s ${delay}s infinite ease-in-out;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add animation styles
    if (!document.querySelector('#contact-particle-styles')) {
        const style = document.createElement('style');
        style.id = 'contact-particle-styles';
        style.textContent = `
            @keyframes contactFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.6;
                }
                33% {
                    transform: translate(30px, -30px) scale(1.2);
                    opacity: 0.8;
                }
                66% {
                    transform: translate(-20px, 20px) scale(0.8);
                    opacity: 0.4;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Quick contact button animations
const quickContactBtns = document.querySelectorAll('.quick-contact-btn');
quickContactBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Animate response time on scroll
const responseTime = document.querySelector('.response-time');
if (responseTime) {
    gsap.fromTo(responseTime,
        {
            scale: 0.9,
            opacity: 0
        },
        {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
                trigger: responseTime,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                scroller: '#main'
            }
        }
    );
}