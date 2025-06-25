// Projects Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    initProjectsPage();
});

// Global function for page transitions
window.initProjectsPage = function() {
    // Wait for DOM to be ready
    setTimeout(() => {
        // Initialize Locomotive Scroll
        if (typeof window.locomotive === 'function') {
            const locoScroll = window.locomotive();
        }
        
        // Initialize projects page components
        initFilterSystem();
        initProjectCards();
        initProjectModal();
        initStatsCounter();
        initSwordDecoration();
    }, 100);
};

// Project data (in real app, this would come from a database)
const projectsData = {
    1: {
        title: 'TechStart AI Lansmanı',
        client: 'TechStart',
        category: 'ai-campaign',
        video: 'https://www.youtube.com/embed/8cTzFwAalJE',
        metrics: [
            '+3214% Dönüşüm Artışı',
            '-69% Müşteri Edinme Maliyeti',
            '3:1 LTV:CAC Oranı',
            '+85% CTR Artışı'
        ],
        description: 'TechStart için geliştirdiğimiz AI destekli kampanya, hedef kitle analizinde GPT-4 kullanarak benzersiz içgörüler elde etti. Stable Diffusion ile oluşturulan görsel varyasyonları, dinamik yaratıcı optimizasyon ile gerçek zamanlı olarak test edildi.',
        process: [
            'AI ile 50.000+ rakip yorumu analiz edildi',
            'Generative AI ile 20+ reklam varyasyonu üretildi',
            'Programatik kampanya ile kişiselleştirilmiş deneyim',
            'Gerçek zamanlı optimizasyon ve A/B testler',
            'Sürekli performans iyileştirme'
        ]
    },
    2: {
        title: 'EcoLife Marka Filmi',
        client: 'EcoLife',
        category: 'video',
        video: 'https://www.youtube.com/embed/aZGH7VTsdXY',
        metrics: [
            '15M Organik İzlenme',
            '%92 Pozitif Duygu Skoru',
            '2.3M Sosyal Paylaşım',
            '%156 Marka Bilinirliği Artışı'
        ],
        description: 'Sürdürülebilirlik temalı bu sinematik prodüksiyon, AI destekli storyboard ve renk grading teknikleri kullanılarak üretildi. Duygusal bağ kurma ve viral potansiyel odaklı içerik stratejisi ile büyük başarı elde edildi.',
        process: [
            'AI destekli konsept geliştirme',
            '4K sinematik prodüksiyon',
            'Renk düzenleme ve post prodüksiyon',
            'Multi-platform dağıtım stratejisi',
            'Influencer işbirlikleri'
        ]
    },
    // Add more projects as needed
};

// Filter System
function initFilterSystem() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Animate sword slash effect
            animateFilterTransition();
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    showCard(card);
                } else {
                    hideCard(card);
                }
            });
            
            // Update layout after filtering
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 600);
        });
    });
}

// Show card with animation
function showCard(card) {
    gsap.to(card, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        onStart: () => {
            card.classList.remove('hidden');
        }
    });
}

// Hide card with animation
function hideCard(card) {
    gsap.to(card, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            card.classList.add('hidden');
        }
    });
}

// Filter transition animation
function animateFilterTransition() {
    const slash = document.createElement('div');
    slash.className = 'filter-slash';
    slash.style.cssText = `
        position: fixed;
        top: 50%;
        left: -100%;
        width: 200%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #38BDF8, transparent);
        z-index: 1000;
        pointer-events: none;
    `;
    
    document.body.appendChild(slash);
    
    gsap.to(slash, {
        left: '100%',
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
            slash.remove();
        }
    });
}

// Initialize project cards
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Entrance animation
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
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                }
            }
        );
        
        // Click handler for modal
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            openProjectModal(projectId);
        });
        
        // Hover effect on metrics
        const metrics = card.querySelectorAll('.metric');
        metrics.forEach(metric => {
            card.addEventListener('mouseenter', () => {
                gsap.to(metric, {
                    scale: 1.05,
                    duration: 0.3,
                    stagger: 0.05
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(metric, {
                    scale: 1,
                    duration: 0.3,
                    stagger: 0.05
                });
            });
        });
    });
}

// Project Modal System
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = modal.querySelector('.modal-close');
    
    // Close modal
    modalClose.addEventListener('click', closeProjectModal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

// Open project modal
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const data = projectsData[projectId];
    
    if (!data) return;
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = data.title;
    modal.querySelector('.modal-video iframe').src = data.video;
    
    // Update metrics
    const metricsContainer = modal.querySelector('.modal-metrics');
    metricsContainer.innerHTML = data.metrics.map(metric => 
        `<span class="metric">${metric}</span>`
    ).join('');
    
    // Update description
    modal.querySelector('.modal-description').innerHTML = `<p>${data.description}</p>`;
    
    // Update process
    const processContainer = modal.querySelector('.modal-process');
    processContainer.innerHTML = `
        <h3>Süreç</h3>
        <ul>
            ${data.process.map(step => `<li>${step}</li>`).join('')}
        </ul>
    `;
    
    // Show modal with animation
    modal.classList.add('active');
    gsap.fromTo(modal.querySelector('.modal-content'),
        {
            scale: 0.9,
            opacity: 0
        },
        {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
        }
    );
}

// Close project modal
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    
    gsap.to(modal.querySelector('.modal-content'), {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            modal.classList.remove('active');
            // Clear iframe src to stop video
            modal.querySelector('.modal-video iframe').src = '';
        }
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        
        const counter = {
            value: 0
        };
        
        gsap.to(counter, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                scroller: '#main'
            },
            onUpdate: () => {
                stat.textContent = Math.round(counter.value);
            }
        });
    });
}

// Sword Decoration Animation
function initSwordDecoration() {
    const swordDecoration = document.querySelector('.sword-decoration');
    if (!swordDecoration) return;
    
    // Continuous animation
    gsap.to(swordDecoration, {
        x: '+=20',
        y: '-=10',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
    
    // Glow effect on scroll
    gsap.to(swordDecoration, {
        opacity: 0.5,
        boxShadow: '0 0 40px rgba(56, 189, 248, 0.8)',
        scrollTrigger: {
            trigger: '#projects-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            scroller: '#main'
        }
    });
}

// Enhanced CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    let hoverAnimation;
    
    ctaButton.addEventListener('mouseenter', () => {
        hoverAnimation = gsap.to(ctaButton, {
            scale: 1.05,
            boxShadow: '0 15px 40px rgba(249, 115, 22, 0.4)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        if (hoverAnimation) hoverAnimation.kill();
        gsap.to(ctaButton, {
            scale: 1,
            boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}