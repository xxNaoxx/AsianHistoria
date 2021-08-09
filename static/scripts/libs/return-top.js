const returnTopBtn = document.getElementById('js-return-top');

returnTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

