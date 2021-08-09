const idMaker = function(){

  // 目次の追加場所を取得
  let toc = document.getElementById('js-toc');
	// console.log(toc);

	// 見出しのコンテナを取得
	const container = document.getElementById('js-toc-content');
	// console.log(container);

	// コンテナ内の見出しを取得
	let headings = container.querySelectorAll('h2, h3');
	// console.log(headings);

	// コンテナ要素である<div>の中に要素を追加する
	let masterUl = document.createElement('ul');
	toc.appendChild(masterUl);

  // 取得した見出しタグ要素の数だけ以下の操作を繰り返す
  headings.forEach(function (value, i) {

    // 見出しタグ要素のidを取得し空の場合は内容をidにする
    let tagId = value.id;

    if(tagId === '') {
        tagId = value.textContent;
        value.id = tagId;
    };

		value.classList.add('heading');
	});

	// nodeを配列に変換
	let nodesArray = Array.from(headings)

	let masterArray = [];
	let h2Array = nodesArray.filter(val => {return (val.nodeName === 'H2')})
	for (let i = 0; i < h2Array.length; i++) {
		masterArray[i] = [];
	}

	let count = 0;
	nodesArray.forEach(function (node) {

		masterArray[count].push(node)

		let h2Judge = masterArray[count].filter(val => {return (val.nodeName === 'H2')})

		if (h2Judge.length > 1) {
			masterArray[count].pop()
			count++;
			masterArray[count].push(node)
		}
	});

	masterArray.forEach(function(childArray, i){

		childArray.forEach(function(el){

			let ul = document.createElement('ul');
			let li = document.createElement('li');
			let a = document.createElement('a');


			a.innerHTML = el.textContent;
			a.href = '#' + el.id;
			li.appendChild(a);

			if(el.tagName === 'H2') {
				// 追加する<ul><li><a>タイトル</a></li></ul>を準備する
				li.appendChild(ul);
				masterUl.appendChild(li);
			}

			// 要素がh3タグの場合
			if(el.tagName === 'H3') {
				let children = masterUl.childNodes
				let child = children[i].childNodes
				let gchild = child[1]

				gchild.appendChild(li);
			};
		});
	});


	// トップに目次を複製
	if(document.getElementById('js-toc-box')) {
		let cloneArea = masterUl;
		let cloneElement = cloneArea.cloneNode(true);
		cloneElement.classList.add('js-index__ul');

		let tocIndexBox = document.getElementById('js-toc-box');
		let tocIndexTitle = document.createElement('div');

		tocIndexTitle.textContent = '目次';
		tocIndexTitle.classList.add('icon__list');
		tocIndexTitle.classList.add('js-index__title');

		tocIndexBox.appendChild(tocIndexTitle);
		tocIndexBox.appendChild(cloneElement);

		tocIndexBox.classList.add('index-list');
	}
};




// if(document.URL.match(/post/)){
//   let index = document.getElementById('index');
//   index.style.display = "block"
//   document.addEventListener('DOMContentLoaded', idMaker);
// };