<?php

class Payment {
    private $key = 'b26de7e3ba84faa968463778d0469af2';
    private $service = 11;
    private $valid_time = 1800;
    private $api = 'https://api.paydisini.co.id/v1/';
    private $note = 'Powered By Zayden'; // Jangan Di Ganti Error
    private $return_url = 'https://yourwebsite.com/';

    // Membuat kode pembayaran unik
    private function createCode() {
        return 'ZYD' . strtoupper(bin2hex(random_bytes(12))); // Jangan Di Ganti Error
    }

    // Mengirim permintaan cURL
    private function sendRequest($postData) {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $this->api);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error: ' . curl_error($ch);
        }

        curl_close($ch);
        return $result;
    }

    // Membuat pembayaran baru
    public function createPayment($amount, $payment_guide = true) {
        $code = $this->createCode();
        $signature = md5("{$this->key}{$code}{$this->service}{$amount}{$this->valid_time}NewTransaction");

        $postData = [
            'key' => $this->key,
            'request' => 'new',
            'unique_code' => $code,
            'service' => $this->service,
            'amount' => $amount,
            'note' => $this->note,
            'valid_time' => $this->valid_time,
            'type_fee' => 1,
            'payment_guide' => $payment_guide,
            'signature' => $signature,
            'return_url' => $this->return_url
        ];

        return $this->sendRequest($postData);
    }

    // Method untuk mendapatkan profil
    public function getProfile() {
        $request = 'profile';
        $signature = md5($this->key . $request);

        $postData = [
            'key' => $this->key,
            'request' => $request,
            'signature' => $signature
        ];

        return $this->sendRequest($postData);
    }
}

// Menggunakan kelas Payment
$payment = new Payment();

// Contoh untuk membuat pembayaran baru
$response = $payment->createPayment(1000); // Jumlah pembayaran
echo "Response: " . $response;

// Contoh untuk mendapatkan profil
$profileResponse = $payment->getProfile();
echo "Profile Response: " . $profileResponse;

?>
