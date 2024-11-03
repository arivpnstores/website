async function createPayment() {
    const PAYDISINI_API_URL = 'https://api.paydisini.co.id/v1/';
    
    // Data yang akan dikirim ke API Paydini
    const postData = {
      key: '3bd750c6e13ed61e114433ab255c645b', // ganti dengan API key Anda
      request: 'new',
      unique_code: 'postman123unikcode',
      service: '11',
      amount: '1000',
      note: 'Pembayaran pertama',
      valid_time: '1800', // waktu validasi dalam detik
      type_fee: '1',
      payment_guide: true, // Tampilkan panduan pembayaran
      signature: 'ba8427311e3d002bfa52a48ad46c04d2', // ganti dengan signature Anda
      return_url: 'https://wa.me/6281327393959/' // URL kembali setelah pembayaran selesai
    };
    
    try {
      const response = await fetch(PAYDISINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        console.log('Payment created:', result);
        
        // Jika berhasil, Anda bisa redirect pengguna ke halaman pembayaran
        if (result.payment_url) {
          window.location.href = result.payment_url; // Redirect ke URL pembayaran
        }
      } else {
        console.error('Failed to create payment:', result);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  }
  
  // Panggil fungsi untuk memulai pembayaran
  createPayment();
  