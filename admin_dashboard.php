<?php
require_once 'auth.php';
require_once 'db.php';

requireLogin();
if (!isAdmin()) die('Admin only');

$pdo = getPDO();
$pending = $pdo->prepare("SELECT * FROM articles WHERE status = 'pending'");
$pending->execute();
$articles = $pending->fetchAll();
?>
<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="rw">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexus News Network</title>
    <link rel="stylesheet" href="assets/css/index.css">
</head>
<body>
    <header>
        <img src="img/nnn.jpg" alt="nnnrwanda">
        <h1 class="logo">|NEXUS<br>|NEWS<br>|NETWORK</h1>
  </div>
   <div class="datetime-wrapper">
    <div id="date" class="date"></div>
    <div id="time" class="time"></div>
     </div>
     <div class="lang-flags">
  <a href="?lang=rw">🇷🇼</a>
  <a href="?lang=en">🇬🇧</a>
</div>
  <div class="user-login">
   <a href="index.php" title="Jounalist login">
      <button>👤</button>
    </a>
  </div>
   </section>
        </header>
  <h2 style="font-size:30px; margin-top:2%;color:black;">🕒 Reba Inkuru Zitararemezwa</h2>

  <?php if (count($articles) > 0): ?>
    <?php foreach($articles as $a): ?>
      <div class="admin">
      <div style="margin-bottom: 15px;">
        <h3><?= htmlspecialchars($a['title']) ?></h3>
        <p><?= nl2br(htmlspecialchars(substr($a['body'], 0, 100))) ?>...</p><br><br><br>
        <a href="approve_article.php?id=<?= $a['id'] ?>">✅ Emeza</a> |<br><br>
        <a href="edit_aritcle.php?id=<?= $a['id'] ?>">✏ Hindura</a> |<br><br>
         <a href="delete_aritcle.php?id=<?= $a['id'] ?>" onclick="return confirm('Urashaka koko gusiba iyi nkuru?')">🗑 Siba inkuru</a> |
            </div>
      </div>
      <hr>
    <?php endforeach; ?>
  <?php else: ?>
    <p style="margin-left:36%;font-size:25px; font-weight:bold;margin-top:2%;">Nta nkuru zitararemezwa ziboneka.</p><br>
      <p style="font-size:25px; margin-left:36%; text-decoration: none;color:black;margin-top:1%;">
        <a href="admin_view.php"style="text-decoration: none;color:black;">➡Reba Inkuru wemeje🏪</a></p>
            <a href="adevertise.php"style="color:red;margin-left:36%;">Amamaza </a>
        <?php endif; ?>
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