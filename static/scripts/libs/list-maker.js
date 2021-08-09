const listMaker = function(){

  // li要素のクラス追加処理
  let contentArea = document.getElementById('js-toc-content')
  let coList = contentArea.getElementsByTagName('li');;
  let coListArray = Array.from(coList) ;

  coListArray.forEach(function(list) {

    if(! list.closest('#js-toc-box')) {
      list.classList.add('detail-li')
    }
  })

  // li要素のクラス追加処理
  let coUlList = contentArea.getElementsByTagName('ul');
  let coUlArray = Array.from(coUlList) ;

  coUlArray.forEach(function(list) {

    if(! list.closest('#js-toc-box')) {
      list.classList.add('detail-ul')
    }
  })

};

// if(document.URL.match(/post/)){
//   window.addEventListener('DOMContentLoaded', listMaker);
// };

