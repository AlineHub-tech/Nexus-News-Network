<?php
require_once 'db.php';
$pdo = getPDO();

if (isset($_GET['delete'])) {
    $pdo->prepare("DELETE FROM ads WHERE id=?")->execute([$_GET['delete']]);
}

$ads = $pdo->query("SELECT * FROM ads ORDER BY created_at DESC LIMIT 3")->fetchAll();
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
    <a href="regester.html" title="Jounalist login">
      <button>👤</button>
    </a>
  </div>
   </section>
        </header>
<div class="nav" id="mainNav" style="padding:2px;">
    <a href="index.php"><?= $lang['HOME'] ?></a>
 <a href="category.php?cat=politics"><?= $lang['POLITICS'] ?></a>
<a href="category.php?cat=business"><?= $lang['BUSINESS'] ?></a>
<a href="category.php?cat=culture"><?= $lang['CULTURE'] ?></a>
<a href="category.php?cat=entertainment"><?= $lang['INTERTAINMENT'] ?></a>
<a href="category.php?cat=life"><?= $lang['LIFE'] ?></a>
<a href="category.php?cat=sport"><?= $lang['SPORTS'] ?></a>
<a href="category.php?cat=community"><?= $lang['COMMUNITY'] ?></a>
<a href="category.php?cat=tv"><?= $lang['TV'] ?></a>
    <form action="search.php" method="GET" class="search-form" style="background-color:none; border:none; padding:0; margin-top:1%;">
  <input type="text" name="query" placeholder="Shaka inkuru..." required>
  <button type="submit" class="button">Search</button>
</form>
</div></div>
    <span class="menu-icon" id="menuToggle">&#9776;</span>
  <div class="ads-container">
  <div class="ads-content">
    <p>AMAMAZA HANO</p>
  </div>
</div>
</div>
<table border="2" cellpading="5" style="width:90%;margin:auto;">
  <tr><th>Title</th><th>Link</th><th>Actions</th></tr>
  <?php foreach($ads as $ad): ?>
    <tr>
      <td><?= htmlspecialchars($ad['title']) ?></td>
       <td class="ads-actions">
        <?php if ($ad['link']): ?>
          <a href="<?= htmlspecialchars($ad['link']) ?>" target="_blank">Link</a>
        <?php endif; ?>
      </td>
     <td class="ads-actions">
        <a href="?delete=<?= $ad['id'] ?>" onclick="return confirm('Siba iyi ad?')">Siba</a>
      </td>
    </tr>
  <?php endforeach; ?>
</table>
<a href="adevertise.php"style="color:black;margin-bottom:20%; margin-left:38%;">Ongeramo Advertisement yamashusho</a>
<a href="ads.php"style="color:black;margin-bottom:20%; margin-left:38%;">Ongeramo Advertisement yamagambo</a>
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
<!-- <script>
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
</script> -->
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
<!-- Niba ushaka animation yizo 3 zo hagati zijya zisimburana -->
<script>
let middleSlider = document.getElementById("middleSlider");
let slideIndex = 0;

function showNextSlide() {
  const slides = middleSlider.querySelectorAll(".slide");
  slides.forEach((slide, idx) => {
    slide.style.display = idx === slideIndex ? 'block' : 'none';
  });

  slideIndex = (slideIndex + 1) % slides.length;
}

setInterval(showNextSlide, 4000); // Hindura buri segonda 4
showNextSlide(); // Tangira
</script>
<script>
const adsSlider = document.getElementById('adsSlider');
const ads = adsSlider.querySelectorAll('.ads-content');
let adIndex = 0;
function showAds() {
  adsSlider.style.transform = `translateX(-${adIndex * 418}px)`;
}
setInterval(() => {
  adIndex = (adIndex + 1) % ads.length;
  showAds();
}, 4000); // Hindura buri segonda 4
showAds();
</script>
 </body>
</html>

     