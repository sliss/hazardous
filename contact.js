// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});

function handleFormSubmit(e) {
  e.preventDefault();

  // Clear previous errors
  clearErrors();

  // Validate form
  const isValid = validateForm();

  if (isValid) {
    // Simulate form submission
    showSuccessMessage();

    // In a real application, you would send the data to a server here
    // Example:
    // const formData = new FormData(e.target);
    // fetch('/api/contact', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //     showSuccessMessage();
    // })
    // .catch(error => {
    //     showErrorMessage();
    // });
  }
}

function validateForm() {
  let isValid = true;

  // Get form fields
  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const email = document.getElementById('email');
  const inquiryType = document.getElementById('inquiry-type');
  const message = document.getElementById('message');

  // Validate first name
  if (!firstName.value.trim()) {
    showError(firstName, 'First name is required');
    isValid = false;
  }

  // Validate last name
  if (!lastName.value.trim()) {
    showError(lastName, 'Last name is required');
    isValid = false;
  }

  // Validate email
  if (!email.value.trim()) {
    showError(email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  }

  // Validate inquiry type
  if (!inquiryType.value) {
    showError(inquiryType, 'Please select an inquiry type');
    isValid = false;
  }

  // Validate message
  if (!message.value.trim()) {
    showError(message, 'Message is required');
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showError(message, 'Message must be at least 10 characters long');
    isValid = false;
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(field, errorMessage) {
  const formGroup = field.closest('.form-group');
  formGroup.classList.add('error');

  // Create error message element
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = errorMessage;

  // Add error message after the field
  formGroup.appendChild(errorElement);
}

function clearErrors() {
  // Remove all error classes and messages
  const errorGroups = document.querySelectorAll('.form-group.error');
  errorGroups.forEach(group => {
    group.classList.remove('error');
    const errorMessage = group.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  });

  // Remove any success messages
  const successMessage = document.querySelector('.form-success');
  if (successMessage) {
    successMessage.remove();
  }
}

function showSuccessMessage() {
  const form = document.getElementById('contact-form');

  // Create success message
  const successDiv = document.createElement('div');
  successDiv.className = 'form-success';
  successDiv.innerHTML = `
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
    `;

  // Insert before form
  form.parentNode.insertBefore(successDiv, form);

  // Reset form
  form.reset();

  // Scroll to success message
  successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Remove success message after 5 seconds
  setTimeout(() => {
    successDiv.style.opacity = '0';
    setTimeout(() => {
      successDiv.remove();
    }, 300);
  }, 5000);
}

// Add real-time validation for email field
document.addEventListener('DOMContentLoaded', function() {
  const emailField = document.getElementById('email');
  if (emailField) {
    emailField.addEventListener('blur', function() {
      const formGroup = this.closest('.form-group');
      const existingError = formGroup.querySelector('.error-message');

      if (existingError) {
        existingError.remove();
        formGroup.classList.remove('error');
      }

      if (this.value && !isValidEmail(this.value)) {
        showError(this, 'Please enter a valid email address');
      }
    });
  }
}); 