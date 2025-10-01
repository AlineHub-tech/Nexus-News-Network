<?php
require_once 'db.php';
$pdo = getPDO();

$id = (int)($_GET['id'] ?? 0);

// Fata author_id mbere yo gusiba
$stmt = $pdo->prepare("SELECT author_id FROM articles WHERE id = ?");
$stmt->execute([$id]);
$article = $stmt->fetch();

if ($article) {
    $pdo->prepare("DELETE FROM articles WHERE id = ?")->execute([$id]);
    header("Location: auther_view.php?author_id=" . $article['author_id']);
    exit;
} else {
    echo "Inkuru ntibonywe!";
}
?>