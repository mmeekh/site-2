// Çalışan Mouse Etkileşimli Particles.js - Sword Nest
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Enhanced Particles başlatılıyor...');
    
    // Particles.js'nin yüklenmesini bekle
    setTimeout(function() {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 200,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#38BDF8", "#38A169", "#F97316"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.6,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.2,
                        "sync": false
                    }
                },
                "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#38BDF8",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 250,
                        "line_linked": {
                            "opacity": 0.8,
                            "color": "#F97316"
                        }
                    },
                    "bubble": {
                        "distance": 200,
                        "size": 8,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
        
        // Mouse etkileşimini manuel olarak test et
        setTimeout(function() {
            const canvas = document.querySelector('#particles-js canvas');
            if (canvas) {
                console.log('✅ Canvas bulundu, mouse events ekleniyor...');
                
                // Canvas'ın pointer events'ini etkinleştir
                canvas.style.pointerEvents = 'auto';
                canvas.style.position = 'relative';
                canvas.style.zIndex = '10';
                
                // Test mouse events
                canvas.addEventListener('mouseenter', function() {
                    console.log('🎯 Mouse canvas üzerinde!');
                    canvas.style.cursor = 'crosshair';
                });
                
                canvas.addEventListener('mousemove', function(e) {
                    // Mouse pozisyonunu göster (debug için)
                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    // console.log(`Mouse: ${x}, ${y}`); // Çok fazla log olmasın diye yorumladım
                });
                
                canvas.addEventListener('click', function(e) {
                    console.log('🔥 Canvas tıklandı! Yeni parçacıklar ekleniyor...');
                });
                
                canvas.addEventListener('mouseleave', function() {
                    canvas.style.cursor = 'default';
                });
                
                console.log('🎉 Mouse etkileşimi aktif!');
            } else {
                console.error('❌ Canvas bulunamadı!');
            }
        }, 1000);
        
    }, 500);
});

// Extra: Window resize'da particles'i yenile
window.addEventListener('resize', function() {
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.fn.canvasSize();
        window.pJSDom[0].pJS.fn.canvasPaint();
    }
});

console.log('🗡️ Sword Nest Particles Script Yüklendi!');