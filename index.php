<?php
$index = __DIR__ . '/index.html';
if (is_readable($index)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($index);
    exit;
}
http_response_code(404);
echo 'Home page not found.';
