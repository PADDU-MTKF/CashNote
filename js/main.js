document.addEventListener('DOMContentLoaded', () => {
    // Basic active link setting
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Theme Toggle Logic
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for preference, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    updateImages(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
        
        updateThemeIcon(targetTheme);
        updateImages(targetTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    function updateImages(theme) {
        // Find all images that have /dark/ or /light/ in their src path
        const themeImages = document.querySelectorAll('img[src*="/dark/"], img[src*="/light/"]');
        
        themeImages.forEach(img => {
            const currentSrc = img.getAttribute('src');
            let newSrc;
            
            if (theme === 'light') {
                newSrc = currentSrc.replace('/dark/', '/light/');
            } else {
                newSrc = currentSrc.replace('/light/', '/dark/');
            }
            
            img.setAttribute('src', newSrc);
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinksContainer.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
});
