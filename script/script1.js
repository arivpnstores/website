function sendWhatsAppRequest1() {
    var form = document.getElementById('requestForm');
    var formData = new FormData(form);

    // Build WhatsApp message with form data
    var message = "BELI%20SCRIPT%20POTATO%20TUNNELING%0A";
    formData.forEach(function(value, key) {
        message += key + "%3A%20" + value + "%0A";
    });

    // Construct the WhatsApp URL with the message
    var whatsappUrl = "https://wa.me/6281327393959?text=" + message + message1;

    // Redirect user to WhatsApp
    window.location.href = whatsappUrl;
}