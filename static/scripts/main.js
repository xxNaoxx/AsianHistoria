document.addEventListener('DOMContentLoaded', function() {
  if (document.URL.match(/post/)){
    let index = document.getElementById('index');
    index.style.display = "block"

    idMaker();
    listMaker();
  };

  if (document.querySelector('.top-blog') != null) {
    const topBlog = document.querySelector('.top-blog');
    topBlog.classList.add('appear');
  }

  if (document.querySelector('.main-list') != null) {
    tabMaker();
  }

  if (document.querySelector('.article-list') != null) {
    const artiList = document.querySelector('.article-list')
    artiList.classList.add('appear');
  }

  const reBtn = document.getElementById('js-return-top');
  const cbHeader = function (el, isIntersecting) {
    if (isIntersecting) {
      reBtn.classList.remove('appear');
      reBtn.classList.add('disappear');
    } else {
      reBtn.classList.remove('disappear');
      reBtn.classList.add('appear');
    }
  }

  const cbFooter = function (el, isIntersecting) {
    if(isIntersecting) {
      reBtn.style.bottom = "90px";
    } else {
      reBtn.style.bottom = "30px";
    }
  }

  const cbIndex =  function (el, isIntersecting) {
    const indexList = document.getElementById('js-toc');
    const list = indexList.querySelectorAll('li');
    let nowReading = '';

    if(isIntersecting) {
      nowReading = el.innerHTML;
      console.log(nowReading)
      // console.log(el)

      list.forEach(li => {
        if (li.childNodes[0].innerText == nowReading) {
          li.childNodes[0].classList.add('is-active')
        } else {
          li.childNodes[0].classList.remove('is-active')
        }
      })

    } else {

    }
  }

  // インスタンス化
  const so = new ScrollIDObserver('js-nav-area', cbHeader, {once: false});
  const so2 = new ScrollIDObserver('js-fot-area', cbFooter, {once: false});
  const so3 = new ScrollClassObserver('.heading', cbIndex, {once: false});


})