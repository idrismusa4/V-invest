document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // VAT Calculator
    const calculateBtn = document.getElementById('calculate-btn');
    const vatRateSelect = document.getElementById('vat-rate');
    const customRateGroup = document.getElementById('custom-rate-group');

    if (vatRateSelect) {
        vatRateSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customRateGroup.style.display = 'block';
            } else {
                customRateGroup.style.display = 'none';
            }
        });
    }

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateVAT);
    }

    function calculateVAT() {
        // Get input values
        const investmentAmount = parseFloat(document.getElementById('investment-amount').value) || 0;
        let vatRate = parseFloat(document.getElementById('vat-rate').value) || 0;
        
        if (vatRate === 'custom') {
            vatRate = parseFloat(document.getElementById('custom-vat-rate').value) || 0;
        }
        
        const recoveryRate = parseFloat(document.getElementById('recovery-rate').value) || 0;
        const investmentType = document.getElementById('investment-type').value;

        // Perform calculations
        const netAmount = investmentAmount;
        const vatAmount = (netAmount * vatRate) / 100;
        const recoverableVat = (vatAmount * recoveryRate) / 100;
        const totalCost = netAmount + vatAmount - recoverableVat;

        // Display results
        document.getElementById('net-amount').textContent = `£${netAmount.toFixed(2)}`;
        document.getElementById('vat-amount').textContent = `£${vatAmount.toFixed(2)}`;
        document.getElementById('recoverable-vat').textContent = `£${recoverableVat.toFixed(2)}`;
        document.getElementById('total-cost').textContent = `£${totalCost.toFixed(2)}`;
    }

    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding pane
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const accordionItem = header.parentElement;
                accordionItem.classList.toggle('active');
            });
        });
    }

    // Form validation
    const inquiryForm = document.getElementById('inquiry-form');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // If validation passes, show success message
            alert('Thank you for your inquiry! We will contact you shortly.');
            inquiryForm.reset();
        });
    }

    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value.trim();
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // If validation passes, show success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Add this CSS for the scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--secondary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 999;
            transition: all 0.3s ease;
        }
        
        .scroll-top-btn:hover {
            background-color: var(--primary-color);
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
});