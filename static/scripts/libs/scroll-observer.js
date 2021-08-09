// document.addEventListener('DOMContentLoaded', function() {

//   const reBtn = document.getElementById('js-return-top')

//   const cbHeader = function (el, isIntersecting) {
//     if(isIntersecting) {
//       reBtn.style.display = "none";
//     } else {
//       reBtn.style.display = "flex";
//     }
//   }

//   const cbFooter = function (el, isIntersecting) {
//     if(isIntersecting) {
//       reBtn.style.bottom = "90px";
//     } else {
//       reBtn.style.bottom = "30px";
//     }
//   }

//   const cbIndex = function(el, isIntersecting) {
//     if(isIntersecting) {
//       console.log('inview');
//     } else {
//       console.log('out view');
//     }

//   }

//   const so = new ScrollIDObserver('js-nav-area', cbHeader, {once: false});
//   const so2 = new ScrollIDObserver('js-fot-area', cbFooter, {once: false});

//   const so3 = new ScrollClassObserver('.heading', cbIndex, {once: false});

// })


class ScrollIDObserver {
  constructor(els, cb, options) {
    this.els = document.getElementById(els);
    const defaultOptions = {
      root: null,
      rootMargin:'0px',
      threshold: 0,
      once: true
    };
    this.cb = cb;
    this.options = Object.assign(defaultOptions, options);
    this.once = this.options.once;
    this._init();
  }
  _init() {
    const callback = function(entries, observer) {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          this.cb(entry.target, true);
            if(this.once) {
              observer.unobserve(entry.target);
            }
        } else {
          this.cb(entry.target, false);
        };
      });
    };

    // インスタンス化
    this.io = new IntersectionObserver(callback.bind(this), this.options);
    // polyfill用設定
    this.io.POLL_INTERVAL = 100;
    // 監視対象の登録
    this.io.observe(this.els)
  }

  destory() {
    this.io.disconnect();
  }
}

class ScrollClassObserver {
  constructor(els, cb, options) {
    this.els = document.querySelectorAll(els);
    const defaultOptions = {
      root: null,
      rootMargin:'0px',
      threshold: 0,
      once: true
    };
    this.cb = cb;
    this.options = Object.assign(defaultOptions, options);
    this.once = this.options.once;
    this._init();
  }
  _init() {
    const callback = function(entries, observer) {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          this.cb(entry.target, true);
            if(this.once) {
              observer.unobserve(entry.target);
            }
        } else {
          this.cb(entry.target, false);
        };
      });
    };

    // インスタンス化
    this.io = new IntersectionObserver(callback.bind(this), this.options);
    // polyfill用設定
    this.io.POLL_INTERVAL = 100;
    // 監視対象の登録
    this.els.forEach(el => this.io.observe(el));
  }

  destory() {
    this.io.disconnect();
  }
}

