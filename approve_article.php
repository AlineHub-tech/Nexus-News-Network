<?php
require_once 'auth.php';
require_once 'db.php';

requireLogin();
if (!isAdmin()) die('Admin only');

// Reba niba ID yatanzwe
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = (int) $_GET['id'];
    $pdo = getPDO();

    // Reba niba inkuru ibaho
    $stmt = $pdo->prepare("SELECT * FROM articles WHERE id = ?");
    $stmt->execute([$id]);
    $article = $stmt->fetch();

    if ($article) {
        // Emeza inkuru
        $update = $pdo->prepare("UPDATE articles SET status = 'approved' WHERE id = ?");
        $update->execute([$id]);
    }
}

// Subiza kuri dashboard
header("Location: admin_dashboard.php");
exit;