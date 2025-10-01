<?php require_once 'config.php'; ?>
<?php
require_once 'db.php';
$pdo = getPDO();

// Guhindura ururimi
if (isset($_GET['lang'])) {
    $_SESSION['lang'] = $_GET['lang'];
}

// Default: rw (Ikinyarwanda)
$lang_code = $_SESSION['lang'] ?? 'rw';
$lang_file = 'lang/' . $lang_code . '.php';
require_once $lang_file;
$latest_articles = $pdo->query("SELECT * FROM articles WHERE status='approved' AND (video IS NULL OR video = '') ORDER BY created_at DESC LIMIT 7")->fetchAll();
$regular_articles = $pdo->query("SELECT * FROM articles WHERE status='approved' ORDER BY created_at DESC LIMIT 5, 20")->fetchAll();
$latest = $pdo->query("SELECT * FROM articles WHERE status='approved' AND (video IS NULL OR video = '') ORDER BY created_at DESC LIMIT 7")->fetchAll();
$popular_articles = $pdo->query("SELECT * FROM articles WHERE status='approved' ORDER BY views DESC LIMIT 5")->fetchAll();
$ap = $pdo->query("SELECT * FROM users WHERE role='author'")->fetchAll();

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
    <?php 
    $bottom_ads = $pdo->query("SELECT * FROM ads ORDER BY created_at DESC LIMIT 1")->fetchAll();
  ?>
  <div class="ads-container">
  <div class="ads-content">
    <a href="manage_ads.php"><p></p></a>
     <?php foreach($bottom_ads as $index => $ad): ?>
      <?php if ($ad['link']): ?>
          <a href="<?= htmlspecialchars($ad['link']) ?>" target="_blank">
        <?php endif; ?>
         <p style="margin-left:-10%;"><?= htmlspecialchars($ad['title']) ?> /</p>
        <?php if ($ad['link']): ?>
          </a>
        <?php endif; ?>
      </div>
    <?php endforeach; ?>
  </div>
</div>
</div>
 <?php
// Assumes $latest_articles is already fetched from DB with at least 7 articles
?>

<style>
.latest-news-7 {
   display: flex;
  flex-direction:row;
  gap: 22px;
  max-width: 900px;
  /* margin: 5px auto; */
  margin-left:10%;
  padding: 0 10px;
}

.latest-news-7 > div {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.latest-left, .latest-right {
  flex: 1;
  min-width: 250px;
}
.latest-left .news-card,.latest-right .news-card {
  cursor: pointer;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 7px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s;
}
.latest-right .news-card{
margin-left:10%;
 border-radius: 8px;
 border:3px solid skyblue;
}
.latest-left .news-card{
margin-left:-20%;
 border-radius: 8px;
 border:3px solid skyblue;
}
.latest-left .news-card:hover, .latest-right .news-card:hover {
  transform: scale(1.03);
}

.latest-left img, .latest-right img {
   width: 160px;
  height: 110px;
  object-fit: contain;
  border-radius: 8px;
  background: #f7f7f7;
  display: block;
}


.latest-center {
  flex: 2;
  min-width: 650px;
 
  position: relative;
}

.latest-center .news-card {
  display: none;
  background: #fff;
  border-radius: 8px;
  width: 85%;
   height:50%;
  margin-left:6%;
    border:3px solid skyblue;
   box-shadow: 0 2px 7px rgba(0,0,0,0.1);
  /* overflow: hidden; */
  cursor: pointer;
  transition: opacity 0.5s ease;
}

.latest-center .news-card.active {
  display: block;
}

.latest-center img {
   width: 100%;
  height: 40%;
 
}

/* Dots below center news */
.dots {
  text-align: center;
  margin-top: 12px;
}

.dots .dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: #ccc;
  border-radius: 50%;
  margin: 0 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dots .dot.active {
  background: #333;
}

/* Text styles */
.news-card h3 {
  margin: 10px;
  font-size: 18px;
  color: #222;
}
.news-card .meta {
  margin: 0 10px 10px;
  font-size: 14px;
  color: #555;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.news-card .meta span,
.news-card .meta a,
.news-card .meta form button {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #444;
}

.news-card .meta form button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.news-card .meta form button:hover {
  color: #007bff;
}
.meta {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  font-size: 14px;
  gap: 10px;
}

.read-more {
  margin: 0 10px 10px;
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

/* Responsive */
 @media (max-width: 900px) {
  .latest-news-7 {
       flex-direction:column;
    align-items: stretch;
    padding: 8px;
  }
  .latest-left, .latest-center, .latest-right {
    min-width: 100%;
     flex-direction: column;
  }
 .latest-left img, .latest-right img{
    width: 120px;
    height: 80px;
  }
  .latest-center .news-card {
    /* display: block !important;
    margin-bottom: 20px; */
  }
  .dots {
    display: flex;
    margin-left:5%;
  }
} 
</style>

<div class="latest-news-7">
  <?php  $latest_articles = $pdo->query("
    SELECT a.*, 
      (SELECT COUNT(*) FROM comments WHERE article_id = a.id AND parent_id IS NULL) AS comment_count,
      (SELECT COUNT(*) FROM comments WHERE article_id = a.id AND comment_text = '👍') AS like_count
    FROM articles a
    WHERE a.status = 'approved'
    ORDER BY a.created_at DESC
    LIMIT 7 
")->fetchAll();
?>
  <!-- Left: 2 articles -->
  <div class="latest-left">
    <?php for ($i = 0; $i <= 1; $i++): ?>
      <?php if(isset($latest_articles[$i])): $a = $latest_articles[$i]; ?>
      <div class="news-card">
        <img src="uploads/<?= htmlspecialchars($a['image']) ?>" alt="<?= htmlspecialchars($a['title']) ?>">
        <h3><?= htmlspecialchars($a['title']) ?></h3>
        <a href="read.php?id=<?= $a['id'] ?>" class="read-more">Soma birambuye...</a>
         <div class="meta">
          <!-- <span>👁 <?= (int)$a['views'] ?>Views </span> -->
          <span>💬 <?= (int)$a['comment_count'] ?>  Comment</span>
          <form action="like.php" method="post" style="display:inline;">
            <input type="hidden" name="article_id" value="<?= $a['id'] ?>">
            <button type="submit">👍 <?= (int)$a['likes'] ?></button>
          </form>
           <?php foreach($ap as $ar): ?>
        <h5>Written By:<?= htmlspecialchars($ar['name']) ?></h5>
        <?php endforeach; ?> 
        </div>
        </div>
      <?php endif; ?>
    <?php endfor; ?>
  </div>

  <!-- Center: 3 articles with dots -->
  <div class="latest-center">
    <?php for ($i = 2; $i <= 4; $i++): ?>
      <?php if(isset($latest_articles[$i])): $a = $latest_articles[$i]; ?>
      <div class="news-card<?= $i === 2 ? ' active' : '' ?>">
        <img src="uploads/<?= htmlspecialchars($a['image']) ?>" alt="<?= htmlspecialchars($a['title']) ?>">
        <h3><?= htmlspecialchars($a['title']) ?></h3>
        <a href="read.php?id=<?= $a['id'] ?>" class="read-more">Soma birambuye...</a>
        <div class="meta">
          <!-- <span>👁 <?= (int)$a['views'] ?>Views </span> -->
          <span>💬 <?= (int)$a['comment_count'] ?>  Comment</span>
          <form action="like.php" method="post" style="display:inline;">
            <input type="hidden" name="article_id" value="<?= $a['id'] ?>">
            <button type="submit">👍 <?= (int)$a['likes'] ?></button>
          </form>
           <?php foreach($ap as $ar): ?>
        <h5>Written By:<?= htmlspecialchars($ar['name']) ?></h5>
        <?php endforeach; ?> 
        </div>
      </div>
      <?php endif; ?>
    <?php endfor; ?>

    <div class="dots">
      <span class="dot active" onclick="showCenterNews(0)"></span>
      <span class="dot" onclick="showCenterNews(1)"></span>
      <span class="dot" onclick="showCenterNews(2)"></span>
    </div>
  </div>
  
  <!-- Right: 2 articles -->
  <div class="latest-right">
    <?php for ($i = 5; $i <= 6; $i++): ?>
      <?php if(isset($latest_articles[$i])): $a = $latest_articles[$i]; ?>
      <div class="news-card">
        <img src="uploads/<?= htmlspecialchars($a['image']) ?>" alt="<?= htmlspecialchars($a['title']) ?>">
        <h3><?= htmlspecialchars($a['title']) ?></h3>
        <a href="read.php?id=<?= $a['id'] ?>" class="read-more">Soma birambuye...</a>
        <div class="meta">
          <!-- <span>👁 <?= (int)$a['views'] ?>Views </span> -->
          <span>💬 <?= (int)$a['comment_count'] ?>  Comment</span>
          <form action="like.php" method="post" style="display:inline;">
            <input type="hidden" name="article_id" value="<?= $a['id'] ?>">
            <button type="submit">👍 <?= (int)$a['likes'] ?></button>
          </form>
           <?php foreach($ap as $ar): ?>
        <h5>Written By:<?= htmlspecialchars($ar['name']) ?></h5>
        <?php endforeach; ?> 
        </div>
      </div>
      <?php endif; ?>
    <?php endfor; ?>
  </div>

</div>

<script>
function showCenterNews(index) {
  const cards = document.querySelectorAll('.latest-center .news-card');
  const dots = document.querySelectorAll('.dots .dot');

  cards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}
</script>
<style>

.latest-news-slider {
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  position: relative;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 7px rgba(0,0,0,0.09);
  /* overflow: hidden; */
}

.slider-wrapper {
  position: relative;
  width: 100%;
  height: 340px;
}

.slide {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 340px;
  padding: 10px;
  box-sizing: border-box;
  animation: fadeIn 0.7s;
}

.slide.active {
  display: flex;
}

.slide img {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 10px;
}

.slide h3 {
  font-size: 18px;
  margin: 10px 0 5px 0;
  color: #222;
  text-align: center;
}

.slide .meta {
  font-size: 14px;
  color: #555;
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 8px;
}

.read-more {
  color: #007bff;
  text-decoration: none;
  font-size: 15px;
  margin-top: 5px;
}

.slider-dots {
  text-align: center;
  margin-top: 10px;
}

.slider-dots .dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: #ccc;
  border-radius: 50%;
  margin: 0 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.slider-dots .dot.active {
  background: #007bff;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98);}
  to { opacity: 1; transform: scale(1);}
}

/* Desktop: show flex layout */
</style>

<div class="latest-news-slider">
  <?php  $latest= $pdo->query("
    SELECT a.*, 
      (SELECT COUNT(*) FROM comments WHERE article_id = a.id AND parent_id IS NULL) AS comment_count,
      (SELECT COUNT(*) FROM comments WHERE article_id = a.id AND comment_text = '👍') AS like_count
    FROM articles a
    WHERE a.status = 'approved'
    ORDER BY a.created_at DESC
    LIMIT 7 
")->fetchAll();
?>
<div class="latest-news-slider">
  <div class="slider-wrapper">
    <?php foreach($latest as $i => $a): ?>
      <div class="slide<?= $i === 0 ? ' active' : '' ?>">
        <img src="uploads/<?= htmlspecialchars($a['image']) ?>" alt="<?= htmlspecialchars($a['title']) ?>">
        <h3><?= htmlspecialchars($a['title']) ?></h3>
        <a href="read.php?id=<?= $a['id'] ?>" class="read-more">Soma birambuye...</a>
        <div class="meta">
          <span>💬 <?= (int)$a['comment_count'] ?> Comment</span>
          <form action="like.php" method="post" style="display:inline;">
            <input type="hidden" name="article_id" value="<?= $a['id'] ?>">
            <button type="submit">👍 <?= (int)$a['likes'] ?></button>
          </form>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
  <div class="slider-dots">
    <?php foreach($latest as $i => $a): ?>
      <span class="dot<?= $i === 0 ? ' active' : '' ?>" onclick="showSlide(<?= $i ?>)"></span>
    <?php endforeach; ?>
  </div>
</div>

<script>
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dots .dot');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
  currentSlide = index;
}

// Auto-slide
setInterval(() => {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}, 4000);

// Dot click
dots.forEach((dot, i) => {
  dot.onclick = () => showSlide(i);
});
</script>


<h2 class="section-heading">ANDI MAKURU</h2>
  <?php  $regular_articles = $pdo->query("
    SELECT a.*, 
      (SELECT COUNT(*) FROM comments WHERE article_id = a.id AND parent_id IS NULL) AS comment_count,
      (SELECT COUNT(*) FROM comments WHERE article_id = a.id AND comment_text = '👍') AS like_count
    FROM articles a
    WHERE a.status = 'approved'
    ORDER BY a.created_at DESC
    LIMIT 5 OFFSET 5
")->fetchAll();
?>
  <div class="regular-news">
  <?php foreach($regular_articles as $article): ?>
    <div class="regular-article">
      <div class="image-content">
        <img src="uploads/<?= htmlspecialchars($article['image']) ?>" alt="<?= htmlspecialchars($article['title']) ?>">
      </div>
      <div class="text-content">
        <h3><?= htmlspecialchars($article['title']) ?></h3>
        <a href="read.php?id=<?= $article['id'] ?>" class="read-more">Soma birambuye</a>
        <div class="meta">
          <span>💬 <?= (int)$article['comment_count'] ?> Comment</span>
          <form action="like.php" method="post" style="display:inline;">
            <input type="hidden" name="article_id" value="<?= $article['id'] ?>">
            <button type="submit">👍 <?= (int)$article['like_count'] ?></button>
          </form>
            <?php foreach($ap as $ar): ?>
        <h5 style=" flex-wrap: nowrap;;">Written By:<?= htmlspecialchars($ar['name']) ?></h5>
        <?php endforeach; ?> 
        </div>
      </div>
     
    </div>
  <?php endforeach; ?>
        </div>
      <style>
.regular-news {
  display: flex;
  flex-direction: column;
  gap: 22px;
     max-width: 900px;
  /* margin: 30px auto; */
  padding: 0 10px;
}

.regular-article {
  display: flex;
  gap: 18px;
  border: 1px solid #e1e4e8;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 7px rgba(0,0,0,0.07);
  padding: 14px;
  align-items: flex-start;
}

.image-content img {
  width: 160px;
  height: 110px;
  object-fit: contain;
  border-radius: 8px;
  background: #f7f7f7;
  display: block;
}

.text-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-content h3 {
  font-size: 18px;
  color: #222;
  margin: 0 0 8px 0;
  font-weight: bold;
}

.read-more {
  color: #007bff;
  text-decoration: none;
  font-size: 15px;
  margin-bottom: 8px;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}

.meta {
  display: flex;
  gap: 18px;
  font-size: 14px;
  color: #555;
  align-items: center;
  margin-top: 6px;
}

.meta span,
.meta form button {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #444;
  font-size: 14px;
}

.meta form button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
}

.meta form button:hover {
  color: #007bff;
}

/* Tablet */
@media (max-width: 900px) {
  .regular-news {
    max-width: 98vw;
    padding: 0 2vw;
  }
  .regular-article {
    gap: 12px;
    padding: 10px;
  }
  .image-content img {
    width: 120px;
    height: 80px;
  }
  .text-content h3 {
    font-size: 16px;
  }
  .meta {
    font-size: 12px;
    gap: 10px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .regular-article {
    flex-direction: row;
    align-items: stretch;
    padding: 8px;
  }
  .image-content img {
    width: 100%;
    height: 110px;
    margin-bottom: 8px;
  }
  .text-content h3 {
    font-size: 15px;
  }
  .read-more {
    font-size: 13px;
  }
  .meta {
    font-size: 11px;
    gap: 7px;
  }
}
</style>

<h2 class="section-heading">INKURU ZIKUZWE</h2>
 <div class="popular-carousel-wrapper">
  <div class="popular-carousel">
    <?php foreach($popular_articles as $pop): ?>
      <a href="article_detail.php?id=<?= $pop['id'] ?>" class="popular-slide"style="color:black;">
        <img src="uploads/<?= htmlspecialchars($pop['image']) ?>" alt="Popular News">
        <div class="popular-info">
          <h4><?= htmlspecialchars($pop['title']) ?></h4>
          <div class="meta">
            <span>👁 <?= (int)$pop['views'] ?></span>
            <span>❤ <?= (int)$pop['likes'] ?></span>
          </div>
        </div>
      </a>
    <?php endforeach; ?>
  </div>
</div>
<?php
require_once 'config.php';
require_once 'db.php';
$pdo = getPDO();

$stmt = $pdo->query("SELECT * FROM tv ORDER BY created_at DESC");
$tv_videos = $stmt->fetchAll();
?>
<h2 class="section-heading">NNN TV</h2>
<?php
require_once 'config.php';
require_once 'db.php';

$pdo = getPDO();

// Fata videos zose za NNN TV
$stmt = $pdo->query("SELECT * FROM nnn_tv ORDER BY created_at DESC");
$videos = $stmt->fetchAll();
?>

<div class="nnn-tv-container">
    <?php foreach ($videos as $v): ?>
    <div class="nnn-tv-card">
        <video controls>
  <source src="uploads<?= htmlspecialchars($row['video_path']) ?>" type="video/mp4">
  Browser yawe ntishobora kwerekana iyi video.
</video>
        <div class="nnn-tv-info">
            <h4><?= htmlspecialchars($v['title']) ?></h4>
            <a href="retv.php?id=<?= $v['id'] ?>">reba video yose</a>
                       <div class="meta">
          <!-- <span>👁 <?= (int)$v['views'] ?>Views </span> -->
          <!-- <span>💬 <?= (int)$v['comment_count'] ?>  Comment</span> -->
          <form action="like.php" method="post" style="display:inline;">
            <input type="hidden" name="article_id" value="<?= $v['id'] ?>">
            <button type="submit">👍 <?= (int)$v['likes'] ?></button>
          </form>
        </div>
        </div>
    </div>
    <?php endforeach; ?>
</div>
<?php
// Function yo kubara comments
function getCommentCount($pdo, $video_id) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM comments WHERE article_id = ?");
    $stmt->execute([$video_id]);
    return $stmt->fetchColumn();
}
?>
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
<script>
let carousel = document.getElementById('popularCarousel');
let scrollAmount = 0;

function autoScrollPopular() {
  scrollAmount += 1;
  if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
    scrollAmount = 0;
  }
  carousel.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

let scrollInterval = setInterval(autoScrollPopular, 50); // Hindura 50ms niba ushaka igende buhoro cyane

// Pause on hover
carousel.addEventListener("mouseover", () => clearInterval(scrollInterval));
carousel.addEventListener("mouseout", () => {
  scrollInterval = setInterval(autoScrollPopular, 50);
});
</script>
<script>
  let currentSlide = 0;
  const slides = document.querySelectorAll('.popular-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      dots[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function goToSlide(index) {
    showSlide(index);
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  setInterval(nextSlide, 5000); // Hindura buri segonda 5
</script>
  <script>
    const tvCarousel = document.getElementById('tvCarousel');
    let tvIndex = 0;
    const tvSlides = tvCarousel.querySelectorAll('.tv-slide');

    function rotateTV() {
      tvIndex = (tvIndex + 1) % tvSlides.length;
      const slideWidth = tvSlides[0].offsetWidth + 20; // 20 = gap
      tvCarousel.style.transform = translateX(-${tvIndex * slideWidth}px);
    }

    let tvInterval = setInterval(rotateTV, 4000);

    // Pause on hover
    tvCarousel.addEventListener('mouseover', () => clearInterval(tvInterval));
    tvCarousel.addEventListener('mouseout', () => tvInterval = setInterval(rotateTV, 4000));
  </script>
  <script>
let scrollContainer = document.querySelector('.latest-new');
let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});
scrollContainer.addEventListener('mouseleave', () => isDown = false);
scrollContainer.addEventListener('mouseup', () => isDown = false);
scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast
  scrollContainer.scrollLeft = scrollLeft - walk;
});
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
<script>
  const popCarousel = document.getElementById('popularCarousel');
  const popSlides = popCarousel.querySelectorAll('.popular-slide');
  let popIndex = 0;
  let popInterval;

  function showNextPopular() {
    popIndex = (popIndex + 1) % popSlides.length;
    popCarousel.style.transform =  `translateX(-${popIndex * 418}px)`;
  }

  function startPopularCarousel() {
    popInterval = setInterval(showNextPopular, 4000);
  }

  function stopPopularCarousel() {
    clearInterval(popInterval);
  }

  popCarousel.addEventListener('mouseenter', stopPopularCarousel);
  popCarousel.addEventListener('mouseleave', startPopularCarousel);

  startPopularCarousel();
</script>
 </body>
</html>

     