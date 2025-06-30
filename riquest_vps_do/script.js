function sendWhatsAppRequest() {
    // Get form data
    const form = document.getElementById('requestForm');
    const formData = new FormData(form);
    
    // Get selected OS
    const selectedOS = document.querySelector('input[name="OS"]:checked');
    if (!selectedOS) {
        alert('Silakan pilih Operating System terlebih dahulu!');
        return;
    }
    
    // Get VPS name
    const vpsName = document.getElementById('vpsName').value.trim();
    if (!vpsName) {
        alert('Silakan masukkan nama VPS!');
        return;
    }
    
    // Get selected region
    const selectedRegion = document.querySelector('input[name="region"]:checked');
    if (!selectedRegion) {
        alert('Silakan pilih region terlebih dahulu!');
        return;
    }
    
    let regionValue = selectedRegion.value;
    if (regionValue === 'custom') {
        const customRegion = document.getElementById('customRegion').value.trim();
        if (!customRegion) {
            alert('Silakan masukkan region yang diinginkan!');
            return;
        }
        regionValue = customRegion;
    }
    
    // Get selected script
    const selectedScript = document.querySelector('input[name="script"]:checked');
    const scriptValue = selectedScript ? selectedScript.value : 'TANPA SCRIPT';
    
    // Create WhatsApp message
    let message = `*REQUEST VPS DIGITAL OCEAN NO SC*\n\n`;
    message += `*Detail Request:*\n`;
    message += `• *Nama VPS:* ${vpsName}\n`;
    message += `• *Operating System:* ${selectedOS.value}\n`;
    message += `• *Username:* root\n`;
    message += `• *Password:* Random Generated\n`;
    message += `• *Durasi:* 1 Bulan\n`;
    message += `• *Region:* ${regionValue}\n`;
    message += `• *Script:* ${scriptValue}\n\n`;
    message += `Mohon diproses request VPS saya. Terima kasih!\n\n`;
    message += `Dikirim melalui: rajaserverpremium.my.id`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number (replace with actual number)
    const whatsappNumber = '6281327393959';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
}

// Form validation and enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add form validation
    const form = document.getElementById('requestForm');
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateInput(this);
            }
        });
    });
    
    // Add smooth animations
    const formSections = document.querySelectorAll('.form-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    formSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add click effects to radio buttons
    const radioItems = document.querySelectorAll('.checkbox-item');
    radioItems.forEach(item => {
        item.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                // Trigger change event for custom region handling
                const event = new Event('change');
                radio.dispatchEvent(event);
                
                // Update visual state
                updateRadioStates(radio.name);
            }
        });
    });
    
    // Handle custom region toggle
    document.querySelectorAll('input[name="region"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const customRegionDiv = document.querySelector('.custom-region');
            const customRegionInput = document.getElementById('customRegion');
            
            if (this.value === 'custom') {
                customRegionDiv.style.display = 'block';
                customRegionDiv.style.animation = 'fadeInUp 0.3s ease-out';
                customRegionInput.focus();
            } else {
                customRegionDiv.style.display = 'none';
                customRegionInput.value = '';
            }
        });
    });
    
    // Add loading state to submit button
    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

function validateInput(input) {
    const value = input.value.trim();
    
    if (input.hasAttribute('required') && !value) {
        showInputError(input, 'Field ini wajib diisi');
        return false;
    }
    
    // Specific validations
    if (input.id === 'vpsName') {
        if (value.length < 3) {
            showInputError(input, 'Nama VPS minimal 3 karakter');
            return false;
        }
        if (!/^[a-zA-Z0-9\-_\s]+$/.test(value)) {
            showInputError(input, 'Nama VPS hanya boleh mengandung huruf, angka, spasi, - dan _');
            return false;
        }
    }
    
    if (input.id === 'customRegion') {
        if (value && value.length < 2) {
            showInputError(input, 'Nama region minimal 2 karakter');
            return false;
        }
    }
    
    showInputSuccess(input);
    return true;
}

function showInputError(input, message) {
    input.classList.add('error');
    input.classList.remove('success');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#fa709a';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    input.parentNode.appendChild(errorDiv);
}

function showInputSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');
    
    // Remove error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function updateRadioStates(groupName) {
    const radios = document.querySelectorAll(`input[name="${groupName}"]`);
    radios.forEach(radio => {
        const item = radio.closest('.checkbox-item');
        if (radio.checked) {
            item.style.borderColor = 'var(--primary-color)';
            item.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
        } else {
            item.style.borderColor = '#e2e8f0';
            item.style.backgroundColor = 'var(--white)';
        }
    });
}

// Add CSS for input states
const style = document.createElement('style');
style.textContent = `
    .input-group input.error {
        border-color: #fa709a !important;
        box-shadow: 0 0 0 3px rgba(250, 112, 154, 0.1) !important;
    }
    
    .input-group input.success {
        border-color: #43e97b !important;
        box-shadow: 0 0 0 3px rgba(67, 233, 123, 0.1) !important;
    }
    
    .error-message {
        animation: fadeInUp 0.3s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
