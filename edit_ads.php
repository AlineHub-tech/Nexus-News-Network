<?php
require_once 'db.php';
$pdo = getPDO();

if (isset($_GET['delete'])) {
    $pdo->prepare("DELETE FROM advertisements WHERE id=?")->execute([$_GET['delete']]);
}

$ads = $pdo->query("SELECT * FROM advertisements ORDER BY created_at DESC")->fetchAll();
?>
<table class="ads-table" border="2" cellpadding="5">
  <tr><th>Title</th><th>Image</th><th>Link</th><th>Actions</th></tr>
  <?php foreach($ads as $ad): ?>
    <tr>
      <td><?= htmlspecialchars($ad['title']) ?></td>
       <td class="ads-actions">
        <?php if ($ad['image']): ?>
          <img src="uploads/<?= htmlspecialchars($ad['image']) ?>" style="max-width:80px;">
        <?php endif; ?>
      </td>
      <td class="ads-actions">
        <?php if ($ad['link']): ?>
          <a href="<?= htmlspecialchars($ad['link']) ?>" target="_blank">Link</a>
        <?php endif; ?>
      </td>
      <td class="ads-actions">
        <a href="edit_ad.php?id=<?= $ad['id'] ?>">Hindura</a>
        <a href="?delete=<?= $ad['id'] ?>" onclick="return confirm('Siba iyi ad?')">Siba</a>
      </td>
    </tr>
  <?php endforeach; ?>
</table>
<a href="adevertise.php"style="color:black; margin-bottom:20%; margin-left:37%">Ongeramo Advertisement</a>