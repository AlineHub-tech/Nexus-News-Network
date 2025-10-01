<?php
require_once 'config.php';
require_once 'db.php';

$pdo = getPDO();
$id = $_GET['id'] ?? null;

if (!$id) {
    die("Video not found");
}

// Ongera views
$pdo->prepare("UPDATE nnn_tv SET views = views + 1 WHERE id = ?")->execute([$id]);

// Fata video
$stmt = $pdo->prepare("SELECT * FROM nnn_tv WHERE id = ?");
$stmt->execute([$id]);
$video = $stmt->fetch();

if (!$video) {
    die("Video not found");
}
?>

<h2><?= htmlspecialchars($video['title']) ?></h2>
<video width="100%" height="auto" controls>
    <source src="uploads/<?= htmlspecialchars($video['video_path']) ?>" type="video/mp4">
</video>
<!-- <p><?= nl2br(htmlspecialchars($video['description'])) ?></p> -->
<p>👁 <?= (int)$video['views'] ?> | ❤ <?= (int)$video['likes'] ?></p>

<hr>
<h3>Comments</h3>
<?php include 'comment.php'; ?>