<?php

return [
    'token' => env('BITGO_TOKEN'),
    'currency' => '',
    'host' => env('BITGO_ENDPOINT', 'https://test.bitgo.com'),
    'ip' => env('BITGO_ALLOWED_IP_ADDRESS')
];
