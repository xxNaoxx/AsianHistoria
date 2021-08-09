const ScrollMaker = function() {
	const aLink = document.querySelectorAll('a[href^="#"]');
	// console.log(aLink);

  let aLinkArray = Array.from(aLink);
  // console.log(aLinkArray);

  aLinkArray.forEach(function(link) {
    link.addEventListener('click', e => {

      //ブラウザのデフォルトの挙動を止める
      e.preventDefault();

      //ターゲットの要素を取得する
      const targetId = link.getAttribute('href');
      // console.log(targetId)
      const targetElement = document.getElementById(targetId.slice(1))
      // console.log(targetElement)

      //ターゲットの要素のページ上端からの位置座標を取得
      const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;

      //ターゲットの要素の位置までスムーススクロールさせる
      window.scrollTo({
        top: targetOffsetTop,
        behavior: "smooth"
      });

    });
  })

};

if(document.URL.match(/post/)){
	window.addEventListener('DOMContentLoaded', ScrollMaker);
};