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
    const header = document.querySelector('header');
    const heroSlides = document.querySelectorAll('.slide');
    const slidePrev = document.querySelector('.slide-prev');
    const slideNext = document.querySelector('.slide-next');
    
    // Variáveis para controle
    let currentSlide = 0;
    let currentHeroSlide = 0;
    const slideCount = carouselSlides.length;
    const heroSlideCount = heroSlides.length;
    let carouselIndicators;
    let heroSlideInterval;
    
    // Preloader
    function simulateLoading() {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('loaded');
                    startHeroSlideshow();
                }, 500);
            } else {
                width += 2;
                progressBar.style.width = `${width}%`;
            }
        }, 40);
    }
    
    simulateLoading();
    
    // Header scroll effect
    function updateHeaderBackground() {
        if (window.scrollY > window.innerHeight * 0.5) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderBackground);
    updateHeaderBackground();
    
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
        
        // Configurar largura de cada slide
        carouselSlides.forEach(slide => {
            slide.style.width = `${100 / slideCount}%`;
        });
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
    
    // Hero slideshow
    function startHeroSlideshow() {
        heroSlideInterval = setInterval(() => {
            moveToHeroSlide(currentHeroSlide + 1);
        }, 5000);
    }
    
    function moveToHeroSlide(slideIndex) {
        if (slideIndex < 0) {
            slideIndex = heroSlideCount - 1;
        } else if (slideIndex >= heroSlideCount) {
            slideIndex = 0;
        }
        
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroSlides[slideIndex].classList.add('active');
        currentHeroSlide = slideIndex;
    }
    
    slidePrev.addEventListener('click', function() {
        clearInterval(heroSlideInterval);
        moveToHeroSlide(currentHeroSlide - 1);
        startHeroSlideshow();
    });
    
    slideNext.addEventListener('click', function() {
        clearInterval(heroSlideInterval);
        moveToHeroSlide(currentHeroSlide + 1);
        startHeroSlideshow();
    });
    
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

// Inicializar efeitos de construção
function initConstructionEffects() {
    // Criar elementos de construção dinâmicos
    createFloatingElements();
    
    // Iniciar animações
    startConstructionAnimations();
}

function createFloatingElements() {
    const constructionElements = document.querySelector('.construction-elements');
    
    // Adicionar mais elementos flutuantes
    for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.classList.add('construction-element');
        element.style.left = `${Math.random() * 100}%`;
        element.style.bottom = `${20 + Math.random() * 30}%`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        element.style.width = `${10 + Math.random() * 30}px`;
        element.style.height = `${2 + Math.random() * 4}px`;
        element.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        element.style.position = 'absolute';
        element.style.animation = `floatElement ${10 + Math.random() * 10}s infinite ease-in-out`;
        
        constructionElements.appendChild(element);
    }
}

function startConstructionAnimations() {
    // Adicionar estilos para animação flutuante
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatElement {
            0%, 100% { 
                transform: translateY(0) rotate(0deg); 
                opacity: 0.6;
            }
            25% { 
                transform: translateY(-10px) rotate(90deg); 
                opacity: 0.8;
            }
            50% { 
                transform: translateY(-20px) rotate(180deg); 
                opacity: 1;
            }
            75% { 
                transform: translateY(-10px) rotate(270deg); 
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(style);
}

// Chamar a função de inicialização
initConstructionEffects();