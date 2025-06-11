// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Package tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.package-tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').style.maxHeight = '0';
                faqItem.querySelector('.faq-toggle').textContent = '+';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '−';
            }
        });
    });

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('.submit-button');
            const buttonText = submitButton.querySelector('.button-text');
            const buttonLoader = submitButton.querySelector('.button-loader');
            
            // Show loading state
            buttonText.style.display = 'none';
            buttonLoader.style.display = 'inline';
            submitButton.disabled = true;
            
            // Collect form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            if (!data.name || !data.phone || !data.email) {
                alert('אנא מלא את כל השדות החובה');
                
                // Reset button state
                buttonText.style.display = 'inline';
                buttonLoader.style.display = 'none';
                submitButton.disabled = false;
                return;
            }
            
            try {
                // Format package name for Hebrew display
                const packageNames = {
                    'starter': 'Starter AI - 1,200₪',
                    'efficiency': 'Efficiency Pro - 3,500₪',
                    'smart-office': 'Smart Office AI - 9,800₪',
                    'enterprise': 'Enterprise - 25,000₪'
                };

                const selectedPackage = packageNames[data.package] || 'לא נבחר';

                // Prepare webhook data
                const webhookData = {
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    company: data.company || '',
                    package: selectedPackage,
                    message: data.message || '',
                    timestamp: new Date().toISOString(),
                    source: 'KA Shaham Landing Page'
                };

                // Send to both Make.com and Email server
                const promises = [
                    // Send to Make.com webhook
                    fetch('https://hook.eu2.make.com/98h5wvl2h95w1wph3swguk62ahtjqoh1', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(webhookData)
                    }),
                    // Send to Vercel serverless function
                    fetch('/api/send-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(webhookData)
                    })
                ];

                const results = await Promise.allSettled(promises);
                
                // Check results
                const makeSuccess = results[0].status === 'fulfilled' && results[0].value.ok;
                const emailSuccess = results[1].status === 'fulfilled' && results[1].value.ok;
                
                if (makeSuccess || emailSuccess) {
                    let message = 'תודה! הפנייה שלך נשלחה בהצלחה. נחזור אליך תוך 24 שעות.';
                    if (!makeSuccess && emailSuccess) {
                        message += '\n(נשלח באמצעות מייל)';
                    } else if (makeSuccess && !emailSuccess) {
                        message += '\n(נשלח באמצעות Make.com)';
                    }
                    alert(message);
                    contactForm.reset();
                } else {
                    throw new Error('Both services failed');
                }
                
            } catch (error) {
                console.error('Error:', error);
                alert('שגיאה בשליחת הפנייה. אנא נסה שוב או צור קשר ישירות בטלפון 054-640-0839');
            } finally {
                // Reset button state
                buttonText.style.display = 'inline';
                buttonLoader.style.display = 'none';
                submitButton.disabled = false;
            }
        });
    }

    // Package button functionality
    const packageButtons = document.querySelectorAll('.package-button');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Pre-select package in form if available
                const packageName = this.closest('.package-tab-content').id;
                const packageSelect = document.getElementById('package');
                if (packageSelect && packageName) {
                    packageSelect.value = packageName;
                }
            }
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('section');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.pageYOffset > 100) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Package tabs functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.package-tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Package button click handlers
document.querySelectorAll('.package-button').forEach(button => {
    button.addEventListener('click', function() {
        const packageContent = this.closest('.package-tab-content');
        const packageName = packageContent.querySelector('.package-name').textContent;
        const packageSelect = document.getElementById('package');
        
        // Map package names to select values
        const packageMap = {
            'חבילת Starter AI': 'starter',
            'חבילת Efficiency Pro': 'efficiency',
            'חבילת Smart Office AI': 'smart-office',
            'חבילת Enterprise': 'enterprise'
        };
        
        packageSelect.value = packageMap[packageName] || '';
        
        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.name || !data.phone || !data.email) {
        alert('אנא מלא את כל השדות החובה');
        return;
    }
    
    try {
        // Format package name
        const packageNames = {
            'starter': 'Starter AI - 1,200₪',
            'efficiency': 'Efficiency Pro - 3,500₪',
            'smart-office': 'Smart Office AI - 9,800₪',
            'enterprise': 'Enterprise - 25,000₪',
            'consultation': 'ייעוץ ראשוני'
        };

        const selectedPackage = packageNames[data.package] || 'לא נבחר';

        // Prepare webhook data
        const webhookData = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            package: selectedPackage,
            timestamp: new Date().toISOString(),
            source: 'KA Shaham Landing Page'
        };

        // Send to both Make.com and Email server
        const promises = [
            // Send to Make.com webhook
            fetch('https://hook.eu2.make.com/98h5wvl2h95w1wph3swguk62ahtjqoh1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(webhookData)
            }),
            // Send to Email server
            fetch('http://localhost:3001/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(webhookData)
            })
        ];

        const results = await Promise.allSettled(promises);
        
        // Check results
        const makeSuccess = results[0].status === 'fulfilled' && results[0].value.ok;
        const emailSuccess = results[1].status === 'fulfilled' && results[1].value.ok;
        
        if (makeSuccess || emailSuccess) {
            let message = 'תודה! הפנייה שלך נשלחה בהצלחה. נחזור אליך תוך 24 שעות.';
            if (!makeSuccess && emailSuccess) {
                message += '\n(נשלח באמצעות מייל)';
            } else if (makeSuccess && !emailSuccess) {
                message += '\n(נשלח באמצעות Make.com)';
            }
            alert(message);
            this.reset();
        } else {
            throw new Error('Both services failed');
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('שגיאה בשליחת הפנייה. אנא נסה שוב או צור קשר ישירות בטלפון 054-640-0839');
    }
});

// FAQ toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isVisible = answer.style.display === 'block';
        
        // Hide all answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
        });
        
        // Show clicked answer if it wasn't visible
        if (!isVisible) {
            answer.style.display = 'block';
        }
    });
});

// Initialize - hide all FAQ answers
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.display = 'none';
    });
}); 