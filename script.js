// ===== NAVIGATION SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ajouter/retirer classe scrolled
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(10, 10, 10, 0.98)';
        navLinks.style.backdropFilter = 'blur(10px)';
        navLinks.style.padding = '20px';
        navLinks.style.gap = '15px';
        navLinks.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
        navLinks.style.zIndex = '1000';
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Fermer le menu mobile si ouvert
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMATION AU SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Observer les cartes de service
            if(entry.target.classList.contains('service-card')) {
                const delay = Math.random() * 0.3;
                entry.target.style.transitionDelay = `${delay}s`;
            }
            
            // Observer les éléments portfolio
            if(entry.target.classList.contains('portfolio-item')) {
                const delay = Math.random() * 0.3;
                entry.target.style.transitionDelay = `${delay}s`;
            }
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Classe pour l'animation
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== FORMULAIRE DE CONTACT =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        const originalBg = submitBtn.style.background;
        
        // Désactiver le bouton
        submitBtn.disabled = true;
        
        // Animation de chargement
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVOI EN COURS...';
        
        // Simuler l'envoi (à remplacer par votre script réel)
        setTimeout(() => {
            // Réussite
            showNotification('✅ Votre message a été envoyé avec succès !', 'success');
            
            // Réinitialiser le formulaire
            this.reset();
            
            // Réactiver le bouton
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = originalBg;
            
        }, 2000);
    });
}

// ===== FONCTION DE NOTIFICATION =====
function showNotification(message, type = 'success') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Créer la nouvelle notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Icône selon le type
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    notification.innerHTML = `<i class="${icon}"></i> ${message}`;
    
    // Style selon le type
    if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #FF3366, #FF0000)';
    }
    
    document.body.appendChild(notification);
    
    // Supprimer après 4 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== ANIMATION DU HERO =====
document.addEventListener('DOMContentLoaded', () => {
    // Animer le titre principal
    const heroTitle = document.querySelector('.hero-title');
    if(heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animer la description
    const heroDescription = document.querySelector('.hero-description');
    if(heroDescription) {
        heroDescription.style.opacity = '0';
        
        setTimeout(() => {
            heroDescription.style.transition = 'all 1s ease 0.3s';
            heroDescription.style.opacity = '1';
        }, 300);
    }
});

// ===== EFFET PARALLAX SUR LA HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if(hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== ANIMATION DES COMPÉTENCES =====
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const percentage = item.getAttribute('data-percent');
        const fill = item.querySelector('.skill-fill');
        
        // Animer la barre de compétence
        setTimeout(() => {
            fill.style.width = percentage + '%';
        }, 300);
    });
}

// Observer la section compétences
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.5 });

// Observer la section compétences si elle existe
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ===== LAZY LOADING DES IMAGES =====
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

// Observer toutes les images avec data-src
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});