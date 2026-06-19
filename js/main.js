const WHATSAPP_NUMBER = '573104622183';
const WHATSAPP_BASE_URL = 'https://wa.me/';

const WHATSAPP_MESSAGES = {
    contacto: 'Hola, quiero información sobre los servicios de Donde Concha Car Wash & Café.',
    reservar: 'Hola, quiero agendar un lavado en Donde Concha (Armenia, Quindío).',
    soporte: 'Hola, tengo una consulta sobre mi servicio en Donde Concha.'
};

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Cra.+6+%2317+Norte+-56+Armenia+Quindio+Colombia';
const INSTAGRAM_URL = 'https://www.instagram.com/DONDECONCHACARWASH';

const utils = {
    validatePhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone.replace(/\s+/g, ''));
    },

    showError(input, message) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            input.classList.add('border-red-500');
        }
    },

    clearError(input) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = '';
            input.classList.remove('border-red-500');
        }
    },

    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        this.clearError(input);

        if (input.hasAttribute('required') && !value) {
            this.showError(input, 'Este campo es obligatorio');
            isValid = false;
        }

        if (input.type === 'tel' && value && !this.validatePhone(value)) {
            this.showError(input, 'Ingresa un teléfono válido (10 dígitos)');
            isValid = false;
        }

        if (input.tagName === 'SELECT' && input.hasAttribute('required') && !value) {
            this.showError(input, 'Selecciona una opción');
            isValid = false;
        }

        return isValid;
    }
};

const whatsapp = {
    openWhatsApp(type = 'contacto') {
        const message = encodeURIComponent(WHATSAPP_MESSAGES[type] || WHATSAPP_MESSAGES.contacto);
        window.open(`${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    },

    openWithMessage(message) {
        window.open(`${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    }
};

const navigation = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
                    menu.toggle(false);
                    navigation.setActive(href);
                }
            });
        });

        window.addEventListener('scroll', () => navigation.updateActiveOnScroll());
        navigation.updateActiveOnScroll();
    },

    setActive(href) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === href);
        });
    },

    updateActiveOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const scrollPosition = window.scrollY + headerHeight + 120;

        let current = '#inicio';
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                current = `#${section.getAttribute('id')}`;
            }
        });
        navigation.setActive(current);
    }
};

const menu = {
    init() {
        const menuToggle = document.getElementById('menuToggle');
        const closeMenu = document.getElementById('closeMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const navMenu = document.getElementById('navMenu');

        if (menuToggle) menuToggle.addEventListener('click', () => this.toggle());
        if (closeMenu) closeMenu.addEventListener('click', () => this.toggle(false));
        if (menuOverlay) menuOverlay.addEventListener('click', () => this.toggle(false));

        if (navMenu) {
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.toggle(false));
            });
        }
    },

    toggle(force) {
        const navMenu = document.getElementById('navMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const menuToggle = document.getElementById('menuToggle');

        if (!navMenu) return;

        const shouldOpen = force !== undefined ? force : navMenu.classList.contains('translate-x-full');

        if (shouldOpen) {
            navMenu.classList.remove('translate-x-full');
            menuOverlay?.classList.replace('opacity-0', 'opacity-100');
            menuOverlay?.classList.replace('invisible', 'visible');
            menuToggle?.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        } else {
            navMenu.classList.add('translate-x-full');
            menuOverlay?.classList.replace('opacity-100', 'opacity-0');
            menuOverlay?.classList.replace('visible', 'invisible');
            menuToggle?.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
};

const scrollAnimations = {
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.feature-card, .description-item, .benefit-card, .pricing-card').forEach(el => {
            observer.observe(el);
        });
    }
};

const forms = {
    init() {
        const demoForm = document.getElementById('demoForm');
        if (!demoForm) return;

        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleReservation(demoForm);
        });

        demoForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('blur', () => utils.validateField(input));
        });
    },

    validateForm(form) {
        let isValid = true;
        form.querySelectorAll('input[required], textarea[required], select[required]').forEach(input => {
            if (!utils.validateField(input)) isValid = false;
        });
        return isValid;
    },

    showMessage(type, message) {
        const el = document.getElementById('demoFormMessage');
        if (!el) return;

        el.className = 'mt-2 p-4 rounded-lg text-center font-medium text-sm';
        el.classList.add(type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300');
        el.textContent = message;
    },

    handleReservation(form) {
        if (!this.validateForm(form)) {
            this.showMessage('error', 'Por favor, completa todos los campos correctamente.');
            return;
        }

        const name = document.getElementById('demoName').value.trim();
        const phone = document.getElementById('demoPhone').value.trim();
        const vehicle = document.getElementById('demoVehicle').value.trim();
        const service = document.getElementById('demoService').value;
        const message = document.getElementById('demoMessage').value.trim();

        let text = `Hola, quiero agendar un servicio en Donde Concha Car Wash & Café.\n\n`;
        text += `*Nombre:* ${name}\n*Teléfono:* ${phone}\n*Vehículo:* ${vehicle}\n*Servicio:* ${service}`;
        if (message) text += `\n*Mensaje:* ${message}`;

        whatsapp.openWithMessage(text);
        this.showMessage('success', 'Te estamos redirigiendo a WhatsApp para confirmar tu reserva.');
        form.reset();
    }
};

const buttons = {
    init() {
        const scrollTo = (id) => {
            const section = document.getElementById(id);
            if (!section) return;
            const header = document.querySelector('header');
            const h = header ? header.offsetHeight : 0;
            window.scrollTo({ top: section.offsetTop - h, behavior: 'smooth' });
            menu.toggle(false);
        };

        ['btnSolicitarDemo', 'btnSolicitarDemoMobile', 'btnHeroReservar', 'btnFooterReservar'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.addEventListener('click', () => scrollTo('contacto'));
        });

        [
            ['btnContactoWhatsAppMobile', 'contacto'],
            ['btnHeroWhatsApp', 'reservar'],
            ['btnFooterContacto', 'contacto'],
            ['btnFloatWhatsApp', 'contacto']
        ].forEach(([id, type]) => {
            const btn = document.getElementById(id);
            if (btn) btn.addEventListener('click', () => whatsapp.openWhatsApp(type));
        });

        ['btnMaps', 'btnMapsFooter'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.addEventListener('click', () => window.open(MAPS_URL, '_blank'));
        });

        const btnInstagram = document.getElementById('btnInstagram');
        if (btnInstagram) btnInstagram.addEventListener('click', () => window.open(INSTAGRAM_URL, '_blank'));
    }
};

document.addEventListener('DOMContentLoaded', () => {
    navigation.init();
    menu.init();
    scrollAnimations.init();
    forms.init();
    buttons.init();
});
