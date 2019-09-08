<?php

return [
    'token' => env('BITGO_TOKEN'),
    'currency' => '',
    'host' => env('BITGO_EXPRESS_ENDPOINT', 'https://localhost:8030'),
    'ip' => env('BITGO_ALLOWED_IP_ADDRESS'),
    'bitgoApiVersion' => '/api/v2',
];
