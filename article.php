<?php
require_once 'db.php'; // getPDO()

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $body = $_POST['body'];
    $author_id = $_POST['user_id'] ?? 'Admin';
    $category_id = $_POST['category_id'] ?? null;
    $status ='pending';

    // Handle image
   $image = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    $image = $_FILES['image']['name'];
    $target ='uploads/' . basename($image);
    move_uploaded_file($_FILES['image']['tmp_name'], $target);
}

    $pdo = getPDO();
    $stmt = $pdo->prepare("INSERT INTO articles (title, body, author_id, category_id, status, image) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$title, $body, $author_id, $category_id, $status, $image]);
header("Location:auther_view.php");
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
  <form method="post" enctype="multipart/form-data" class="article-form">
  <input type="text" name="title" placeholder="Title" required>
  <textarea name="body" placeholder="Body" required></textarea>
  <input type="text" name="author_id" placeholder="Author">
  <select name="category_id">
    <option value="1">Home</option>
    <option value="2">politics</option>
    <option value="3">bussiness</option>
    <option value="4">culture</option>
    <option value="5">Entertainment</option>
    <option value="6">life</option>
    <option value="7">Sport</option>
    <option value="8">Community</option>
    <option value="9">TV</option>
    <option value="10">opnion</option>
  </select>
  <input type="file" name="image">
  <button type="submit">Ohereza inkuru</button>
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
