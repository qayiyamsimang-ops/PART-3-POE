// ACCORDION - For About Page Team Bios

$(document).ready(function(){
    $('.accordion-header').click(function(){
        var content = $(this).next('.accordion-content');
        content.slideToggle();
        $(this).toggleClass('active');
        content.toggleClass('open');
        
        if ($(this).hasClass('active')) {
            $(this).find('.accordion-icon').text('-');
        } else {
            $(this).find('.accordion-icon').text('+');
        }
    });
});

// ============================================
// GALLERY LIGHTBOX - For Gallery Page
// ============================================

var galleryImages = document.querySelectorAll('.gallery-img');
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');
var lightboxClose = document.getElementById('lightboxClose');

if (galleryImages.length > 0 && lightbox) {
    galleryImages.forEach(function(img) {
        img.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ============================================
// DONATION PROGRESS BAR - For Homepage
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    var donateBtn = document.querySelector('.donate-btn');
    var progressFill = document.querySelector('.progress-fill');
    var raisedAmount = document.querySelector('.raised-amount');
    
    if (donateBtn) {
        var totalRaised = 0;
        var goal = 10000;
        
        donateBtn.addEventListener('click', function() {
            var donation = prompt('Enter donation amount in Rands:', '100');
            if (donation !== null) {
                var amount = parseInt(donation);
                if (!isNaN(amount) && amount > 0) {
                    totalRaised += amount;
                    if (totalRaised > goal) {
                        totalRaised = goal;
                    }
                    updateProgress();
                    alert('Thank you for your donation of R' + amount + '!');
                } else {
                    alert('Please enter a valid amount.');
                }
            }
        });
        
        function updateProgress() {
            var percentage = (totalRaised / goal) * 100;
            if (progressFill) {
                progressFill.style.width = percentage + '%';
            }
            if (raisedAmount) {
                raisedAmount.textContent = 'R' + totalRaised;
            }
            
            if (totalRaised >= goal) {
                alert('Congratulations! We have reached our donation goal!');
            }
        }
    }
});

// ============================================
// HELPER FUNCTION - Display Errors
// ============================================

function displayErrors(containerId, errors) {
    var errorContainer = document.getElementById(containerId);
    if (!errorContainer) return;
    errorContainer.innerHTML = '';
    errorContainer.style.display = 'block';
    
    var ul = document.createElement('ul');
    errors.forEach(function(error) {
        var li = document.createElement('li');
        li.textContent = error;
        ul.appendChild(li);
    });
    errorContainer.appendChild(ul);
}

// ============================================
// VOLUNTEER FORM VALIDATION
// ============================================

function validateVolunteerForm() {
    var name = document.getElementById('volName');
    var email = document.getElementById('volEmail');
    var phone = document.getElementById('volPhone');
    var availability = document.getElementById('availability');
    var message = document.getElementById('volMessage');
    
    if (!name || !email || !phone || !availability || !message) {
        alert('Form elements not found.');
        return false;
    }
    
    var nameVal = name.value.trim();
    var emailVal = email.value.trim();
    var phoneVal = phone.value.trim();
    var availabilityVal = availability.value;
    var messageVal = message.value.trim();
    
    var errors = [];
    
    if (nameVal.length < 2) {
        errors.push('Full name must be at least 2 characters');
    }
    
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailVal)) {
        errors.push('Please enter a valid email address');
    }
    
    var phonePattern = /^(0[0-9]{9})$/;
    if (!phonePattern.test(phoneVal)) {
        errors.push('Please enter a valid 10-digit phone number');
    }
    
    if (!availabilityVal) {
        errors.push('Please select your availability');
    }
    
    if (messageVal.length < 10) {
        errors.push('Message must be at least 10 characters');
    }
    
    if (errors.length > 0) {
        displayErrors('formErrors', errors);
        return false;
    }
    
    processVolunteerForm(nameVal, emailVal, phoneVal, availabilityVal);
    return false;
}

function processVolunteerForm(name, email, phone, availability) {
    var responseContainer = document.getElementById('formResponse');
    if (!responseContainer) return;
    
    var responseMessage = '<h3>Thank you, ' + name + '!</h3>';
    responseMessage += '<p>We have received your volunteer application. Here are your details:</p>';
    responseMessage += '<ul>';
    responseMessage += '<li><strong>Name:</strong> ' + name + '</li>';
    responseMessage += '<li><strong>Email:</strong> ' + email + '</li>';
    responseMessage += '<li><strong>Phone:</strong> ' + phone + '</li>';
    responseMessage += '<li><strong>Availability:</strong> ' + availability + '</li>';
    responseMessage += '</ul>';
    responseMessage += '<p>We will contact you within 48 hours with information about upcoming cleanup events.</p>';
    responseMessage += '<p>Together we can make a difference!</p>';
    
    responseContainer.innerHTML = responseMessage;
    responseContainer.style.display = 'block';
    document.getElementById('volunteerForm').reset();
}

// ============================================
// CONTACT FORM VALIDATION
// ============================================

function validateContactForm() {
    var name = document.getElementById('contactName');
    var email = document.getElementById('contactEmail');
    var message = document.getElementById('contactMessage');
    
    if (!name || !email || !message) {
        alert('Form elements not found.');
        return false;
    }
    
    var nameVal = name.value.trim();
    var emailVal = email.value.trim();
    var messageVal = message.value.trim();
    
    var errors = [];
    
    if (nameVal.length < 2) {
        errors.push('Full name must be at least 2 characters');
    }
    
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailVal)) {
        errors.push('Please enter a valid email address');
    }
    
    if (messageVal.length < 10) {
        errors.push('Message must be at least 10 characters');
    }
    
    if (errors.length > 0) {
        displayErrors('contactErrors', errors);
        return false;
    }
    
    processContactForm(nameVal, emailVal, messageVal);
    return false;
}

function processContactForm(name, email, message) {
    var responseContainer = document.getElementById('contactResponse');
    if (!responseContainer) return;
    
    var responseMessage = '<h3>Thank you, ' + name + '!</h3>';
    responseMessage += '<p>We have received your message. Here is a copy of what you sent:</p>';
    responseMessage += '<ul>';
    responseMessage += '<li><strong>Name:</strong> ' + name + '</li>';
    responseMessage += '<li><strong>Email:</strong> ' + email + '</li>';
    responseMessage += '</ul>';
    responseMessage += '<p><strong>Message:</strong></p>';
    responseMessage += '<p>' + message + '</p>';
    responseMessage += '<p>We will respond within 48 hours.</p>';
    
    responseContainer.innerHTML = responseMessage;
    responseContainer.style.display = 'block';
    document.getElementById('contactForm').reset();
}
