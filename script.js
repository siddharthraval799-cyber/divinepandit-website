// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Dropdown Toggle for Mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                // Prevent default if clicking the link itself to just open dropdown
                if (e.target.tagName.toLowerCase() === 'a' && e.target.nextElementSibling) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            }
        });
    });

    // Simple sticky header effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // Counter Animation for Achievements
    const counters = document.querySelectorAll('.counter');
    const speed = 50; 

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            
            const rect = counter.getBoundingClientRect();
            if(rect.top < window.innerHeight && counter.innerText === '0') {
                updateCount();
            }
        });
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters(); 

    // WhatsApp Booking Form Submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('b_name').value;
            const email = document.getElementById('b_email').value;
            const phone = document.getElementById('b_phone').value;
            const puja = document.getElementById('b_puja').value;
            const other = document.getElementById('b_other').value;
            
            let samagri = 'Yes';
            const samagriRadios = document.getElementsByName('b_samagri');
            for(let radio of samagriRadios) {
                if(radio.checked) {
                    samagri = radio.value;
                    break;
                }
            }
            
            const date = document.getElementById('b_date').value;
            const address = document.getElementById('b_address').value;
            const detail = document.getElementById('b_detail').value;

            let message = `*New Puja Booking Request*\n\n`;
            message += `*Name:* ${name}\n`;
            if(email) message += `*Email:* ${email}\n`;
            message += `*Phone:* ${phone}\n`;
            message += `*Puja:* ${puja}\n`;
            if(other) message += `*Other Service:* ${other}\n`;
            message += `*With Samagri:* ${samagri}\n`;
            message += `*Date:* ${date}\n`;
            message += `*Address:* ${address}\n`;
            if(detail) message += `*Details:* ${detail}\n`;

            const whatsappNumber = "916356647453";
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
});
