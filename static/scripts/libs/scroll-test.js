const indexScroll = function (el) {

  const indexList = document.getElementById('js-toc');
  const list = indexList.querySelectorAll('li');
  console.log(list);

  const headings = document.querySelectorAll('.heading')
  console.log(headings);

  // const testID = document.getElementById('中国の南北分裂')

  let nowReading = '';
  const cb = function (entries, observer) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        nowReading = entry.target.innerHTML;

        list.forEach(li => {
          if (li.childNodes[0].innerText == nowReading) {
            li.childNodes[0].classList.add('is-active')
          } else {
            li.childNodes[0].classList.remove('is-active')
          }
        })
      }
    });
  }

  const io3 = new IntersectionObserver(cb);

  headings.forEach( heading=> io3.observe(heading));

}