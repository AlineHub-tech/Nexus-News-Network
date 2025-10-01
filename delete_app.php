<?php
require_once 'db.php';
require_once 'auth.php';
requireLogin();
if (!isAdmin()) die('Admin only');

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $pdo = getPDO();
    $stmt = $pdo->prepare("DELETE FROM articles WHERE id = ?");
    $stmt->execute([$id]);
    header("Location: approve_article.php");
    exit;
}
?>