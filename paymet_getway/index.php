<?php
$ch = curl_init();
                                                                            
curl_setopt($ch, CURLOPT_URL, 'https://api.paydisini.co.id/v1/');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
$post = array(
    'key' => 'b26de7e3ba84faa968463778d0469af2',
    'request' => 'profile',
    'signature' => ''
);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
                                                                            
$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close($ch);
?>