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

    // Dropdown and Submenu Toggle for Mobile
    const dropdowns = document.querySelectorAll('.dropdown, .dropdown-submenu');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                // Find the closest anchor tag that was clicked
                const targetLink = e.target.closest('a');
                
                // If we clicked a link and it has a submenu next to it
                if (targetLink && targetLink.nextElementSibling && targetLink.nextElementSibling.tagName.toLowerCase() === 'ul') {
                    // Prevent navigation and stop event from bubbling up to parent dropdowns
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle the 'active' class on the current dropdown/submenu to show/hide its child ul
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

// Premium Modal Logic
const serviceData = {
    bhagwat: {
        title: "Bhagwat Katha",
        image: "assets/images/service_bhagwat_1779175597690.png",
        price: "Price: On Request",
        desc: "Perform Bhagwat Katha with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Ensures peace and harmony.", "Removes obstacles and negative energies.", "Attracts health, wealth, and prosperity.", "Authentic Vedic rituals performed by expert Pandits."]
    },
    shivpuran: {
        title: "Shiv Maha Puran",
        image: "assets/images/99p_rudrabhishekpuja.webp",
        price: "Price: On Request",
        desc: "Perform Shiv Maha Puran with our experienced Pandits to seek divine blessings. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Ensures peace and harmony.", "Removes obstacles and negative energies.", "Attracts health, wealth, and prosperity.", "Authentic Vedic rituals performed by expert Pandits."]
    },
    ramkatha: {
        title: "Ram Katha",
        image: "assets/images/puja_vishnu.png",
        price: "Price: On Request",
        desc: "Perform Ram Katha with our experienced Pandits to seek divine blessings. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Ensures peace and harmony.", "Removes obstacles and negative energies.", "Attracts health, wealth, and prosperity.", "Authentic Vedic rituals performed by expert Pandits."]
    },
    devibhagwat: {
        title: "Shrimad Devi Bhagwat Puran",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Shrimad Devi Bhagwat Puran with our experienced Pandits. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Ensures peace and harmony.", "Removes obstacles and negative energies.", "Attracts health, wealth, and prosperity.", "Authentic Vedic rituals performed by expert Pandits."]
    },
    narayanbali: {
        title: "Narayanbali Pitrushraddh Vidhi",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Narayanbali Pitrushraddh Vidhi with our experienced Pandits. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Ensures peace for ancestors.", "Removes Pitru Dosh.", "Attracts prosperity.", "Authentic Vedic rituals performed by expert Pandits."]
    },
    kaalsarp: {
        title: "Kaal Sarp Yog",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Kaal Sarp Yog Puja to alleviate the negative effects of Kaal Sarp Dosh. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Removes Kaal Sarp Dosh.", "Brings peace and success.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    nakshatrashanti: {
        title: "Nakshatra Shanti",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Nakshatra Shanti Puja for malefic nakshatras. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Pacifies malefic nakshatras.", "Brings peace and success.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    vastushanti: {
        title: "Vastu Shanti",
        image: "assets/images/99p_grihapraveshpuja.webp",
        price: "Price: On Request",
        desc: "Perform Vastu Shanti Puja to remove Vastu Dosha. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Removes Vastu Dosha.", "Brings positive energy.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    navgrah: {
        title: "Nav Grah Shanti",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Nav Grah Shanti Puja to appease the nine planets. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Pacifies all nine planets.", "Removes obstacles.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    wedding: {
        title: "Marriage Ceremony",
        image: "assets/images/service_wedding_1779175635843.png",
        price: "Price: On Request",
        desc: "Perform Marriage Ceremony with our experienced Pandits to seek divine blessings. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Ensures a happy married life.", "Removes obstacles.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    shatchandi: {
        title: "Shat Chandi Yagna",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Shat Chandi Yagna for protection and success. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Removes negative energy.", "Brings victory.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    rudrahavan: {
        title: "Rudra Havan",
        image: "assets/images/99p_rudrabhishekpuja.webp",
        price: "Price: On Request",
        desc: "Perform Rudra Havan to seek the blessings of Lord Shiva. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Removes fear and disease.", "Brings peace.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    srisuktam: {
        title: "Sri Suktam Havan",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Sri Suktam Havan for wealth and prosperity. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Attracts wealth.", "Brings prosperity.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    mrityunjay: {
        title: "Maha Mrityunjay Jap",
        image: "assets/images/99p_rudrabhishekpuja.webp",
        price: "Price: On Request",
        desc: "Perform Maha Mrityunjay Jap for health and longevity. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Improves health.", "Removes fear of death.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    vishnuyagna: {
        title: "Vishnu Yagna",
        image: "assets/images/puja_vishnu.png",
        price: "Price: On Request",
        desc: "Perform Vishnu Yagna for peace and prosperity. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Ensures peace and harmony.", "Removes obstacles.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    ganeshyagna: {
        title: "Ganesh Yagna",
        image: "assets/images/puja_ganesha.png",
        price: "Price: On Request",
        desc: "Perform Ganesh Yagna for success in new ventures. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Removes obstacles.", "Brings success.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    navchandi: {
        title: "Navchandi Yagna",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Navchandi Yagna for protection and prosperity. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Removes negative energy.", "Brings prosperity.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    chaul: {
        title: "Chaul Sanskar",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Chaul Sanskar for your child's well-being. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Ensures good health.", "Brings prosperity.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    namkaran: {
        title: "Namkaran Sanskar",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Namkaran Sanskar for your child. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Auspicious naming.", "Brings good fortune.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    srimant: {
        title: "Srimant Sanskar",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Srimant Sanskar for a healthy baby. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Ensures healthy pregnancy.", "Brings peace.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    yagnopavit: {
        title: "Yagnopavit Sanskar",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Yagnopavit Sanskar. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Spiritual growth.", "Removes obstacles.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    ghatsthapna: {
        title: "Ghat Sthapna",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Ghat Sthapna for Navratri. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Invokes Goddess Durga.", "Brings prosperity.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    rudraabhishek: {
        title: "Rudra Abhishek",
        image: "assets/images/99p_rudrabhishekpuja.webp",
        price: "Price: On Request",
        desc: "Perform Rudra Abhishek for Lord Shiva. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Removes negative energy.", "Brings peace.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    laghurudra: {
        title: "Laghu Rudra",
        image: "assets/images/99p_rudrabhishekpuja.webp",
        price: "Price: On Request",
        desc: "Perform Laghu Rudra Puja. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Removes obstacles.", "Brings success.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    maharudra: {
        title: "Maha Rudra Pooja",
        image: "assets/images/99p_rudrabhishekpuja.webp",
        price: "Price: On Request",
        desc: "Perform Maha Rudra Pooja. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Brings immense peace.", "Removes all doshas.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    atirudra: {
        title: "Ati Rudra Pooja",
        image: "assets/images/99p_rudrabhishekpuja.webp",
        price: "Price: On Request",
        desc: "Perform Ati Rudra Pooja. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Brings universal peace.", "Removes karmic doshas.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    murtipranpratishtha: {
        title: "Murti Pranpratishtha",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Murti Pranpratishtha to invoke life in idols. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Invokes divine presence.", "Brings positive energy.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    office: {
        title: "Office Pooja",
        image: "assets/images/service_office_1779175653018.png",
        price: "Price: On Request",
        desc: "Perform Office Pooja for business success. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Brings business growth.", "Removes negative energy.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    diwali: {
        title: "Diwali Pooja",
        image: "assets/images/service_diwali_1779175619459.png",
        price: "Price: On Request",
        desc: "Perform Diwali Pooja for wealth and prosperity. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Attracts Goddess Lakshmi.", "Brings wealth.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    navratri: {
        title: "Navratri Pooja",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Navratri Pooja to seek blessings from Goddess Durga. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Removes negative energy.", "Brings prosperity.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    durga: {
        title: "Durga Pooja",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Durga Pooja for protection. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Protection from evil.", "Brings courage.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    lakshmi: {
        title: "Lakshmi Pooja",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Lakshmi Pooja for wealth. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Attracts wealth.", "Brings prosperity.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    vishwakarma: {
        title: "Vishwakarma Pooja",
        image: "assets/images/puja_kalash.png",
        price: "Price: On Request",
        desc: "Perform Vishwakarma Pooja for machinery and tools. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Brings success in work.", "Protects machinery.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    ganesh: {
        title: "Ganesh Pooja",
        image: "assets/images/puja_ganesha.png",
        price: "Price: On Request",
        desc: "Perform Ganesh Pooja for success and removal of obstacles. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Removes obstacles.", "Brings success.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    satyanarayan: {
        title: "SatyaNarayan Katha",
        image: "assets/images/puja_vishnu.png",
        price: "Price: On Request",
        desc: "Perform SatyaNarayan Katha for peace and prosperity. All rituals are performed according to authentic Vedic scriptures.",
        benefits: ["Ensures peace and harmony.", "Removes obstacles.", "Authentic Vedic rituals performed by expert Pandits.", "Expert Pandits."]
    },
    grihapraveshpuja: {
    title: "Griha Pravesh Puja",
    image: "assets/images/99p_grihapraveshpuja.webp",
    price: "Price: On Request",
    desc: "Perform Griha Pravesh Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    satyanarayanpuja: {
    title: "Satyanarayan Puja",
    image: "assets/images/puja_vishnu.png",
    price: "Price: On Request",
    desc: "Perform Satyanarayan Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    marriagepuja: {
    title: "Marriage Puja",
    image: "assets/images/puja_marriage.png",
    price: "Price: On Request",
    desc: "Perform Marriage Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    mahamrityunjayajaappuja: {
    title: "Maha Mrityunjaya (Jaap) Puja",
    image: "assets/images/99p_rudrabhishekpuja.webp",
    price: "Price: On Request",
    desc: "Perform Maha Mrityunjaya (Jaap) Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    shivpuranpuja: {
    title: "Shiv Puran Puja",
    image: "assets/images/99p_rudrabhishekpuja.webp",
    price: "Price: On Request",
    desc: "Perform Shiv Puran Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    saraswatipuja: {
    title: "Saraswati Puja",
    image: "assets/images/puja_kalash.png",
    price: "Price: On Request",
    desc: "Perform Saraswati Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    diwalipuja: {
    title: "Diwali Puja",
    image: "assets/images/service_diwali_1779175619459.png",
    price: "Price: On Request",
    desc: "Perform Diwali Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    dhanteraspuja: {
    title: "Dhanteras Puja",
    image: "assets/images/puja_kalash.png",
    price: "Price: On Request",
    desc: "Perform Dhanteras Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    govardhanpuja: {
    title: "Govardhan Puja",
    image: "assets/images/puja_vishnu.png",
    price: "Price: On Request",
    desc: "Perform Govardhan Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    mahalakshmipuja: {
    title: "Mahalakshmi Puja",
    image: "assets/images/puja_kalash.png",
    price: "Price: On Request",
    desc: "Perform Mahalakshmi Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    navratripuja: {
    title: "Navratri Puja",
    image: "assets/images/puja_kalash.png",
    price: "Price: On Request",
    desc: "Perform Navratri Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    durgapuja: {
    title: "Durga Puja",
    image: "assets/images/puja_kalash.png",
    price: "Price: On Request",
    desc: "Perform Durga Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    ganeshchaturthipuja: {
    title: "Ganesh Chaturthi Puja",
    image: "assets/images/puja_ganesha.png",
    price: "Price: On Request",
    desc: "Perform Ganesh Chaturthi Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    krishnajanmashtamipuja: {
    title: "Krishna Janmashtami Puja",
    image: "assets/images/puja_vishnu.png",
    price: "Price: On Request",
    desc: "Perform Krishna Janmashtami Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    hanumanjanmotsavpuja: {
    title: "Hanuman Janmotsav Puja",
    image: "assets/images/99p_rudrabhishekpuja.webp",
    price: "Price: On Request",
    desc: "Perform Hanuman Janmotsav Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    ramnavamipuja: {
    title: "Ram Navami Puja",
    image: "assets/images/puja_vishnu.png",
    price: "Price: On Request",
    desc: "Perform Ram Navami Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    garudpuranpath: {
    title: "Garud Puran Path",
    image: "assets/images/99p_garudpuranpath.webp",
    price: "Price: On Request",
    desc: "Perform Garud Puran Path with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    rudrabhishekpuja: {
    title: "Rudrabhishek Puja",
    image: "assets/images/99p_rudrabhishekpuja.webp",
    price: "Price: On Request",
    desc: "Perform Rudrabhishek Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    lakshminarasimhahomam: {
    title: "Lakshmi Narasimha Homam",
    image: "assets/images/99p_lakshminarasimhahomam.webp",
    price: "Price: On Request",
    desc: "Perform Lakshmi Narasimha Homam with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
    ganeshpuja: {
    title: "Ganesh Puja",
    image: "assets/images/99p_ganeshpuja.webp",
    price: "Price: On Request",
    desc: "Perform Ganesh Puja with our experienced Pandits to seek divine blessings, peace, and prosperity. All rituals are performed according to authentic Vedic scriptures.",
    benefits: [
        "Ensures peace, harmony, and spiritual growth.",
        "Removes obstacles and negative energies.",
        "Attracts health, wealth, and prosperity.",
        "Authentic Vedic rituals performed by expert Pandits."
    ]
},
};

function openServiceModal(serviceId) {
    const data = serviceData[serviceId];
    if(!data) return;

    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalImg').src = data.image;
    document.getElementById('modalPrice').innerText = data.price;
    document.getElementById('modalDesc').innerText = data.desc;

    const benefitsList = document.getElementById('modalBenefitsList');
    benefitsList.innerHTML = '';
    data.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.innerText = benefit;
        benefitsList.appendChild(li);
    });

    const modal = document.getElementById('serviceModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.addEventListener('click', function(e) {
    const modal = document.getElementById('serviceModal');
    if (e.target === modal) {
        closeServiceModal();
    }
});

// All Services Modal Logic
function openAllServicesModal() {
    const allServicesModal = document.getElementById('allServicesModal');
    allServicesModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAllServicesModal() {
    const allServicesModal = document.getElementById('allServicesModal');
    allServicesModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

