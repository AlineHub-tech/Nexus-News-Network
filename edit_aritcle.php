<?php
require_once 'auth.php';
require_once 'db.php';
requireLogin();
if (!isAdmin()) die('Admin only');

$pdo = getPDO();
if (isset($_GET['id'])) {
  $id = $_GET['id'];
  $stmt = $pdo->prepare("SELECT * FROM articles WHERE id=?");
  $stmt->execute([$id]);
  $article = $stmt->fetch();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['update'])) {
  $stmt = $pdo->prepare("UPDATE articles SET title=?, body=?, image=?,category_id=? WHERE id=?");
  $stmt->execute([$_POST['title'], $_POST['body'], $_POST['image'], $_POST['category_id'], $_POST['id']]);
  header("Location: admin_dashboard.php");
  exit;
}
?>

<!DOCTYPE html>
<html lang="rw">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexus News Network</title>
    <link rel="stylesheet" href="assets/css/index.css">
</head>
<body style="background-color:skyblue;">
    <header>
        <img src="img/nnn.jpg" alt="nnnrwanda">
        <h1 class="logo">|NEXUS<br>|NEWS<br>|NETWORK</h1>
<div id="google_translate_element" style="display:none;"></div>
   <div class="datetime-wrapper">
    <div id="date" class="date"></div>
    <div id="time" class="time"></div>
     </div>
      <div class="user-login">
    <a href="logout.php" title="Jounalist logout">
      <button>👤</button>
    </a>
  </div>
   </section>
        </header>
        <body>
  <h2 style="margin-right:8px;">update articles</h2>
  <form method="POST" action="">
    <input type="hidden" name="id" value="<?= $article['id'] ?>">
    <input type="text" name="title" value="<?= htmlspecialchars($article['title']) ?>"><br>
    <textarea name="body" ><?= htmlspecialchars($article['body']) ?></textarea><br><br>
     <input type="file" name="image"  value="<?= htmlspecialchars($article['image']) ?>"><br>
    <input type="text" name="category_id" value="<?= htmlspecialchars($article['category_id']) ?>"><br>
    <input type="submit" name="update"value="update">
  </form>
 <footer>
    <div class="soc">
        <a href="https://x.com/NEXUSNEWSNETWAK?t=PvqTyUXF3XBBmADoGwdg_w&s=09
"><img src="img/x.png" alt="Twitter"></a>
        <a href=" https://www.instagram.com/nnnrwanda?utm_source=ig_web_button_share_sheet&igsh=MXBoa2E1bXFnb3N2MA==
"><img src="img/ig.jpg" alt="Instagram"></a>
        <a href="youtube.com/@NexusNewsNetwork_11
"><img src="img/yout.jpg" alt="youtube"></a>
        <a href="https://www.facebook.com/profile.php?id=61566301534848&mibextid=ZbWKwL

"><img src="img/facebook.png" alt="Facebook"></a>
        <a href="https://whatsapp.com/channel/0029VbAMorYCxoAzT2hmP53h "><img src="img/w.jpeg" alt="WhatsApp"></a>
        <a href=" https://www.tiktok.com/@nexus.news.network?_t=ZM-8xy3htvIVbp&_r=1
"><img src="img/tiktok.png" alt="tiktok"></a>
          </div>
    <p class="footer-text">&copy; 2025Nexus News Network All rights reserved.</p>
</footer>
</script>
<script>
    function updateClock() {
      const now = new Date();

      const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Africa/Kigali'
      };

      const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Africa/Kigali'
      };

      document.getElementById("date").innerHTML = now.toLocaleDateString("en-US", dateOptions);
      document.getElementById("time").innerHTML = now.toLocaleTimeString("rw-RW", timeOptions);
    }

    updateClock();
    setInterval(updateClock, 1000);
  </script>
  </body>
 </html>
