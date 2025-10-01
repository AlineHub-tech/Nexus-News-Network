{
margin: 0;
padding: 0;
box-sizing: border-box;
}
body {  padding-top: 120px;
font-family: 'Segoe UI', sans-serif;
background-color: #f5f5f5;
/ min-height: 100vh;
display: flex;
flex-direction: column; */
}
header {display: flex;
background:#000a14;
color: #ffffff;
padding: 20px;

}

.language-toggle {
position: relative;
display: inline-block;
/* margin-top: 10%; */
margin-left:5%;
}

.lang-btn {
background-color: #01203d;
color: #fff;
border: none;
padding: 10px ;
font-size:15px;
border-radius: 6px;
cursor: pointer;
display: flex;
align-items: center;
gap: 10px;
width:109%;
}

.lang-btn img {
width:20p%;
height: 16px;
border-radius: 3px;
}

.lang-menu {
position: absolute;
/* top: 110%; /
left: 0;
/ background-color: rgb(3, 94, 129); */
border-radius: 6px;
box-shadow: 0 4px 8px rgba(0,0,0,0.1);
display: none;
z-index: 999;
padding: 5px 0;
width: 130px;
}
.long-menu div img{width:20%;

}

.lang-menu div {
padding: 10px 15px;
display: flex;
align-items: center;
gap: 10px;
cursor: pointer;
}

.lang-menu div:hover {
background-color: #f2f2f2;
}

.lang-menu img {
width: 20px;
height: 16px;
border-radius: 3px;
}
.datetime-wrapper {
display: flex;
align-items: right;
gap: 1rem; /* intera hagati ya date na time */
padding:5px 0 0 40px;
margin-left: 5%;
}

.date, .time {  
  font-size: 1.2rem;  
  color: rgb(243, 237, 237);  
  font-weight: bolder;  
}  

.time {  
  font-weight: bold;  
  color: #438ceb;  
}

/* Admin/User login icon */
.user-login  {
position: absolute;
top: 10px;
right: 10px;
}

/* margin-left: 13%;
} */
.user-login a {
color: #333;
font-size: 18px;
text-decoration: none;
transition: color 0.3s ease;
}

.user-login a button:hover {
color: #007bff;
cursor: pointer;
}
.user-login a button{
height: 20px;
width: 20px;
object-fit: cover;
border-radius: 50%;
filter: grayscale(100%) contrast(1.2) brightness(0.95);
background: #fff;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
border: 1.5px solid #eee;

}
.user-login a button {
filter: grayscale(0%) contrast(1.1) brightness(1.1);
transform: scale(1.12);
box-shadow: 0 4px 12px rgba(0,0,0,0.12);
border-color: rgb(4, 122, 168);
}

.ads-container {
/* width: 100%; /
background-color: #f1f1f1;
padding: 10px 20px;
box-sizing: border-box;
position: relative;
z-index: 999; / kugirango ntipfukiranwe */
text-align: center;
}

.ads-content {
/* max-width: 1200px; Ibijyanye n’iyo menu ya desktop */
margin: top;
background-color: rgb(0, 0, 32);
border: 1px solid #ddd;
padding: 30px;
font-weight: bold;
color: #333;
}

.ads-content p {
position: absolute;
white-space: nowrap;
font-weight: bold;
font-size: 18px;
color:white;
top: 50%;
transform: translateY(-50%);
animation:rba-scroll 15s linear infinite;
}

/* Animation nyirizina */
@keyframes rba-scroll {
0% {
left: 100%;
}
100% {
left: -100%;
}
}

.logo{  font-size: 28px;
font-weight: bold;
margin-left:1%;
margin-top:20px;
}
header img{ width: 58%;
min-width: 100px;
max-width: 150px;
margin-left:8%;
border-radius: 50%;
/* margin: 0 auto; */
display: block;
box-shadow: 0 2px 12px rgba(0,0,0,0.07);
background:#000a14;

}
.nav {
background-color:rgb(2, 124, 172);
color: white;
padding: 8px;
display: flex;
gap:18px;
/* align-items: center; /
/ justify-content: space-between; */
}

.nav a {margin-left:3%;  
  color: white;  
  text-decoration: none;  
   font-size:11px;  
  font-weight: bold;  
}

.nav a:hover {
cursor: pointer;
color: #000a14;
transform: scale(1.1);
}
.menu-icon {
display: none;
font-size: 36px;
color:white;
cursor:pointer;
margin-left: auto;
margin-right: 18px;
z-index: 1001;
}
footer{
background: #fff;
}
.soc {
display: flex;
justify-content: center;
align-items: center;
gap: 16px;
margin-top: 48px;
margin-bottom: 0;
}
.soc img {
width: 28px;
height: 28px;
object-fit: cover;
border-radius: 50%;
filter: grayscale(100%) contrast(1.2) brightness(0.95);
background: #fff;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
border: 1.5px solid #eee;
}
.soc img:hover {
filter: grayscale(0%) contrast(1.1) brightness(1.1);
transform: scale(1.12);
box-shadow: 0 4px 12px rgba(0,0,0,0.12);
border-color: rgb(4, 122, 168);
}
/* Footer */
html, body {
height: 100%;
margin: 0;
padding: 0;
}
body {
min-height: 100vh;
display: flex;
flex-direction: column;
}
section {
flex: 1;
}
footer {background-color: #000a14;
width: 100%;
margin-top: auto;
padding-bottom: 12px;
}
.footer-text {
text-align: center;
color: #444;
font-size: 13px;
font-weight: normal;
margin-top: 12px;
letter-spacing: 0.5px;
}
@media (max-width: 500px) {
.ri h1 {
font-size:20px;
}
.ri p {
font-size:18px;
}
.footer-text {
font-size: 14px;
}
}
@media (max-width: 900px) {
.int {
flex-direction: column;
align-items: center;
gap: 20px;
width: 90vw;
padding: 18px 2vw;
}
.ri,.left {
margin-left:9%;
width: 100%;
text-align: center;
}
.left img {
width: 50%;
max-width: 90vw;

}    
.ri-button{margin-left:20%;  
      

}

}
.search-form {
display: flex;
max-width: 300px;
margin: 0 auto;
}

.search-form input[type="text"] {
flex: 1;
padding: 8px;
color:black;
border: 2px solid skyblue;
border-radius: 5px 0 0 5px;
}

.search-form .button {height:37px;
padding: 8px;
background-color:black;
color:white;
border: none;
border-radius: 0 5px 5px 0;
cursor: pointer;
}

.search-form button:hover {cursor: pointer;
background-color: #0056b3;
}
/* ===========================================================
RESPONSIVE OVERRIDES FOR HEADER + NAV (BASED ON YOUR CODE)
Paste BELOW your existing CSS
=========================================================== */

/* ---------- Shared tweaks small/medium screens ---------- /
header {
position: relative;           / kugira ngo menu-icon ishobore kuba absolute /
flex-wrap: wrap;              / ibyuma binini -> bitsinde mu murongo wa kabiri nibikenewe */
}

/* Reba language dropdown ihore hejuru ku z-index yo hejuru /
.language-toggle {
z-index: 1002;
}
.lang-menu {
top: calc(100% + 4px);  / aho wigeze gukomenta top, none turayisubizaho neza */
left: 0;
background-color: rgb(3, 94, 129);
width: 150px;
padding: 6px 0;
}

/* Kwirinda ko flag image ifata % idasanzwe */
.lang-btn img,
.lang-menu img {
width: 20px;
height: 16px;
object-fit: cover;
}

/* ---------- Breakpoint: iPad & below (max 1024px) ---------- */
@media (max-width: 1024px) {

/* Header iberwe no kwicara mu mirongo ibiri/itatu */
header {
padding: 12px 16px;
align-items: flex-start;
}

header img {margin-left:3%;
margin-top:3%;
width: 120px !important;
max-width: 100%;
/* margin: 0 0 8px 0;      nta margin-left nini kuri mobile/tablet */
}

.logo {
margin-left:3%;
margin-top:5%;
font-size: 24px;
line-height: 1.1;
text-align: left;
}

/* Language toggle ijye munsi ya logo, ibumoso */
.language-toggle {
margin-left: 5%;
margin-top:6%;
}

/* Date/Time munsi y’indimi */
.datetime-wrapper {
padding: 8px 0 0 0;
align-items: flex-start;
gap: 4px;
margin-left:7%;
margin-top:3%;
}
.date, .time {
font-size: 1rem;
}

/* Ads mu header ushobora kuyagabanya ingano, ntituyahishe byanze bikunze */

/* Menu icon igaragare kuri iPad & mobile */
.menu-icon {
display: block;
position: absolute;
top:4%;
right: 16px;
}

/* NAV ihishwe by default kuri small/medium screens */
.nav {
display: none;
flex-direction: column;
align-items: stretch;
width: 100%;
padding: 16px;
gap: 12px;
}

/* Iyo ufunguye (via .open class iva muri JS) */
.nav.open {
display: flex;
}

.nav a {
margin-left: 0;            /* havemo margin-left ya desktop */
width: 100%;
padding: 12px 8px;
background: rgba(255,255,255,0.08);
border-radius: 4px;
text-align: left;
}

/* Search ishyirwe munsi ya links kandi ifate width yose */
.search-wrapper {
width: 100%;
margin: 8px 0 0 0;
display: flex;
align-items: center;
justify-content: flex-start;
position: relative;
}

.search-icon img {
filter: none;
background: #fff;
border: 1px solid #ccc;
}

.search-input {
position: static;
display: none;       /* izajya igaragara na JS */
width: 100%;
margin-left: 8px;
background-color: #fff;
color: #000;
border: 1px solid #ccc;
padding: 8px 12px;
font-size: 16px;
}
}

/* ---------- Breakpoint: very small screens (max 600px) ---------- */
@media (max-width: 600px) {
.logo {
font-size: 20px;
}

header img {
width: 100px !important;
}

.date, .time {
font-size: 0.95rem;
}

/* .ads p {
font-size: 18px;
} */
}

/* ---------- Desktop (min 1025px) ---------- */
@media (min-width: 1025px) {

/* Shyiraho ibintu bisanzwe uko wari wabikoze, ariko tunakingira overriding yo hejuru /
header {
display: flex;
align-items: center;
justify-content: flex-start;  / wari ubikoze default; ndasiga uko */
}

.menu-icon {
display: none !important;
}

.nav {
display: flex !important;
flex-direction: row;
align-items: center;
gap: 20px;
}

.search-wrapper {
margin-left: 16%;
}

.search-input {
display: none; /* yigaragaza gusa iyo umuntu akande icon (JS) /
}
}
/ Responsive font */
@media (max-width: 768px) {
.ads-container {
display: none;
flex-direction: column;
align-items: stretch;
width: 100%;
padding: 16px;

}

.ads-content {
font-size: 14px;
padding: 10px;
  }
}
/* On mobile: move icon to top /
/ Muri mobile view (responsive) */
@media screen and (max-width: 768px) {
.user-login {
position: relative;
top: 0;
right: 0;
display: flex;
justify-content: flex-end;
width: 100%;
padding: 5px 10px;
}

/* .user-login button {
font-size: 20px;
padding: 5px 10px;
border-radius: 50%;
} */
 .user-login button:hover{
color: #007bff;
cursor: pointer;
}
.user-login a button{
height: 20px;
width: 20px;
object-fit: cover;
border-radius: 50%;
filter: grayscale(100%) contrast(1.2) brightness(0.95);
background: #fff;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
border: 1.5px solid #eee;

}
.user-login a button {
filter: grayscale(0%) contrast(1.1) brightness(1.1);
transform: scale(1.12);
box-shadow: 0 4px 12px rgba(0,0,0,0.12);
border-color: rgb(4, 122, 168);
}
}
form {
background-color:rgb(2, 124, 172);
padding: 40px 30px;
border-radius: 12px;
box-shadow: 0 10px 20px rgba(0,0,0,0.1);
width: 100%;
margin-left: 38%;
margin-bottom:3%;
max-width: 400px;
}

/* Title */
h2 {
font-size: 20px;
margin-left: 37%;
margin-bottom:2%;
color:rgb(0, 0, 0);
}
form a{margin-left: 5%;
text-decoration: none;
color: rgb(1, 1, 48);
font-weight: bold;

}

form h3 {
font-size: 18px;
text-align: center;
margin-bottom: 25px;
color: #333;
display: block;
}

/* Input fields */
form input[type="text"],
form input[type="email"],
form input[type="password"],
form input[type="submit"] {
width: 100%;
padding: 12px 15px;
margin-bottom: 15px;
border: 1px solid #ccc;
border-radius: 6px;
font-size: 15px;
}

/* Submit button */
form input[type="submit"] {
background-color: #000000;
color: white;
border: none;
font-weight: bold;
cursor: pointer;
transition: background-color 0.3s ease;
}

form input[type="submit"]:hover {
background-color: #0056b3;
}
.article{background-color:skyblue;
max-width: 900px;
padding:30px 30px 30px 30px;
margin-left:15%;
margin-top: 5%;
}
.article a{margin-left:45%;
text-decoration: none;
color: rgb(1, 1, 48);
font-weight: bold;
font-size: 20px;

}
.article h2 {margin-bottom:5%;
font-size: 30px;
color: black;

}
.admin{margin-left:40%;

}
.admin h3{margin-top: 3%;
margin-left:-7%;
font-size:20px;
color: #000000;

}
.admin p{font-size: 30px;
margin-left:-7%;
font-size:25px;
color: #000000;

}
.admin a{text-decoration: none;
font-size: 20px;
color:#000a14;
font-weight: bold;

}
/* ...existing code... */

/* Responsive styles /
@media (max-width: 768px) {
.nav, .latest-news-slider, .regular-news, .ads-container, .footer-text {
flex-direction: column;
width: 100%;
padding: 10px;
}
.slide, .article-box {
width: 100%;
margin-bottom: 20px;
}
.lang-flags img {
width: 30px !important;
height: 20px !important;
}
.logo {
font-size: 18px;
}
.meta {
font-size: 10px;
}
}
/ Ads slider style /
.ads-container {
width: 98vw;
max-width: 1400px;
margin: 18px auto 28px auto;
/ overflow: hidden; */
border-radius: 18px;
box-shadow: 0 2px 16px rgba(0,0,0,0.07);
background: #fff;
height: 105px;
position: relative;
}

.ads-slider-wrapper {
display: flex;
transition: transform 0.8s cubic-bezier(.77,0,.18,1);
height: 180px;
}

.ads-content {
min-width: 400px;
max-width: 400px;
height: 105px;
margin-right: 18px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: #f7f9fa;
border-radius: 14px;
box-shadow: 0 1px 8px #eee;
font-size: 17px;
position: relative;
}

.ads-content img {
min-width: 400px;
max-width: 400px;
height: 105px;
border-radius: 8px;
margin-bottom: 8px;
}

.ads-content p {
margin: 0;
font-weight: 600;
color: #222;
text-align: center;
}

@media (max-width: 700px) {
.ads-content, .ads-slider-wrapper {
min-width: 90vw;
max-width: 90vw;
height: 140px;
}
.ads-container {
height: 140px;
}
}
/* Ads forms style */
.ads-form {
max-width: 420px;
margin: 38px auto 40px auto;
background: #fff;
border-radius: 14px;
box-shadow: 0 2px 16px rgba(0,0,0,0.09);
padding: 32px 26px 22px 26px;
display: flex;
flex-direction: column;
gap: 18px;
}

.ads-form input[type="text"],
.ads-form input[type="file"] {
width: 100%;
padding: 12px 14px;
border: 1.5px solid #e1e4e8;
border-radius: 7px;
font-size: 15px;
background: #f7f9fa;
margin-bottom: 0;
transition: border-color 0.2s;
}

.ads-form input[type="text"]:focus,
.ads-form input[type="file"]:focus {
border-color: #007bff;
outline: none;
background: #fff;
}

.ads-form button[type="submit"] {
background: #007bff;
color: #fff;
border: none;
border-radius: 7px;
padding: 12px 0;
font-size: 16px;
font-weight: 600;
cursor: pointer;
box-shadow: 0 1px 6px rgba(0,0,0,0.07);
transition: background 0.2s, transform 0.2s;
}

.ads-form button[type="submit"]:hover {
background: #0056b3;
transform: scale(1.03);
}

.ads-form label {
font-size: 15px;
font-weight: 500;
color: #222;
margin-bottom: 4px;
}

/* Ads management table */
.ads-table {
width: 98%;
margin: 30px auto;
border-collapse: collapse;
background: #fff;
border-radius: 12px;
box-shadow: 0 2px 16px rgba(0,0,0,0.07);
overflow: hidden;
}

.ads-table th, .ads-table td {
padding: 12px 10px;
border-bottom: 1px solid #eee;
text-align: left;
font-size: 15px;
}

.ads-table th {
background: #f7f9fa;
font-weight: 600;
}

.ads-table tr:last-child td {
border-bottom: none;
}

.ads-table img {
max-width: 80px;
border-radius: 7px;
box-shadow: 0 1px 6px #eee;
}

.ads-actions a {
margin-right: 14px;
color: #007bff;
text-decoration: none;
font-weight: 500;
padding: 4px 10px;
border-radius: 6px;
transition: background 0.2s, color 0.2s;
}
.ads-actions a.delete {
color: #e74c3c;
background: #fbeaea;
}
.ads-actions a:hover {
background: #eaf4ff;
color: #0056b3;
text-decoration: underline;
}
.ads-actions a.delete:hover {
background: #f8d7da;
color: #c0392b;
}
/* Meta info (views, comments, likes) */
.meta {
display: flex;
align-items: center;
gap: 18px;
font-size: 14px;
margin-top: 8px;
flex-wrap: wrap;
}
.slide-titles{
margin-top:15%;
}

.meta span,
.meta a {
display: flex;
align-items: center;
gap: 4px;
color: #222;
font-weight: 500;
text-decoration: none;
}

.meta a:hover {
color: #007bff;
text-decoration: underline;
}

.meta form {
display: flex;
align-items: center;
margin: 0;
background: none !important;
padding: 0;
}

.meta button {
background: none !important;
border: none;
color: #e74c3c;
font-size: 16px;
cursor: pointer;
padding: 0 4px;
margin: 0;
transition: color 0.2s, transform 0.2s;
display: flex;
align-items: center;
gap: 4px;
box-shadow: none;
}

.meta button:focus {
outline: none;
background-color: none !important;
}

.meta button:hover {
color: #c0392b;
transform: scale(1.15);
background: none !important;
}

.meta .icon {
font-size: 16px;
margin-right: 2px;
vertical-align: middle;
}

.meta .date-time {
color: #555;
font-size: 13px;
margin-right: 8px;
font-weight: 400;
}
/* Ahabanza ho kwandika comment nshya */
.comment-form {
background-color: #fff;
border: 1px solid #ddd;
border-radius: 12px;
padding: 16px;
box-shadow: 0 1px 4px rgba(0,0,0,0.05);
max-width: 600px;
margin: 20px auto;
font-family: 'Arial', sans-serif;
}

.comment-form input[type="text"],
.comment-form textarea {
width: 100%;
padding: 12px;
margin-bottom: 10px;
border: 1px solid #ccc;
border-radius: 10px;
font-size: 15px;
outline: none;
transition: border-color 0.3s ease;
}

.comment-form input[type="text"]:focus,
.comment-form textarea:focus {
border-color: #3897f0;
}

.comment-form textarea {
resize: vertical;
min-height: 80px;
font-family: inherit;
}

.comment-form button {
background-color: #3897f0;
color: white;
border: none;
padding: 10px 20px;
font-size: 15px;
border-radius: 8px;
cursor: pointer;
transition: background-color 0.3s ease;
}

.comment-form button:hover {
background-color: #2f81e0;
}

/* Style ya reply form /
/ Reply form */
.reply-form {
background-color: #f9f9f9;
border: 1px solid #ccc;
border-radius: 10px;
padding: 12px;
margin-top: 10px;
margin-left: 30px;
}

.reply-form input[type="text"],
.reply-form textarea {
width: 100%;
padding: 10px;
margin-bottom: 8px;
border: 1px solid #bbb;
border-radius: 8px;
font-size: 14px;
}

.reply-form button {
background-color: #3897f0;
color: #fff;
border: none;
padding: 8px 18px;
font-size: 14px;
border-radius: 6px;
cursor: pointer;
}

.reply-form button:hover {
background-color: #2d7ee0;
}
/* Modern article form style */
.article-form {
max-width: 480px;
margin: 30px auto 40px auto;
background: #fff;
border-radius: 14px;
box-shadow: 0 2px 16px rgba(0,0,0,0.07);
padding: 28px 24px 22px 24px;
display: flex;
flex-direction: column;
gap: 18px;
}

.article-form input[type="text"],
.article-form textarea,
.article-form select {
width: 100%;
padding: 12px 14px;
border: 1.5px solid #e1e4e8;
border-radius: 7px;
font-size: 15px;
background: #f7f9fa;
margin-bottom: 0;
transition: border-color 0.2s;
}

.article-form input[type="text"]:focus,
.article-form textarea:focus,
.article-form select:focus {
border-color: #007bff;
outline: none;
background: #fff;
}

.article-form textarea {
min-height: 90px;
resize: vertical;
}

.article-form input[type="file"] {
border: none;
background: none;
font-size: 15px;
margin-top: 2px;
}

.article-form button[type="submit"] {
background: #007bff;
color: #fff;
border: none;
border-radius: 7px;
padding: 12px 0;
font-size: 16px;
font-weight: 600;
cursor: pointer;
box-shadow: 0 1px 6px rgba(0,0,0,0.07);
transition: background 0.2s, transform 0.2s;
}

.article-form button[type="submit"]:hover {
background: #0056b3;
transform: scale(1.03);
}

@media (max-width: 600px) {
.article-form {
padding: 16px 8px;
}
}
/* Admin table style */
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
padding: 14px 12px;
border-bottom: 1px solid #eee;
text-align: left;
font-size: 15px;
}

th {
background: #f7f9fa;
font-weight: 600;
color: #222;
}

tr:last-child td {
border-bottom: none;
}

tr:hover td {
background: #f0f6ff;
transition: background 0.2s;
}

.action-links a {
margin-right: 14px;
color: #007bff;
text-decoration: none;
font-weight: 500;
padding: 4px 10px;
border-radius: 6px;
transition: background 0.2s, color 0.2s;
}

.action-links a.delete {
color: #e74c3c;
background: #fbeaea;
}

.action-links a:hover {
background: #eaf4ff;
color: #0056b3;
text-decoration: underline;
}

.action-links a.delete:hover {
background: #f8d7da;
color: #c0392b;
}

/* .lang-flags{display: flex;
gap:10px;

} /
.lang-flags  {display: flex;
gap:10px;
margin-top:1%;
margin-left: 3%;
width: 6%;
background-color: rgb(136, 128, 185);
height: 13%;
border-radius: 0; / Irinda kuba circle /
object-fit: cover;
/ margin-right: 8px; */
}
.lang-flags a{text-decoration-line: none;
margin-left: 15%;
}
.lang-flags a :hover{transform: scale(1.03);

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
font-size: 14px;
color: #555;
}

/* Regular News Layout /
.regular-news {
display: flex;
flex-direction: column;
gap: 20px;
margin:15px;
/ margin-right:22rem; */
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
object-fit: cover;
}

.regular-article .text-content {
flex: 3;
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
}
.meta {
display: flex;
/* justify-content: space-between; /
flex-wrap: nowrap;
font-size: 14px;
gap: 10px;
}
/ ----------- Responsive Latest News ----------- */
@media (max-width: 768px) {
.latest-new {
flex-direction: column;
}

.left-featured,
.middle-slider,
.right-featured {
width: 50%;
}

.slide img {
height: 150px;
}

.slide h3 {
font-size: 16px;
}

.meta {
flex-direction: row;
justify-content: space-between;
font-size: 12px;
}
}

/* ----------- Responsive Regular News ----------- /
/ @media (max-width: 768px) {
.regular-article {
flex-direction: column;
align-items: center;
text-align: center;
}

.regular-article .image-content img {
width: 100%;
height: auto;
max-height: 200px;
}

.regular-article .text-content {
width: 100%;
}

.regular-article h4 {
font-size: 16px;
}

.regular-article .meta {
flex-direction: row;
justify-content: space-between;
font-size: 12px;
margin-top: 8px;
}
} */
.tv-videos-grid {
display:flex;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 20px;
margin: 30px auto;
padding: 10px;
}

.tv-video-card {
background-color: #fff;
border: 1px solid #ddd;
border-radius: 10px;
padding: 10px;
box-shadow: 0 0 5px rgba(0,0,0,0.1);
transition: transform 0.3s ease;
}

.tv-video-card:hover {
transform: scale(1.02);
}

.tv-video-card video {
width: 100%;
height: 200px;
object-fit: cover;
border-radius: 8px;
}

.tv-video-card h4 {
margin-top: 10px;
font-size: 18px;
color: #333;
}

.tv-video-card .meta {
display: flex;
justify-content: space-between;
font-size: 14px;
color: #555;
margin-top: 5px;
}
/* .popular-carousel-wrapper {
overflow: hidden;
width: 100%;
max-width: 1000px;
margin: 0 auto;
position: relative;
}

.popular-carousel {
display: flex;
transition: transform 0.5s ease;
gap: 20px;
}

.popular-slide {
min-width: 280px;
max-width: 280px;
background: #fff;
border-radius: 10px;
box-shadow: 0 3px 8px rgba(0,0,0,0.1);
overflow: hidden;
text-decoration: none;
flex-shrink: 0;
}

.popular-slide img {
width: 100%;
height: 160px;
object-fit: cover;
}

.popular-info {
padding: 10px;
text-align: center;
}

.popular-info h4 {
font-size: 15px;
margin: 8px 0;
color: #222;
}

.popular-info .meta {
display: flex;
justify-content: center;
gap: 15px;
font-size: 13px;
color: #555;
} */

/* Responsive /
/ @media (max-width: 768px) {
.popular-slide {
min-width: 85%;
}
} */
.carousel-container {
position: relative;
width: 100%;
margin-left:4%;
}

.popular-carousel-wrapper {
display: flex;
overflow-x: auto;
scroll-snap-type: x mandatory;
gap: 20px;
padding: 10px;
scroll-behavior: smooth;
}

.popular-slide {
flex: 0 0 auto;
width: 280px;
background: #fff;
border: 1px solid #ddd;
border-radius: 10px;
scroll-snap-align: start;
}

.popular-slide img {
width: 100%;
height: 170px;
object-fit: cover;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
}

.popular-info {
padding: 10px;
}

/* .carousel-arrow {
position: absolute;
top: 40%;
transform: translateY(-50%);
font-size: 28px;
background-color: rgba(0, 0, 0, 0.5);
color: white;
border: none;
cursor: pointer;
padding: 8px 12px;
z-index: 2;
border-radius: 50%;
}

.carousel-arrow.left {
left: 10px;
}

.carousel-arrow.right {
right: 10px;
} */

.carousel-arrow:hover {
background-color: rgba(0, 0, 0, 0.8);
}
@media (max-width: 600px) {
.carousel-arrow {
display: none;
}
.carousel-arrow {
position: absolute;
top: 40%;
transform: translateY(-50%);
font-size: 28px;
background-color: rgba(0, 0, 0, 0.5);
color: white;
border: none;
cursor: pointer;
padding: 8px 12px;
z-index: 2;
border-radius: 50%;
}

.carousel-arrow.left {
left: 10px;
}

.carousel-arrow.right {
right: 10px;
}

}
/* .ads-carousel {
display: flex;
overflow: hidden;
width: 100%;
max-width: 800px;
margin: auto;
position: relative;
}

.ad-slide {
min-width: 100%;
transition: transform 0.8s ease-in-out;
}

.ad-slide img {
width: 100%;
height: auto;
border-radius: 10px;
object-fit: cover;
}  ngiyi Css nkorera responsive ugendeye kuri cssumpe ibyo nagusabye