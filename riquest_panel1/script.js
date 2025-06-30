function sendWhatsAppRequest() {
    var form = document.getElementById('requestForm');
    var formData = new FormData(form);

    // Build WhatsApp message with form data and pricing
    var message = "BELI%20PANEL%20DO%201%20TAHUN%0A";
    var totalPrice = 0;
    
    formData.forEach(function(value, key) {
        if (key === "DROP") {
            if (value === "3") {
                message += "DROPLET%203%20-%20$1620%20(1%20Tahun)%0A";
                totalPrice += 1620;
            } else if (value === "10") {
                message += "DROPLET%2010%20-%20$5400%20(1%20Tahun)%0A";
                totalPrice += 5400;
            }
        }
    });
    
    message += "%0ATotal%3A%20$" + totalPrice + "%0A";
    message += "PANEL%20DO%20BILLING%20PAYPAL";

    // Construct the WhatsApp URL with the message
    var whatsappUrl = "https://wa.me/6281327393959?text=" + message ;

    // Redirect user to WhatsApp
    window.location.href = whatsappUrl;
}
