<?php
require_once 'db.php';
$pdo = getPDO();

$id = (int)($_GET['id'] ?? 0);

// Fata inkuru
$stmt = $pdo->prepare("SELECT * FROM articles WHERE id = ?");
$stmt->execute([$id]);
$article = $stmt->fetch();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $body = $_POST['body'];
    $category_id = $_POST['category_id'];
    $status = $_POST['status'];

    // Handle image update (optional)
    $image = $article['image'];
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $image = $_FILES['image']['name'];
        $target = 'uploads/' . basename($image);
        move_uploaded_file($_FILES['image']['tmp_name'], $target);
    }

    $stmt = $pdo->prepare("UPDATE articles SET title=?, body=?, category_id=?, status=?, image=? WHERE id=?");
    $stmt->execute([$title, $body, $category_id, $status, $image, $id]);
    header("Location: auther_view.php?author_id=" . $article['author_id']);
    exit;
}
?>
<!DOCTYPE html>
<html lang="rw">
<head>
  <meta charset="UTF-8">
  <title>Hindura Inkuru</title>
  <link rel="stylesheet" href="assets/css/index.css">
</head>
<body style="background-color:skyblue;">
  <h2 style="text-align:center; margin-top:30px;">Hindura Inkuru</h2>
  <form method="post" enctype="multipart/form-data" class="article-form" style="max-width:500px;margin:auto;">
    <input type="text" name="title" value="<?= htmlspecialchars($article['title']) ?>" required>
    <textarea name="body" required><?= htmlspecialchars($article['body']) ?></textarea>
    <select name="category_id">
      <option value="1" <?= $article['category_id']==1?'selected':'' ?>>Home</option>
      <option value="2" <?= $article['category_id']==2?'selected':'' ?>>Opinion</option>
      <option value="3" <?= $article['category_id']==3?'selected':'' ?>>Entertainment</option>
      <option value="4" <?= $article['category_id']==4?'selected':'' ?>>Life</option>
      <option value="5" <?= $article['category_id']==5?'selected':'' ?>>TV</option>
      <option value="6" <?= $article['category_id']==6?'selected':'' ?>>Sport</option>
      <option value="7" <?= $article['category_id']==7?'selected':'' ?>>Politics</option>
      <option value="8" <?= $article['category_id']==8?'selected':'' ?>>Business</option>
      <option value="9" <?= $article['category_id']==9?'selected':'' ?>>Culture</option>
      <option value="10" <?= $article['category_id']==10?'selected':'' ?>>Community</option>
    </select>
    <input type="text" name="status" value="<?= htmlspecialchars($article['status']) ?>" required>
    <input type="file" name="image">
    <button type="submit">Hindura</button>
  </form>
</body>
</html>