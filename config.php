<?php
// session_start();

// Ururimi default
if (!isset($_SESSION['lang'])) {
    $_SESSION['lang'] = 'en';
}

// Hindura niba hari parameter ya GET
if (isset($_GET['lang'])) {
    $lang = $_GET['lang'];
    if (in_array($lang, ['en', 'rw'])) {
        $_SESSION['lang'] = $lang;
    }
}

$current_lang = $_SESSION['lang'];
$lang_file = __DIR__ . "/lang/" . $current_lang . ".php";

if (file_exists($lang_file)) {
    require_once $lang_file;
} else {
    die("Language file not found: " . $lang_file);
}
?>