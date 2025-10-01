.slider-wrapper {
  display: flex;
  transition: transform 0.7s cubic-bezier(.77,0,.18,1);
}
.slide {
  min-width: 33.33%; /* 3 slides zigaragara icyarimwe */
  box-sizing: border-box;
  padding: 10px;
  opacity: 1;
  transition: opacity 0.5s;
}
@media (max-width: 768px) {
  .slide { min-width: 100%; }
}

/* Latest News Layout */
.latest-new {
  display: flex;
  gap: 15px;
  margin: 30px auto;
  flex-wrap: wrap;
  justify-content: space-between;
}

.left-featured,
.middle-slider,
.right-featured {
  width: 32%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.middle-slider{
margin-left: -1%;
margin-top: -2%;
}
.left-featured{
margin-left: 0%;
margin-top: 1%;
}

.left-featured .slide,
.middle-slider .slide,
.right-featured .slide {
  border: 1px solid #ddd;
  /* padding: 10px;
  background-color: #f9f9f9; */
}

.slide img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.slide h3 {
  font-size: 18px;
  margin: 10px 0;
}

.meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
}

/* Regular News Layout */
/* .regular-news {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px auto;
}

.regular-article {
  display: flex;
  gap: 15px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #fff;
}

.regular-article .image-content img {
  width: 150px;
  height: 100px;
  margin-top: 50%;
  object-fit: cover;
}

.regular-article .text-content {
  flex: 1;
  margin-left: -30%;
    margin-top: 10%;
}

.regular-article h4 {
  margin: 0;
  font-size: 17px;
  color: #000;
}

.regular-article p {
  font-size: 14px;
  color: #333;
  margin: 5px 0;
  }

.regular-article .meta {
  display: flex;
  gap: 15px;
    font-size: 13px;
  color: #555;
    /* margin-top: 10%; */
} */

/* === RESPONSIVE STYLING === */
/* Responsive flags */
.lang-flags img {
  width: 30px !important;
  height: 20px !important;
  object-fit: cover;
  border-radius: 2px;
  margin-right: 5px;
}

/* Responsive for small devices */
@media screen and (max-width: 992px) {
  .latest-new {
    flex-direction: column;
    gap: 20px;
  }

  .left-featured,
  .middle-slider,
  .right-featured {
    width: 100%;
  }

  .slide img {
    height: 200px;
  }
}

/* @media screen and (max-width: 768px) {
  .regular-article {
    flex-direction: column;
    align-items: center;
  }

  .regular-article .image-content img {
    width: 100%;
    height: auto;
  }

  .regular-article .text-content {
    text-align: center;
  }

  .regular-article h4 {
    font-size: 16px;
  }

  .regular-article p {
    font-size: 13px;
  }

  .regular-article .meta {
    justify-content: center;
    flex-wrap: wrap;
  }
} */
/* REGULAR NEWS CARD STYLE */
/* .regular-news {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-right:40%;
  padding: 0 10px;
}

.regular-article {
  width: 32%;
  display: flex; */
  /* flex-direction: column; */
  /* gap: 15px;
}

.regular-article:hover {
  transform: translateY(-3px);
}

.image-content img {
  width:200px;
  margin-top:70%;
  height: 120px;
  object-fit: cover;
  display: block;
} 

/* Text content right of image */ .text-content {
  padding: 10px 15px;
  flex: 1;
}

.text-content h4 {
  font-size: 18px;
  color: #000;
  margin: 0 0 8px;
} 

/* .text-content p {
  font-size: 15px;
  color: #333;
  margin-bottom: 10px;
}

.text-content a {
  color: #007BFF;
  text-decoration: none;
  font-weight: 500;
}

.text-content .meta {
  margin-top: 8px;
  display: flex;
  gap: 15px;
  font-size: 13px;
  color: #777;
  flex-wrap: wrap;
}

.text-content form {
  display: inline-block;
} */

/* RESPONSIVE */
 @media screen and (max-width: 768px) {
  .regular-article {
    flex-direction: column;
    align-items: center;
  }

  .image-content img {
    width: 100%;
    height: auto;
  }

  .text-content {
    padding: 12px;
  }

  .text-content h4 {
    font-size: 17px;
    text-align: center;
  }

  .text-content p {
    text-align: center;
  }

  .text-content .meta {
    justify-content: center;
  }
} 
/* Animation for latest news slider */
/* .slide {
  opacity: 0;
  transform: translateY(30px);
  animation:opocity 1s ease-in-out;
}
.slide.acttive{opacity: 1;

} */

/* .slide:nth-child(1) { animation-delay: 0.2s; }
.slide:nth-child(2) { animation-delay: 0.4s; }
.slide:nth-child(3) { animation-delay: 0.6s; }
.slide:nth-child(4) { animation-delay: 0.8s; }
.slide:nth-child(5) { animation-delay: 1s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
} */

/* ...existing code... */
/* ...existing code... */
/* .latest-news-slider {
   margin-left:2%;
 
}
/* .slider-wrapper {
    display: flex;

} */
.slide {  border: 2px solid white; 
    flex: 0 0 auto;
    /* width: 270px; */
    border-radius: 3px;
    margin-right: 10px;
    /* position: relative; */
}
.slide img { min-width: 400px;
  max-width: 400px;
  height: 380px;
  border-radius: 8px;
  object-fit: cover;
    /* border-radius: 10px; */
}
.slide-title {
    /* position: absolute; */
    /* bottom: 0; */
    /* background: rgba(0,0,0,0.6); */
    color:black;
    width: 100%;
    /* padding: 5px; */
    font-size: 14px;
}
/* .regular-article {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 10%;
  border: 1px solid #ccc;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px #0000001a;
  align-items: flex-start;
  transition: transform 0.3s ease;
}

.text-content {
  flex: 2;
  margin-top: 16%;
  padding-right:-15px;
}

.regular-article .image-content {
  flex: 1;
} */

/* .regular-article img {
   width: 50%;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
}

.regular-article .meta {
  margin-top: 8px;
  font-size: 14px;
  display: flex;
  gap: 15px;
  /* align-items: center; */
} */
/* 
.regular-news {
  /* display: flex;
  flex-direction: column; */
  /* gap: 20px;
  padding: 20px; */
}

/* h4{margin-left:5%; */
  /* margin-top:2%;
  background-color: #007bff;
  width:12%;
  height:52px;
  color: white;
  font-size: 15px;
  border-bottom-right-radius: 20px; */

} 

/* .article-box {
  display: flex;
  flex-direction: row;
  gap: 20px;
  border: 1px solid #ccc;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px #0000001a;
  align-items: flex-start;
  transition: transform 0.3s ease;
}

.article-box:hover {
  transform: scale(1.01);
}

.article-box img {
  width: 180px;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
} */

/* .article-box h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #222;
}

.article-box .meta {
  font-size: 14px;
  color: #777;
  margin-top: 10px;
}

.article-box .read-more {
  display: inline-block;
  margin-top: 10px;
  color: #0077cc;
  text-decoration: none;
} */

/* .article-box .read-more:hover {
  text-decoration: underline; */
}

/* Responsive */
/* @media (max-width: 768px) {
  .article-box {
    flex-direction: column;
    align-items: center;
  }

  .article-box img {
    width: 100%;
    height: auto;
  }

  


  .latest-new {
  display: flex;
  gap: 15px;
  margin: 30px auto;
  flex-wrap: wrap;
  justify-content: space-between;
}

.left-featured,
.middle-slider,
.right-featured {
  width: 32%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* margin-left:1%; */
}

.left-featured .slide,
.middle-slider .slide,
.right-featured .slide {
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f9f9f9;
}
.middle-slider{margin-left:-3%;
margin-top:-1.5%;
}
.right-featured{margin-left:-2%;
margin-top:-1%;
}
.left-featured{margin-left:1%;
/* margin-top:-1.5%; */
}

.slide img {
  width: 100%;
  height: 480px;
  object-fit: cover;
}

.slide h3 {
  font-size: 18px;
  margin: 10px 0;
}

.meta {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  font-size: 14px;
  gap: 10px;
}



<!-- Slider y’inkuru zigezweho -->
<div class="latest-new">
  <!-- Inkuru ibumoso: ya mbere -->
  <div class="left-featured">
    <?php
    $latest_articles = $pdo->query("
    SELECT a.*, 
      (SELECT COUNT(*) FROM comments WHERE article_id = a.id AND parent_id IS NULL) AS comment_count,
      (SELECT COUNT(*) FROM comments WHERE article_id = a.id AND comment_text = '👍') AS like_count
    FROM articles a
    WHERE a.status = 'approved'
    ORDER BY a.created_at DESC
    LIMIT 5
")->fetchAll();
?>
      <?php if (isset($latest_articles[0])): $a = $latest_articles[0]; ?>
       <div class="slide">
        <img src="uploads/<?= htmlspecialchars($a['image']) ?>" alt="">
        <h3><?= htmlspecialchars($a['title']) ?></h3>
         <a class="read-more" href="read.php?id=<?= $a['id'] ?>"style="text-decoration:none;color:blue;">Soma birambuye...</a>
        <div class="meta">
     <span class="date-time">
    <?= date("d M Y", strtotime($a['created_at'])) ?> <?= date("H:i", strtotime($a['created_at'])) ?>
  </span>
  <span><span class="icon">👁️</span><?= (int)$a['views'] ?> Views</span>
  <a href="comment.php?id=<?= $a['id'] ?>"><span class="icon">💬</span><?= (int)$a['comment_count'] ?> Comments</a>
           <span><form action="like.php" method="post" style="display:inline;"><span>
    <input type="hidden" name="article_id" value="<?= $a['id'] ?>">
    <button type="submit"><span class="icon"style="margin-left:20%;margin-bottom:10%;">👍</span><?= (int)$a['likes'] ?></button>
  </form>
        </div>
        <a cla=<?= $a['id'] ?></a>
      </div>
    <?php endif; ?>
  </div>

  <!-- Slider w’inkuru 3 zo hagati -->
  <div class="middle-slider" id="middleSlider">
    <?php for ($i = 1; $i <= 3; $i++): if (isset($latest_articles[$i])): $a = $latest_articles[$i]; ?>
      <div class="slide">
        <img src="uploads/<?= htmlspecialchars($a['image']) ?>" alt="">
        <h3><?= htmlspecialchars($a['title']) ?></h3>
         <a class="read-more" href="read.php?id=<?= $a['id'] ?>"style="text-decoration:none;color:blue;">Soma birambuye...</a>
        <div class="meta">
     <span class="date-time">
    <?= date("d M Y", strtotime($a['created_at'])) ?> <?= date("H:i", strtotime($a['created_at'])) ?>
  </span>
  <span><span class="icon">👁️</span><?= (int)$a['views'] ?> Views</span>
  <a href="comment.php?id=<?= $a['id'] ?>"><span class="icon">💬</span><?= (int)$a['comment_count'] ?> Comments</a>
           <span><form action="like.php" method="post" style="display:inline;"><span>
    <input type="hidden" name="article_id" value="<?= $a['id'] ?>">
    <button type="submit"><span class="icon"style="margin-left:20%;margin-bottom:10%;">👍</span><?= (int)$a['likes'] ?></button>
  </form>
        </div>
        <a cla=<?= $a['id'] ?></a>
      </div>
    <?php endif; endfor; ?>
  </div>

  
  <!-- Inkuru iburyo: ya 5 -->
  <div class="right-featured">
    <?php if (isset($latest_articles[4])): $a = $latest_articles[4]; ?>
     <div class="slide">
        <img src="uploads/<?= htmlspecialchars($a['image']) ?>" alt="">
        <h3><?= htmlspecialchars($a['title']) ?></h3>
         <a class="read-more" href="read.php?id=<?= $a['id'] ?>"style="text-decoration:none;color:blue;">Soma birambuye...</a>
        <div class="meta">
     <span class="date-time">
    <?= date("d M Y", strtotime($a['created_at'])) ?> <?= date("H:i", strtotime($a['created_at'])) ?>
  </span>
  <span><span class="icon">👁️</span><?= (int)$a['views'] ?> Views</span>
  <a href="comment.php?id=<?= $a['id'] ?>"><span class="icon">💬</span><?= (int)$a['comment_count'] ?> Comments</a>
           <span><form action="like.php" method="post" style="display:inline;"><span>
    <input type="hidden" name="article_id" value="<?= $a['id'] ?>">
    <button type="submit"><span class="icon"style="margin-left:20%;margin-bottom:10%;">👍</span><?= (int)$a['likes'] ?></button>
  </form>
        </div>
        <a cla=<?= $a['id'] ?></a>
      </div>
    <?php endif;  ?>
  </div>