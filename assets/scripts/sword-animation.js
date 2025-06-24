// Modular Sword Animation Class
class SwordAnimation {
    constructor(options = {}) {
        this.canvas = options.canvas;
        this.context = this.canvas ? this.canvas.getContext('2d') : null;
        this.frameCount = options.frameCount || 40; // Görsellerine göre bu değeri ayarla (örn: 40 kare için)
        this.basePath = options.basePath || 'images/sword-sequence/';
        this.scrollBehavior = options.scrollBehavior || 'scroll'; // scroll, rotate, follow, fixed
        this.scrollTrigger = options.scrollTrigger || null;
        this.autoplay = options.autoplay || false;
        this.size = options.size || 'full'; // full, small, medium
        
        this.images = [];
        this.imageSeq = { frame: 1 };
        this.rotation = 0;
        this.isLoaded = false;
        this.animationId = null;
    }
    
    init() {
        if (!this.canvas || !this.context) return;
        
        this.setCanvasSize();
        this.loadImages(() => {
            this.isLoaded = true;
            this.setupAnimation();
            this.render();
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.setCanvasSize();
            this.render();
        });
    }
    
    setCanvasSize() {
        if (this.size === 'small') {
            this.canvas.width = 60;
            this.canvas.height = 60;
        } else if (this.size === 'medium') {
            this.canvas.width = 200;
            this.canvas.height = 200;
        } else {
            // Full size
            if (window.innerWidth > 768) {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            } else {
                this.canvas.width = 60;
                this.canvas.height = 60;
            }
        }
    }
    
    files(index) {
        return `${this.basePath}${String(index).padStart(4, '0')}.png`;
    }
    
    loadImages(callback) {
        let loadedCount = 0;
        
        for (let i = 0; i < this.frameCount; i++) {
            const frameIndex = 1 + (i * 3); // 0001, 0004, 0007, 0010... şeklinde 3'er artarak
            const img = new Image();
            
            img.onload = () => {
                loadedCount++;
                if (loadedCount === this.frameCount && callback) {
                    callback();
                }
            };
            
            img.onerror = () => {
                console.error(`Görsel yüklenemedi: ${this.files(frameIndex)}`);
                loadedCount++;
                if (loadedCount === this.frameCount && callback) {
                    callback();
                }
            };
            
            img.src = this.files(frameIndex);
            this.images.push(img);
        }
    }
    
    setupAnimation() {
        switch (this.scrollBehavior) {
            case 'scroll':
                this.setupScrollAnimation();
                break;
            case 'rotate':
                this.setupRotateAnimation();
                break;
            case 'follow':
                this.setupFollowAnimation();
                break;
            case 'fixed':
                this.imageSeq.frame = Math.floor(this.frameCount / 2);
                break;
        }
    }
    
    setupScrollAnimation() {
        if (!this.scrollTrigger) return;
        
        gsap.to(this.imageSeq, {
            frame: this.frameCount,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                scrub: 0.15,
                trigger: this.scrollTrigger.trigger,
                start: this.scrollTrigger.start,
                end: this.scrollTrigger.end,
                scroller: this.scrollTrigger.scroller,
            },
            onUpdate: () => this.render(),
        });
        
        // Pin for desktop only
        if (window.innerWidth > 768) {
            ScrollTrigger.create({
                trigger: this.canvas,
                pin: true,
                scroller: this.scrollTrigger.scroller,
                start: this.scrollTrigger.start,
                end: this.scrollTrigger.end,
            });
        }
    }
    
    setupRotateAnimation() {
        if (this.autoplay) {
            this.animate();
        }
    }
    
    setupFollowAnimation() {
        let mouseX = 0;
        let targetFrame = 1;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            targetFrame = Math.floor((mouseX / window.innerWidth) * this.frameCount) + 1;
            targetFrame = Math.max(1, Math.min(targetFrame, this.frameCount));
        });
        
        const smoothFollow = () => {
            this.imageSeq.frame += (targetFrame - this.imageSeq.frame) * 0.1;
            this.render();
            requestAnimationFrame(smoothFollow);
        };
        
        smoothFollow();
    }
    
    animate() {
        this.rotation += 0.5;
        this.imageSeq.frame = Math.floor((this.rotation % 360) / 360 * this.frameCount) + 1;
        this.render();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    render() {
        if (!this.isLoaded) return;
        
        const currentImage = this.images[Math.floor(this.imageSeq.frame - 1)];
        if (currentImage && currentImage.complete) {
            this.scaleImage(currentImage, this.context);
        }
    }
    
    scaleImage(img, ctx) {
        const canvas = ctx.canvas;
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        let ratio = Math.max(hRatio, vRatio);
        
        if (window.innerWidth > 768 && this.size === 'full') {
            ratio *= 0.95;
        }
        
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0, 0,
            img.width, img.height,
            centerShift_x, centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Kill ScrollTrigger instances
        if (this.scrollTrigger) {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === this.canvas || 
                    trigger.vars.trigger === this.scrollTrigger.trigger) {
                    trigger.kill();
                }
            });
        }
    }
}

// Export for use in other scripts
window.SwordAnimation = SwordAnimation;