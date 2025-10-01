<?php
session_start();
require_once 'db.php';
$pdo = getPDO();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['article_id'])) {
    $id = (int)$_POST['article_id'];
    // Reba niba user atarayikanda kuri iyi article
    if (!isset($_SESSION['liked_'.$id])) {
        $pdo->prepare("UPDATE articles SET likes = likes + 1 WHERE id = ?")->execute([$id]);
        $_SESSION['liked_'.$id] = true;
    }
    header("Location: index.php?id=$id");
    exit;
}
?>