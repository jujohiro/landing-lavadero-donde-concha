const WHATSAPP_NUMBER = '573126411889';
const WHATSAPP_BASE_URL = 'https://wa.me/';

const WHATSAPP_MESSAGES = {
    contacto: 'Hola, quiero información sobre los servicios de Donde Concha Car Wash & Café.',
    reservar: 'Hola, quiero agendar un lavado en Donde Concha (Armenia, Quindío).',
    soporte: 'Hola, tengo una consulta sobre mi servicio en Donde Concha.'
};

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Avenida+Centenario+Calle+17+Norte+Armenia+Quindio+Colombia';
const INSTAGRAM_URL = 'https://www.instagram.com/DONDECONCHACARWASH';

const utils = {
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    validatePhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone.replace(/\s+/g, ''));
    },

    formatPhone(phone) {
        return phone.replace(/\D/g, '');
    },

    showError(input, message) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            input.classList.add('border-red-500', 'dark:border-red-500');
            input.classList.remove('border-gray-300', 'dark:border-gray-600');
        }
    },

    clearError(input) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = '';
            input.classList.remove('border-red-500', 'dark:border-red-500');
            input.classList.add('border-gray-300', 'dark:border-gray-600');
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

        if (input.type === 'email' && value && !this.validateEmail(value)) {
            this.showError(input, 'Ingresa un email válido');
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
        const url = `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, '_blank');
    },

    openWithMessage(message) {
        const encodedMessage = encodeURIComponent(message);
        const url = `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(url, '_blank');
    }
};

const theme = {
    init() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        } else {
            document.documentElement.classList.toggle('dark', systemPrefersDark);
        }

        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggle();
            });
        }
    },

    toggle() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
};

const navigation = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#header') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    menu.toggle(false);
                    navigation.updateActiveState(href);
                }
            });
        });

        window.addEventListener('scroll', () => {
            navigation.updateActiveOnScroll();
        });

        navigation.updateActiveOnScroll();
    },

    updateActiveState(href) {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.classList.remove('text-primary', 'dark:text-primary');
            if (link.getAttribute('href') === href) {
                link.classList.add('text-primary', 'dark:text-primary');
            }
        });
    },

    updateActiveOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const scrollPosition = window.scrollY + headerHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('a[href^="#"]').forEach(link => {
                    link.classList.remove('text-primary', 'dark:text-primary');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-primary', 'dark:text-primary');
                    }
                });
            }
        });
    }
};

const menu = {
    init() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const closeMenu = document.getElementById('closeMenu');
        const menuOverlay = document.getElementById('menuOverlay');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                this.toggle();
            });

            if (closeMenu) {
                closeMenu.addEventListener('click', () => {
                    this.toggle(false);
                });
            }

            if (menuOverlay) {
                menuOverlay.addEventListener('click', () => {
                    this.toggle(false);
                });
            }

            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    this.toggle(false);
                });
            });
        }
    },

    toggle(force) {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const menuOverlay = document.getElementById('menuOverlay');

        if (navMenu) {
            const isActive = !navMenu.classList.contains('translate-x-full');
            const shouldBeActive = force !== undefined ? force : !isActive;

            if (shouldBeActive) {
                navMenu.classList.remove('translate-x-full');
                if (menuOverlay) {
                    menuOverlay.classList.remove('opacity-0', 'invisible');
                    menuOverlay.classList.add('opacity-100', 'visible');
                }
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'true');
                }
                document.body.style.overflow = 'hidden';
            } else {
                navMenu.classList.add('translate-x-full');
                if (menuOverlay) {
                    menuOverlay.classList.add('opacity-0', 'invisible');
                    menuOverlay.classList.remove('opacity-100', 'visible');
                }
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
                document.body.style.overflow = '';
            }
        }
    }
};

const scrollAnimations = {
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .description-item, .benefit-card, .pricing-card').forEach(el => {
            observer.observe(el);
        });
    }
};

const forms = {
    init() {
        const demoForm = document.getElementById('demoForm');
        if (demoForm) {
            demoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleReservation(demoForm);
            });

            demoForm.querySelectorAll('input, textarea, select').forEach(input => {
                input.addEventListener('blur', () => {
                    utils.validateField(input);
                });
            });
        }
    },

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

        inputs.forEach(input => {
            if (!utils.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    },

    showMessage(type, message) {
        const messageElement = document.getElementById('demoFormMessage');
        if (messageElement) {
            messageElement.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800', 'dark:bg-green-900', 'dark:text-green-200', 'dark:bg-red-900', 'dark:text-red-200');

            if (type === 'success') {
                messageElement.classList.add('bg-green-100', 'text-green-800', 'dark:bg-green-900', 'dark:text-green-200');
            } else {
                messageElement.classList.add('bg-red-100', 'text-red-800', 'dark:bg-red-900', 'dark:text-red-200');
            }

            messageElement.textContent = message;
            messageElement.classList.remove('hidden');
        }
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
        text += `*Nombre:* ${name}\n`;
        text += `*Teléfono:* ${phone}\n`;
        text += `*Vehículo:* ${vehicle}\n`;
        text += `*Servicio:* ${service}`;

        if (message) {
            text += `\n*Mensaje:* ${message}`;
        }

        whatsapp.openWithMessage(text);
        this.showMessage('success', 'Te estamos redirigiendo a WhatsApp para confirmar tu reserva.');
        form.reset();
    }
};

const buttons = {
    init() {
        const scrollToSection = (id) => {
            const section = document.getElementById(id);
            if (section) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                window.scrollTo({ top: section.offsetTop - headerHeight, behavior: 'smooth' });
                menu.toggle(false);
            }
        };

        const btnReservar = document.getElementById('btnSolicitarDemo');
        const btnReservarMobile = document.getElementById('btnSolicitarDemoMobile');

        if (btnReservar) btnReservar.addEventListener('click', () => scrollToSection('contacto'));
        if (btnReservarMobile) btnReservarMobile.addEventListener('click', () => scrollToSection('contacto'));

        const whatsappButtons = [
            ['btnContactoWhatsApp', 'contacto'],
            ['btnContactoWhatsAppMobile', 'contacto'],
            ['btnHeroWhatsApp', 'reservar'],
            ['btnFooterContacto', 'contacto'],
            ['btnFooterReservar', 'reservar']
        ];

        whatsappButtons.forEach(([id, type]) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => whatsapp.openWhatsApp(type));
            }
        });

        const mapsButtons = ['btnMaps', 'btnMapsFooter'];
        mapsButtons.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => window.open(MAPS_URL, '_blank'));
            }
        });

        const btnInstagram = document.getElementById('btnInstagram');
        if (btnInstagram) {
            btnInstagram.addEventListener('click', () => window.open(INSTAGRAM_URL, '_blank'));
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    theme.init();
    navigation.init();
    menu.init();
    scrollAnimations.init();
    forms.init();
    buttons.init();
});
