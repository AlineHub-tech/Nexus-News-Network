<?php
session_start();
require_once 'db.php';
$pdo = getPDO();

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$secret = $_POST['secret'] ?? '';

// Validation
if (!$name || !$email || !$password) {
  die("Please fill in all fields.");
}

// Check email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  die("Invalid email address.");
}

$hashed = password_hash($password, PASSWORD_DEFAULT);
$role = ($secret === 'NNN@adminSecret') ? 'admin' : 'author';

$stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->execute([$name, $email, $hashed, $role]);

header("Location: login.php");
exit;
?>