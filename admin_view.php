<?php
require_once 'db.php';
require_once 'auth.php';
requireLogin();
if (!isAdmin()) die('Admin only');
$pdo = getPDO();
$approved = $pdo->query("SELECT * FROM articles WHERE status='approved' ORDER BY created_at DESC")->fetchAll();
$ap = $pdo->query("SELECT * FROM users WHERE role='author'")->fetchAll();
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
<h2>Inkuru Zemejwe</h2>
<table border="1" cellpadding="1">
  <tr>
    <th>Title</th>
    <th>Umwanditsi</th>
    <th>Igihe</th>
     <th>view zabonetse</th>
    <th colspan="2">Ibikorwa</th>
  </tr>
  <?php foreach($approved as $a): ?>
    <tr>
       </tr>
  <?php foreach($ap as $ar): ?>
    <tr>
      <td class="action-link"><?= htmlspecialchars($a['title']) ?></td></div>
       <td class="action-link"><?= htmlspecialchars($ar['name']) ?></td><div>  
      <td class="action-link"><?= $a['created_at'] ?></td></div>
       <td class="action-link"> <?= (int)$a['views'] ?></td></div>
               <td>
        <a href="delete_app.php?id=<?= $a['id'] ?>" onclick="return confirm('Urashaka gusiba iyi nkuru?')">🗑 Siba</a>
         <a href="update.php?id=<?= $a['id'] ?>" onclick="return confirm('Urashaka guhindura iyi nkuru?')">Hindura</a>
      </td>
    </tr>
  <?php endforeach; ?>
   <?php endforeach; ?>
</table>
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
<footer>
      <!-- ...footer content... -->
    </footer>
 <script>
const h2Text = "Latest News";
const pText = "ADVERTISE HERE";

function typeWriter(elementId, text, speed, callback) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            // Iyi line ikora handling ya <br>
            if (text.substring(i, i+4) === "<br>") {
                document.getElementById(elementId).innerHTML += "<br>";
                i += 4;
            } else {
                document.getElementById(elementId).innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(typing, speed);
        } else if (callback) {
            setTimeout(callback, 700); // pause before next typing
        }
    }
    document.getElementById(elementId).innerHTML = "";
    typing();
}

// Looping typing effect
function startTypingLoop() {
    typeWriter("type-h2", h2Text, 70, function() {
        typeWriter("type-p", pText, 30, function() {
            setTimeout(() => {
                document.getElementById("type-h2").innerHTML = "";
                document.getElementById("type-p").innerHTML = "";
                startTypingLoop();
            }, 2000); // pause before restart
        });
    });
}

startTypingLoop();
</script>
<script>
document.getElementById('menuToggle').onclick = function() {
    document.getElementById('mainNav').classList.toggle('open');
};
</script>
<script>
function toggleLangMenu() {
  const menu = document.getElementById("langMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function setLanguage(code) {
  const flagPath = code === "rw" ? "img/rwflag.jpeg" : "img/ukflag.jpeg";
  const label = code === "rw" ? "Kinyarwanda" : "English";

  document.querySelector(".lang-btn").innerHTML = `<img src="${flagPath}" alt="${flagPath}"> ${label}`;
  document.getElementById("langMenu").style.display = "none";

  // Optional: link this to translation logic
  console.log("Selected language:", code);
};
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
  <script>
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const navItems = document.getElementById('navItems');

    // Iyo ukanda kuri icon ya search
    searchBtn.addEventListener('click', () => {
      // Tanga input, hisha nav
      searchInput.style.display = 'inline-block';
      navItems.style.display = 'none';
      searchInput.focus(); // shyira cursor mu input
    });

    // Iyo uvuye mu input cyangwa ukoresheje ESC
    searchInput.addEventListener('blur', () => {
      searchInput.style.display = 'none';
      navItems.style.display = 'flex';
    });

    // Gufunga search ukoresheje ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.style.display = 'none';
        navItems.style.display = 'flex';
      }
    });
  </script>
  <script>
  const toggleBtn = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');

  toggleBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });
</script>
 </body>
</html>

     