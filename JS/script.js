document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        startEvent: 'load',
        offset: 50
      });

      function createObserver(selector, className) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                }
            });
        });

        document.querySelectorAll(selector).forEach(el => observer.observe(el));
    }

    createObserver('.ani1', 'aos1');
    createObserver('.ani2', 'aos2');
    createObserver('.ani3', 'aos3');
    createObserver('.ani4', 'aos4');

    function topMargin(className) {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            navbar.style.transition = "background-color 0.5s ease";

            if (window.scrollY > 300) {
                navbar.style.position = 'fixed';
                navbar.style.top = '0';
                navbar.style.left = '0';
                navbar.style.backgroundColor = "maroon";
                navbar.style.width = '100%'
                document.querySelector(`${className}`).classList.add('top-margin')
            } else {
                navbar.style.width = '100%'
                navbar.style.backgroundColor = "transparent";
                document.querySelector(`${className}`).classList.remove('top-margin')
            }
        });
    }

    if (document.querySelector('.propular-properties')) {
        topMargin('.propular-properties');
    }

    if (document.querySelector('.contact-form')) {
        topMargin('.contact-form');
    }

    if (document.querySelector('.items')) {
        topMargin('.items')
    }

    document.querySelectorAll('.video-item').forEach(item => {
        item.addEventListener('click', function (e) {
            const videoContainer = e.currentTarget;
            if (videoContainer.classList.contains('fullscreen')) {
                videoContainer.classList.remove('fullscreen');
                document.body.style.overflow = ''; 
            } else {
                document.querySelectorAll('.video-item').forEach(v => v.classList.remove('fullscreen'));
                videoContainer.classList.add('fullscreen');
                document.body.style.overflow = 'hidden';
            }
        });
    });

});