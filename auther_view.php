<?php
require_once 'db.php';
$pdo = getPDO();
$author_id = $_GET['author_id'] ?? 'Admin';

$stmt = $pdo->prepare("SELECT * FROM articles WHERE author_id = ? ORDER BY created_at DESC");
$stmt->execute([$author_id]);
$articles = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="rw">
<head>
  <meta charset="UTF-8">
  <title>Inkuru zawe</title>
  <link rel="stylesheet" href="assets/css/index.css">
  <style>
    table {
      width: 98%;
      margin: 30px auto;
      border-collapse: collapse;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.07);
      overflow: hidden;
    }
    th, td {
      padding: 12px 10px;
      border-bottom: 1px solid #eee;
      text-align: left;
      font-size: 15px;
    }
    th {
      background: #f7f9fa;
      font-weight: 600;
    }
    tr:last-child td {
      border-bottom: none;
    }
    .action-links a {
      margin-right: 12px;
      color: #007bff;
      text-decoration: none;
      font-weight: 500;
    }
    .action-links a.delete {
      color: #e74c3c;
    }
    .action-links a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body style="background-color:skyblue;">
  <a href="dashboard_author.php"style="text-align:center;margin-left:-5%; margin-top:30px;">back to home</a>
  <h2 style="text-align:center;margin-left:-5%; margin-top:30px;">Inkuru wanditse</h2>
  <table border="2">
    <tr>
      <th>Title</th>
      <th>Category</th>
      <th>Date</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
    <?php foreach($articles as $art): ?>
      <tr>
        <td><?= htmlspecialchars($art['title']) ?></td>
        <td><?= htmlspecialchars($art['category_id']) ?></td>
        <td><?= date('d M Y, H:i', strtotime($art['created_at'])) ?></td>
        <td><?= htmlspecialchars($art['status']) ?></td>
        <td class="action-links">
          <a href="edit_outher.php?id=<?= $art['id'] ?>">Hindura</a>
          <a href="delete_outher.php?id=<?= $art['id'] ?>" class="delete" onclick="return confirm('Ushaka gusiba iyi nkuru?');">Siba</a>
        </td>
      </tr>
    <?php endforeach; ?>
  </table>
</body>
</html>