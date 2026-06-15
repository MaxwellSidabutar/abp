/**
 * AETHERIA LANDING PAGE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load in case page is refreshed halfway down
    handleScroll();


    // --- 2. RESPONSIVE MOBILE MENU ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    // --- 3. DESTINATIONS CARDS FILTER ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destCards = document.querySelectorAll('.dest-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            destCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Add fade transition
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });


    // --- 4. AUTO-FILL DESTINATION SELECTION FROM CARD CLIICK ---
    const destinationSelect = document.getElementById('destination-select');
    const bookingCtaLinks = document.querySelectorAll('.card-btn');

    bookingCtaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const destName = link.getAttribute('data-dest');
            
            // Map the display name to the value of select option
            if (destName) {
                // Find matching option text and select it
                for (let i = 0; i < destinationSelect.options.length; i++) {
                    const opt = destinationSelect.options[i];
                    if (opt.text.toLowerCase() === destName.toLowerCase()) {
                        destinationSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });


    // --- 5. INTERACTIVE BOOKING RESERVATION FORM ---
    const reservationForm = document.getElementById('reservation-form');
    const bookingToast = document.getElementById('booking-toast');
    const toastCloseBtn = document.getElementById('toast-close-btn');
    const toastTitle = document.getElementById('toast-title');
    const toastDesc = document.getElementById('toast-desc');
    const submitBtn = document.getElementById('btn-submit');
    const submitBtnText = submitBtn.querySelector('.btn-text');

    const showToast = (title, message, isSuccess = true) => {
        toastTitle.textContent = title;
        toastDesc.textContent = message;
        
        if (isSuccess) {
            bookingToast.style.borderColor = 'var(--color-secondary)';
            bookingToast.querySelector('.toast-icon').className = 'ph-bold ph-check-circle toast-icon';
            bookingToast.querySelector('.toast-icon').style.color = 'var(--color-secondary)';
        } else {
            bookingToast.style.borderColor = 'hsl(354, 70%, 54%)';
            bookingToast.querySelector('.toast-icon').className = 'ph-bold ph-warning-circle toast-icon';
            bookingToast.querySelector('.toast-icon').style.color = 'hsl(354, 70%, 54%)';
        }

        bookingToast.classList.add('show');
        
        // Auto hide toast after 6 seconds
        setTimeout(() => {
            bookingToast.classList.remove('show');
        }, 6000);
    };

    toastCloseBtn.addEventListener('click', () => {
        bookingToast.classList.remove('show');
    });

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple validation check
        const nameInput = document.getElementById('full-name').value.trim();
        const emailInput = document.getElementById('email-address').value.trim();
        const selectedDest = destinationSelect.value;
        const departureDate = document.getElementById('departure-date').value;
        const crewCount = document.getElementById('crew-count').value;
        const travelClass = document.getElementById('travel-class').value;

        if (!nameInput || !emailInput || !selectedDest || !departureDate || !crewCount || !travelClass) {
            showToast('Pengisian Gagal', 'Harap isi semua kolom formulir reservasi dengan benar.', false);
            return;
        }

        // Change button state to loading
        submitBtn.disabled = true;
        const originalText = submitBtnText.textContent;
        submitBtnText.textContent = 'Memproses Transmisi...';
        submitBtn.querySelector('i').className = 'ph-bold ph-spinner spinner-icon';

        // Simulate flight reservation network request
        setTimeout(() => {
            // Reset button state
            submitBtn.disabled = false;
            submitBtnText.textContent = originalText;
            submitBtn.querySelector('i').className = 'ph-bold ph-paper-plane-tilt';
            
            // Format nice display name for destination
            const selectedDestText = destinationSelect.options[destinationSelect.selectedIndex].text;

            // Success message
            showToast(
                'Transmisi Berhasil!', 
                `Selamat ${nameInput}, kursi Anda untuk ekspedisi '${selectedDestText}' kelas '${travelClass.toUpperCase()}' telah dicadangkan. Cek kotak masuk Anda!`
            );

            // Reset form
            reservationForm.reset();
        }, 1800);
    });


    // --- 6. NEWSLETTER SUBSCRIPTION FORM ---
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]').value;
        
        if (emailInput) {
            showToast('Langganan Berhasil!', 'Email Anda berhasil terdaftar ke Buletin Kosmik Aetheria.');
            newsletterForm.reset();
        }
    });


    // --- 7. ACTIVE NAVIGATION LINK ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Adjust threshold offset for navbar height
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const targetNavLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (targetNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetNavLink.classList.add('active');
                }
            }
        });
    });
});
