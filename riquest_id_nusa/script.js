function sendWhatsAppRequest() {
    // Ambil data dari form
    const form = document.getElementById('requestForm');
    const formData = new FormData(form);
    
    // Ambil nilai dari radio button dan input
    const modeInject = formData.get('mode_inject');
    const username = formData.get('username');
    const password = formData.get('password');
    const exp = formData.get('exp');
    const kuota = formData.get('kuota');
    const kuotaLain = formData.get('kuota_lain');
    const aplikasiInject = formData.get('aplikasi_inject');
    const injectLain = formData.get('inject_lain');
    
    // Validasi form
    if (!modeInject) {
        alert('Silakan pilih Mode Inject!');
        return;
    }
    
    if (!username || !password || !exp) {
        alert('Silakan lengkapi Username, Password, dan EXP!');
        return;
    }
    
    if (!kuota && !kuotaLain) {
        alert('Silakan pilih Kuota atau isi Kuota Lainnya!');
        return;
    }
    
    if (!aplikasiInject && !injectLain) {
        alert('Silakan pilih Aplikasi Inject atau isi Aplikasi Lainnya!');
        return;
    }
    
    // Buat pesan WhatsApp
    let message = "*REQUEST AKUN VPN ID NUSA* \n\n";
    
    message += "*DETAIL REQUEST:*\n";
    message += `Mode Inject: ${modeInject.toUpperCase()}\n`;
    message += `Username: ${username}\n`;
    message += `Password: ${password}\n`;
    message += `Expired: ${exp} hari\n\n`;
    
    // Tentukan kuota yang dipilih
    let selectedKuota = kuota;
    if (kuota === 'LAINNYA' && kuotaLain) {
        selectedKuota = kuotaLain;
    }
    message += `Kuota: ${selectedKuota}\n\n`;
    
    // Tentukan aplikasi inject yang dipilih
    let selectedApp = aplikasiInject;
    if (aplikasiInject === 'LAINNYA' && injectLain) {
        selectedApp = injectLain;
    }
    message += `Aplikasi Inject: ${selectedApp}\n\n`;
    
    message += "*Mohon diproses segera*\n";
    message += "Terima kasih!";
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Nomor WhatsApp tujuan
    const phoneNumber = "6281327393959";
    
    // Buat URL WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Buka WhatsApp
    window.open(whatsappURL, '_blank');
}

// Fungsi untuk menangani perubahan radio button LAINNYA
document.addEventListener('DOMContentLoaded', function() {
    // Handle kuota lainnya
    const kuotaRadios = document.querySelectorAll('input[name="kuota"]');
    const kuotaLainInput = document.querySelector('input[name="kuota_lain"]');
    
    kuotaRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'LAINNYA') {
                kuotaLainInput.focus();
            }
        });
    });
    
    // Handle aplikasi inject lainnya
    const appRadios = document.querySelectorAll('input[name="aplikasi_inject"]');
    const appLainInput = document.querySelector('input[name="inject_lain"]');
    
    appRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'LAINNYA') {
                appLainInput.focus();
            }
        });
    });
    
    // Auto-select radio button ketika mengetik di input LAINNYA
    if (kuotaLainInput) {
        kuotaLainInput.addEventListener('focus', function() {
            const lainnyaRadio = document.querySelector('input[name="kuota"][value="LAINNYA"]');
            if (lainnyaRadio) {
                lainnyaRadio.checked = true;
            }
        });
    }
    
    if (appLainInput) {
        appLainInput.addEventListener('focus', function() {
            const lainnyaRadio = document.querySelector('input[name="aplikasi_inject"][value="LAINNYA"]');
            if (lainnyaRadio) {
                lainnyaRadio.checked = true;
            }
        });
    }
});
