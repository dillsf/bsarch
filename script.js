document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuToggle = document.getElementById('menu-toggle');
    const servicesToggle = document.getElementById('services-toggle');
    const closeMenu = document.getElementById('close-menu');
    const closeServices = document.getElementById('close-services');
    const mainMenu = document.getElementById('main-menu');
    const servicesPanel = document.getElementById('services-panel');
    const readMoreBtn = document.querySelector('.read-more-btn');
    const moreText = document.querySelector('.more-text');
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.preloader-progress-bar');
    
    // Variáveis para controle do carrossel
    let currentSlide = 0;
    const slideCount = carouselSlides.length;
    let carouselIndicators;
    
    // Inicializar partículas
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 30,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#000000"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#000000",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
    
    // Preloader
    function simulateLoading() {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('loaded');
                }, 500);
            } else {
                width += 2;
                progressBar.style.width = `${width}%`;
            }
        }, 40);
    }
    
    simulateLoading();
    
    // Alternar menu principal
    function toggleMenu() {
        mainMenu.classList.toggle('active');
        servicesPanel.classList.remove('active');
        
        if (mainMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);
    
    // Alternar painel de serviços
    function toggleServices() {
        servicesPanel.classList.toggle('active');
        mainMenu.classList.remove('active');
        
        if (servicesPanel.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            initCarouselIndicators();
        } else {
            document.body.style.overflow = 'auto';
        }
    }
    
    servicesToggle.addEventListener('click', toggleServices);
    closeServices.addEventListener('click', toggleServices);
    
    // Botão "Ler mais"
    readMoreBtn.addEventListener('click', function() {
        moreText.classList.toggle('expanded');
        readMoreBtn.classList.toggle('expanded');
        
        if (moreText.classList.contains('expanded')) {
            readMoreBtn.textContent = 'Ler menos';
        } else {
            readMoreBtn.textContent = 'Ler mais';
        }
    });
    
    // Inicializar indicadores do carrossel
    function initCarouselIndicators() {
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < slideCount; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (i === currentSlide) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => moveToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
        
        carouselIndicators = document.querySelectorAll('.carousel-indicator');
    }
    
    // Configurar largura do track do carrossel
    function setCarouselTrackWidth() {
        const trackWidth = slideCount * 100;
        carouselTrack.style.width = `${trackWidth}%`;
    }
    
    // Mover carrossel para um slide específico
    function moveToSlide(slideIndex) {
        if (slideIndex < 0) {
            slideIndex = slideCount - 1;
        } else if (slideIndex >= slideCount) {
            slideIndex = 0;
        }
        
        carouselTrack.style.transform = `translateX(-${slideIndex * (100 / slideCount)}%)`;
        currentSlide = slideIndex;
        
        // Atualizar indicadores
        if (carouselIndicators) {
            carouselIndicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    }
    
    // Navegação do carrossel
    prevBtn.addEventListener('click', function() {
        moveToSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        moveToSlide(currentSlide + 1);
    });
    
    // Inicializar carrossel
    setCarouselTrackWidth();
    
    // Fechar menus ao clicar fora deles
    document.addEventListener('click', function(event) {
        const isMenuClick = mainMenu.contains(event.target) || menuToggle.contains(event.target);
        const isServicesClick = servicesPanel.contains(event.target) || servicesToggle.contains(event.target);
        
        if (!isMenuClick && mainMenu.classList.contains('active')) {
            toggleMenu();
        }
        
        if (!isServicesClick && servicesPanel.classList.contains('active')) {
            toggleServices();
        }
    });
    
    // Efeito de revelação ao scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll('.about, .projects, .project-item, .design-matters, .award-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estilos para animação de scroll
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.about, .projects, .project-item, .design-matters, .award-item');
        
        elements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        window.addEventListener('scroll', revealOnScroll);
        // Verificar na carga inicial
        revealOnScroll();
    }
    
    initScrollAnimations();
    
    // Header transparente no hero
    function updateHeaderBackground() {
        const header = document.querySelector('header');
        const heroSection = document.querySelector('.hero');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (window.scrollY > heroBottom - 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    }
    
    window.addEventListener('scroll', updateHeaderBackground);
    updateHeaderBackground();
    
    // Submenus para mobile
    function initSubmenus() {
        if (window.innerWidth <= 768) {
            const menuItems = document.querySelectorAll('.main-menu > ul > li');
            
            menuItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    if (e.target.tagName === 'A') {
                        e.preventDefault();
                        const submenu = this.querySelector('.submenu');
                        
                        if (submenu) {
                            const isExpanded = submenu.style.maxHeight && submenu.style.maxHeight !== '0px';
                            
                            // Fechar todos os submenus primeiro
                            document.querySelectorAll('.submenu').forEach(sub => {
                                if (sub !== submenu) {
                                    sub.style.maxHeight = '0px';
                                }
                            });
                            
                            // Alternar o submenu atual
                            if (isExpanded) {
                                submenu.style.maxHeight = '0px';
                            } else {
                                submenu.style.maxHeight = submenu.scrollHeight + 'px';
                            }
                        }
                    }
                });
            });
        }
    }
    
    initSubmenus();
    window.addEventListener('resize', initSubmenus);
});