// Carrusel de imágenes
const carruselInner = document.querySelector('.carrusel-inner');
const prevBtn = document.querySelector('.carrusel-btn.prev');
const nextBtn = document.querySelector('.carrusel-btn.next');
const indicatorsContainer = document.querySelector('.carrusel-indicators');
let currentIndex = 0;
let autoplayInterval;

// Función para mover el carrusel con desvanecido
function moveCarrusel() {
    const items = document.querySelectorAll('.carrusel-item');
    
    // Oculta todas las imágenes
    items.forEach(item => {
        item.classList.remove('active');
        item.style.opacity = 0;
    });

    // Muestra la imagen actual
    items[currentIndex].classList.add('active');
    items[currentIndex].style.opacity = 1;

    updateIndicators();
}

// Función para actualizar los indicadores
function updateIndicators() {
    const indicators = document.querySelectorAll('.carrusel-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Crear indicadores
function createIndicators() {
    for (let i = 0; i < carruselInner.children.length; i++) {
        const indicator = document.createElement('span');
        indicator.classList.add('carrusel-indicator');
        indicator.addEventListener('click', () => {
            currentIndex = i;
            moveCarrusel();
        });
        indicatorsContainer.appendChild(indicator);
    }
    updateIndicators();
}

// Evento para el botón "anterior"
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = carruselInner.children.length - 1;
    }
    moveCarrusel();
});

// Evento para el botón "siguiente"
nextBtn.addEventListener('click', () => {
    if (currentIndex < carruselInner.children.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    moveCarrusel();
});

// Autoplay con pausa al hover
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        if (currentIndex < carruselInner.children.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        moveCarrusel();
    }, 5000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

carruselInner.addEventListener('mouseenter', stopAutoplay);
carruselInner.addEventListener('mouseleave', startAutoplay);

// Iniciar autoplay y crear indicadores al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    createIndicators();
    moveCarrusel(); // Mostrar la primera imagen al cargar
    startAutoplay();
});

// Animaciones de scroll para los álbumes
const albums = document.querySelectorAll('.album');
const carrusel = document.querySelector('.carrusel');

// Observador para los álbumes (aparecer al hacer scroll-down)
const albumObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Muestra el álbum cuando está visible
        } else {
            entry.target.classList.remove('visible'); // Oculta el álbum cuando no está visible
        }
    });
}, {
    threshold: 0.2 // Ajusta el umbral para que las animaciones se activen cuando el elemento esté parcialmente visible
});

// Observador para el carrusel (ocultar los álbumes cuando el carrusel esté visible)
const carruselObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Ocultar todos los álbumes cuando el carrusel esté visible
            albums.forEach(album => {
                album.classList.remove('visible');
            });
        }
    });
}, {
    threshold: 0.5 // Ajusta el umbral para que se active cuando el carrusel esté en la mitad de la pantalla
});

// Observar cada álbum
albums.forEach(album => {
    albumObserver.observe(album);
});

// Observar el carrusel
carruselObserver.observe(carrusel);

// Responsividad del encabezado
function handleHeaderResponsive() {
    const navLinks = document.querySelector('.nav-links');
    const navIcons = document.querySelector('.nav-icons');
    const logo = document.querySelector('.logo');

    if (window.innerWidth <= 768) {
        // Ocultar enlaces y mostrar un menú desplegable (puedes implementar un menú hamburguesa si lo deseas)
        navLinks.style.display = 'none';
        navIcons.style.flex = '1';
        navIcons.style.justifyContent = 'flex-end';
        logo.style.flex = '1';
    } else {
        // Restaurar el diseño original en pantallas más grandes
        navLinks.style.display = 'flex';
        navIcons.style.flex = '0';
        logo.style.flex = '0';
    }
}

// Escuchar cambios en el tamaño de la ventana
window.addEventListener('resize', handleHeaderResponsive);

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', handleHeaderResponsive);