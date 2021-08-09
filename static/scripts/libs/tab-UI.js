
const tabMaker = function(){
		const $tab = document.getElementById('js-tab')
		const $nav = $tab.querySelectorAll('[data-nav]');
		const $content = $tab.querySelectorAll('[data-content]');

		// 初期化処理
		const init = () => {
			$content[0].style.display = 'block';
		};
		init();

		// クリックしたら起こるイベント
		const handleClick = (e) => {
			e.preventDefault();

			// クリックされたnavとそのdataを取得
			const $this = e.currentTarget;
			const targetVal = $this.dataset.nav;

			// 対象外のnav, コンテンツをリセット
			let index = 0;
			while(index < $nav.length) {
				$content[index].style.display = 'none';
				$content[index].classList.remove('appear');
				$nav[index].classList.remove('is-active');
				index++;
			}

			// 対象のコンテンツをアクティブ化する
			$tab.querySelectorAll('[data-content="' + targetVal + '"]')[0].style.display = 'block';
			$tab.querySelectorAll('[data-content="' + targetVal + '"]')[0].classList.add('appear');
			$nav[targetVal].classList.add('is-active');

		};

		// 全nav要素に処理を適用
		let index = 0;
		while(index < $nav.length) {
			$nav[index].addEventListener('click', (e) => handleClick(e));
			index++;
		};

		while(index < $nav.length) {
			$nav[index].addEventListener('click', handleClick(e));
			index++;
		};
};