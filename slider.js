let slides = document.querySelectorAll('.slide');
let current = 0;
function showSlide(i){
  slides.forEach((s, idx) => s.classList.toggle('active', idx===i));
}
function nextSlide(){
  current = (current + 1) % slides.length;
  showSlide(current);
}
showSlide(0);
setInterval(nextSlide, 5000); // ihinduka buri segonda 5